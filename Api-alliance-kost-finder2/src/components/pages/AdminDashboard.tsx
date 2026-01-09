import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../admin/AdminHeader";
import DataTable from "../admin/DataTable";
import DeleteDialog from "../admin/DeleteDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bed, DoorOpen, Wallet, ArrowDownCircle } from "lucide-react";

// GANTI URL MOCKAPI ANDA DI SINI
const API_URL = "https://677d6ad04496848554ca090c.mockapi.io/kamar";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk Dialog Hapus
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // FETCH DATA (GET)
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Gagal mengambil data");
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // DELETE FUNCTION
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await fetch(`${API_URL}/${deleteId}`, { method: "DELETE" });
      setData(data.filter((item: any) => item.id !== deleteId)); // Update UI langsung
      setDeleteId(null);
    } catch (err) {
      alert("Gagal menghapus data");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminHeader>
      {/* 1. STATS CARDS (Sesuai Warna di Gambar) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-emerald-600 text-white border-none shadow-lg">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Kamar Terisi</p>
              <h3 className="text-3xl font-bold mt-1">2</h3>
              <p className="text-xs mt-2 opacity-70">Jumlah Penghuni 2</p>
            </div>
            <Bed className="h-10 w-10 opacity-50" />
          </CardContent>
        </Card>

        <Card className="bg-emerald-600 text-white border-none shadow-lg">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90 font-medium text-white/60">
                Kamar Kosong
              </p>
              <h3 className="text-3xl font-bold mt-1 text-white/80">5</h3>
              <p className="text-xs mt-2 text-white/50">dari 7 Kamar</p>
            </div>
            <DoorOpen className="h-10 w-10 text-black/20" />
          </CardContent>
        </Card>

        <Card className="bg-emerald-600 text-white border-none shadow-lg">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Pemasukan</p>
              <h3 className="text-2xl font-bold mt-1">Rp 3.000.000</h3>
              <p className="text-xs mt-2 opacity-70">April 2022</p>
            </div>
            <Wallet className="h-10 w-10 opacity-50" />
          </CardContent>
        </Card>

        <Card className="bg-red-500 text-white border-none shadow-lg">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Pengeluaran</p>
              <h3 className="text-2xl font-bold mt-1">Rp 2.350.000</h3>
              <p className="text-xs mt-2 opacity-70">April 2022</p>
            </div>
            <ArrowDownCircle className="h-10 w-10 opacity-50" />
          </CardContent>
        </Card>
      </div>

      {/* 2. TABEL DATA & ERROR HANDLING */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">
            Daftar Penghuni Kost
          </h2>
          <Link to="/admin/add">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Tambah Penghuni
            </Button>
          </Link>
        </div>

        {loading ? (
          // Skeleton Loading
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : error ? (
          <div className="text-red-500 bg-red-50 p-4 rounded">{error}</div>
        ) : (
          <DataTable data={data} onDelete={(id) => setDeleteId(String(id))} />
        )}
      </div>

      {/* DIALOG HAPUS (Terpisah) */}
      <DeleteDialog
        open={!!deleteId}
        onConfirm={handleDeleteConfirm}
        onOpenChange={function (open: boolean): void {
          throw new Error("Function not implemented.");
        }}
        loading={false}
      />
    </AdminHeader>
  );
}
