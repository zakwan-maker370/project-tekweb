import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../admin/AdminHeader";
import FormData from "../admin/FormData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API_URL = "https://695f4cfc7f037703a81347e2.mockapi.io/kosts";

export default function AdminEditPage() {
  const { id } = useParams(); // menangkap id dari URL
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);

  const isEditMode = !!id;

  // Jika Mode Edit, Ambil Data Lama
  useEffect(() => {
    if (isEditMode) {
      fetch(`${API_URL}/${id}`)
        .then((res) => res.json())
        .then((data) => setInitialData(data))
        .catch((err) => console.error(err));
    }
  }, [id, isEditMode]);

  // Fungsi Submit (Handle POST & PUT)
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const method = isEditMode ? "PUT" : "POST";
      const url = isEditMode ? `${API_URL}/${id}` : API_URL;

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate("/admin"); // Kembali ke dashboard setelah sukses
      } else {
        alert("Gagal menyimpan data");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminHeader>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>
              {isEditMode ? "Edit Data Kamar" : "Tambah Kamar Baru"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Tampilkan Form hanya jika data sudah siap (untuk edit) atau mode tambah */}
            {(initialData || !isEditMode) && (
              <FormData
                // Gunakan operator logika OR '||'
                initialData={initialData || undefined}
                onSubmit={handleSubmit}
                loading={loading}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AdminHeader>
  );
}
