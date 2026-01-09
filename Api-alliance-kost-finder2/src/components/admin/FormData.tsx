import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// 1. DEFINISI TIPE PROPS (Pastikan onSubmit ada di sini!)
interface AdminFormProps {
  initialData?: any;
  onSubmit: (data: any) => void; // <--- INI WAJIB ADA
  loading: boolean;
}

// 2. GANTI NAMA KOMPONEN JADI 'AdminForm' (Agar tidak bentrok dengan FormData browser)
export default function AdminForm({
  initialData,
  onSubmit,
  loading,
}: AdminFormProps) {
  const [formData, setFormData] = useState({
    noKamar: "",
    nama: "",
    harga: "",
    status: "Tersedia",
  });

  // Update form jika initialData berubah (saat mode Edit)
  useEffect(() => {
    if (initialData) {
      setFormData({
        noKamar: initialData.noKamar || "",
        nama: initialData.nama || "",
        harga: initialData.harga || "",
        status: initialData.status || "Tersedia",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <label
          htmlFor="noKamar"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Nomor Kamar
        </label>
        <Input
          id="noKamar"
          name="noKamar"
          value={formData.noKamar}
          onChange={handleChange}
          placeholder="Contoh: 01"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="nama">Nama Penghuni</Label>
        <Input
          id="nama"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Kosongkan jika belum ada"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="harga">Harga Sewa</Label>
        <Input
          id="harga"
          name="harga"
          type="number"
          value={formData.harga}
          onChange={handleChange}
          placeholder="Contoh: 500000"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label>Status</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 border p-3 rounded cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="status"
              value="Tersedia"
              checked={formData.status === "Tersedia"}
              onChange={handleChange}
            />
            <span className="text-green-600 font-bold">Tersedia</span>
          </label>
          <label className="flex items-center gap-2 border p-3 rounded cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="status"
              value="Terisi"
              checked={formData.status === "Terisi"}
              onChange={handleChange}
            />
            <span className="text-purple-600 font-bold">Terisi</span>
          </label>
        </div>
      </div>

      <Button
        className="w-full mt-4 bg-blue-600"
        onClick={() => onSubmit(formData)}
        disabled={loading}
      >
        {loading ? "Menyimpan..." : "Simpan Data"}
      </Button>
    </div>
  );
}
