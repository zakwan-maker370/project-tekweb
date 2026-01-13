import React, { useState, useEffect } from "react";
import AdminHeader from "../admin/AdminHeader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface Kamar {
  id: string;
  name: string;
  type: string;
  price: number;
  facilities: string[];
  address: string;
  description: string;
  image: string;
}

export default function KamarPage() {
  // --- 1. STATE MANAGEMENT ---
  const [searchTerm, setSearchTerm] = useState("");
  const [dataKamar, setDataKamar] = useState<Kamar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- STATE FORM ---
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // --- STATE DELETE DIALOG ---
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- STATE INPUT ---
  const [formData, setFormData] = useState({
    name: "",
    type: "Putra",
    price: "",
    facilitiesInput: "",
    address: "",
    description: "",
    image: "",
  });

  const API_URL = "https://695f4cfc7f037703a81347e2.mockapi.io/kosts";

  // --- 2. READ (GET) ---
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setDataKamar(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- 3. CREATE (POST) & UPDATE (PUT) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      name: formData.name,
      type: formData.type,
      price: Number(formData.price),
      facilities: formData.facilitiesInput
        .split(",")
        .map((item) => item.trim()),
      address: formData.address,
      description: formData.description,
      image: formData.image,
    };

    try {
      if (isEditing && editId) {
        await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setShowForm(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // --- 4. LOGIC HAPUS ---
  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const executeDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await fetch(`${API_URL}/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      fetchData();
    } catch (error) {
      console.error("Gagal menghapus:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  // --- HELPER FUNCTIONS ---
  const handleEditClick = (kamar: Kamar) => {
    setFormData({
      name: kamar.name,
      type: kamar.type,
      price: kamar.price.toString(),
      facilitiesInput: Array.isArray(kamar.facilities)
        ? kamar.facilities.join(", ")
        : "",
      address: kamar.address,
      description: kamar.description,
      image: kamar.image,
    });
    setEditId(kamar.id);
    setIsEditing(true);
    setShowForm(true); // Langsung munculkan Popup
    // (Logika scroll dihapus karena sudah pakai popup)
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "Putra",
      price: "",
      facilitiesInput: "",
      address: "",
      description: "",
      image: "",
    });
    setIsEditing(false);
    setEditId(null);
  };

  // --- 5. LOGIKA FILTERING DATA ---
  const filteredData = dataKamar.filter((kamar) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      kamar.name.toLowerCase().includes(term) ||
      kamar.address.toLowerCase().includes(term) ||
      kamar.type.toLowerCase().includes(term)
    );
  });

  return (
    <AdminHeader onSearch={(term) => setSearchTerm(term)}>
      <div className="p-6 min-h-screen pb-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Data Kost
          </h1>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            + Tambah Kost
          </button>
        </div>

        {/* --- FORM INPUT SEBAGAI POPUP (MODAL) --- */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
            {/* Container Modal */}
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200">
              
              {/* Header Modal */}
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="font-bold text-xl text-gray-800">
                  {isEditing ? "Edit Data Kost" : "Tambah Kost Baru"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Kost
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Contoh: Kost Bahagia 1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipe Kost
                  </label>
                  <select
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option value="Putra">Putra</option>
                    <option value="Putri">Putri</option>
                    <option value="Campur">Campur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Harga (Per Bulan)
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="1500000"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Gambar
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fasilitas (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.facilitiesInput}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        facilitiesInput: e.target.value,
                      })
                    }
                    placeholder="Wifi, AC, Kamar Mandi Dalam"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alamat
                  </label>
                  <textarea
                    required
                    rows={2}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-2 mt-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:bg-gray-400 transition"
                  >
                    {isSaving ? "Menyimpan..." : "Simpan Data"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- TABEL DATA --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4 border-b w-24">Foto</th>
                <th className="p-4 border-b">Nama Kost & Tipe</th>
                <th className="p-4 border-b">Harga</th>
                <th className="p-4 border-b">Fasilitas & Alamat</th>
                <th className="p-4 border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    <div className="flex justify-center items-center gap-2">
                      <span className="animate-spin h-5 w-5 border-2 border-emerald-500 border-t-transparent rounded-full"></span>
                      Memuat data...
                    </div>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    {dataKamar.length === 0
                      ? "Belum ada data kost."
                      : `Tidak ditemukan data dengan kata kunci "${searchTerm}"`}
                  </td>
                </tr>
              ) : (
                filteredData.map((kamar) => (
                  <tr
                    key={kamar.id}
                    className="hover:bg-gray-50 transition align-top"
                  >
                    <td className="p-4">
                      <img
                        src={kamar.image}
                        alt={kamar.name}
                        className="w-16 h-16 object-cover rounded-md bg-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/150";
                        }}
                      />
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-gray-800">
                        {kamar.name}
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block
                        ${
                          kamar.type === "Putra"
                            ? "bg-blue-100 text-blue-700"
                            : kamar.type === "Putri"
                            ? "bg-pink-100 text-pink-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {kamar.type}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-emerald-600">
                      Rp {kamar.price.toLocaleString("id-ID")}
                    </td>
                    <td className="p-4 text-sm text-gray-600 max-w-xs">
                      <div
                        className="truncate font-medium mb-1"
                        title={kamar.address}
                      >
                        {kamar.address}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {(Array.isArray(kamar.facilities)
                          ? kamar.facilities
                          : []
                        )
                          .slice(0, 3)
                          .map((f, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded border border-gray-200"
                            >
                              {f}
                            </span>
                          ))}
                        {(Array.isArray(kamar.facilities)
                          ? kamar.facilities
                          : []
                        ).length > 3 && (
                          <span className="text-[10px] text-gray-400">
                            +{kamar.facilities.length - 3} lainnya
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleEditClick(kamar)}
                          className="bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 text-sm transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteDialog(kamar.id)}
                          className="bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100 text-sm transition"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SHADCN ALERT DIALOG --- */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data kost ini akan dihapus
              permanen dari database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                executeDelete();
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isDeleting}
            >
              {isDeleting ? "Menghapus..." : "Ya, Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminHeader>
  );
}