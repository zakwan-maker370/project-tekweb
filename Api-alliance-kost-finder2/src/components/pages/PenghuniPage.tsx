import React, { useState } from "react";
import AdminHeader from "../admin/AdminHeader";
import { useData } from "../../context/DataContext";

// UI Components
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

export default function PenghuniPage() {
  // --- 1. AMBIL DATA DARI CONTEXT (PUSAT DATA) ---
  const { listPenghuni, tambahPenghuni, isLoading } = useData();

  // State Lokal untuk UI (Form & Dialog)
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Input State
  // (Pastikan field ini sesuai dengan yang diminta Context: checkInDate)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    roomNumber: "",
    email: "",
    kostId: "1",
    gender: "Laki-laki",
    checkInDate: "",
    status: "Aktif",
    PembayaranStatus: "pending",
  });

  // URL untuk Delete/Edit manual (karena Context kita tadi cuma punya fungsi Tambah)
  // Pastikan URL ini sama dengan yang di Context
  const API_URL = "https://6958b0096c3282d9f1d58ade.mockapi.io/penhuni";

  // --- CRUD OPERATIONS ---

  // 2. SUBMIT (CREATE / UPDATE)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi sederhana
    if (!formData.name || !formData.roomNumber)
      return alert("Nama dan Kamar wajib diisi");

    try {
      if (isEditing && editId) {
        // --- LOGIKA EDIT (Masih Manual Fetch karena Context belum ada fungsi Edit) ---
        await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        alert(
          "Data berhasil diupdate! (Silakan refresh untuk melihat perubahan di Dashboard)"
        );
        window.location.reload();
      } else {
        // --- LOGIKA TAMBAH (PAKAILAH FUNGSI DARI CONTEXT) ---
        await tambahPenghuni({
          ...formData,
          // Pastikan format data sesuai kebutuhan Context
          checkInDate:
            formData.checkInDate || new Date().toISOString().split("T")[0],
        });
      }

      // Reset & Tutup Form
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      alert("Gagal menyimpan data.");
    }
  };

  // 3. DELETE
  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const executeDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      // Manual delete ke API
      await fetch(`${API_URL}/${deleteId}`, { method: "DELETE" });

      // Karena Context belum punya fungsi hapus, kita reload manual
      // agar data di dashboard sinkron
      window.location.reload();
    } catch (error) {
      console.error("Gagal menghapus:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  // --- HELPERS ---
  const handleEditClick = (p: any) => {
    setFormData({
      name: p.name,
      phone: p.phone,
      roomNumber: p.roomNumber,
      email: p.email || "",
      kostId: p.kostId || "1",
      gender: p.gender || "Laki-laki",
      checkInDate: p.checkInDate || "",
      status: p.status,
      PembayaranStatus: p.PembayaranStatus || "pending",
    });
    setEditId(p.id);
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      roomNumber: "",
      email: "",
      kostId: "1",
      gender: "Laki-laki",
      checkInDate: "",
      status: "Aktif",
      PembayaranStatus: "pending",
    });
    setIsEditing(false);
    setEditId(null);
  };

  // Format tanggal
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <AdminHeader>
      <div className="p-6 min-h-screen pb-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Data Penghuni</h1>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            {showForm ? "Batal" : "+ Tambah Penghuni"}
          </button>
        </div>

        {/* --- FORM --- */}
        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-gray-100 animate-in fade-in slide-in-from-top-4">
            <h2 className="font-semibold mb-4 text-lg">
              {isEditing ? "Edit Data Penghuni" : "Tambah Penghuni Baru"}
            </h2>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              {/* Nama */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Nama Penghuni"
                />
              </div>

              {/* No HP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No. WhatsApp
                </label>
                <input
                  type="number"
                  required
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="08..."
                />
              </div>

              {/* Kamar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kamar No.
                </label>
                <input
                  type="text"
                  required
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.roomNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, roomNumber: e.target.value })
                  }
                  placeholder="A-101"
                />
              </div>

              {/* Tanggal Masuk (checkInDate) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Masuk
                </label>
                <input
                  type="date"
                  required
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.checkInDate}
                  onChange={(e) =>
                    setFormData({ ...formData, checkInDate: e.target.value })
                  }
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status Penghuni
                </label>
                <select
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="Aktif">Aktif</option>
                </select>
              </div>

              {/* Gender (Tambahan biar lengkap sesuai DB) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Kelamin
                </label>
                <select
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status Pembayaran Awal
                </label>
                <select
                  className="w-full border p-2 rounded"
                  value={formData.PembayaranStatus}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      PembayaranStatus: e.target.value,
                    })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Lunas">Lunas</option>
                </select>
              </div>

              <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:bg-gray-400"
                >
                  {isLoading ? "Menyimpan..." : "Simpan Data"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- TABLE (Render dari Context listPenghuni) --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4 border-b">Nama & Kontak</th>
                <th className="p-4 border-b">Kamar</th>
                <th className="p-4 border-b">Tgl Masuk</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    Memuat data dari server...
                  </td>
                </tr>
              ) : listPenghuni.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    Belum ada data penghuni.
                  </td>
                </tr>
              ) : (
                listPenghuni.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <div className="font-bold text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        {item.phone}
                        {item.phone && (
                          <a
                            href={`https://wa.me/${item.phone.replace(
                              /^0/,
                              "62"
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold hover:bg-emerald-100"
                          >
                            WA
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium">{item.roomNumber}</td>
                    {/* Menggunakan checkInDate sesuai skema Context */}
                    <td className="p-4 text-sm text-gray-600">
                      {formatDate(item.checkInDate)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${
                          item.status === "Aktif"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 text-sm transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteDialog(item.id)}
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

      {/* --- DELETE DIALOG --- */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Data Penghuni?</AlertDialogTitle>
            <AlertDialogDescription>
              Data penghuni akan dihapus permanen.
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
