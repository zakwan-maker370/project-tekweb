import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useKostData } from "../hooks/useKostData";

const DetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // ambil data dari hook (sama seperti HomePage)
  const { data, loading } = useKostData("all", "");

  // 1️⃣ prioritas: dari state (klik dari HomePage)
  const kostFromState = location.state?.kost;

  // 2️⃣ fallback: cari dari data pakai id
  const kost =
    kostFromState ||
    data.find((k) => k.id === id);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <p>Loading...</p>
      </div>
    );
  }

  if (!kost) {
  return <Navigate to="/404" replace />;
}


  if (!kost) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600"
        >
          <ArrowLeft size={18} /> Kembali
        </button>

        <p className="mt-6 text-gray-500">Kost tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* 🔙 BACK */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-emerald-600"
      >
        <ArrowLeft size={18} />
        Kembali
      </button>

      <img
        src={kost.image}
        alt={kost.name}
        className="w-full h-[400px] object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">{kost.name}</h1>

      <p className="text-emerald-600 text-xl font-semibold mb-4">
        Rp {(kost.price / 1000).toFixed(0)}Rb / bulan
      </p>

      <p className="text-gray-600 mb-4">{kost.address}</p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {kost.facilities.map((f, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-green-100 rounded-full text-sm"
          >
            {f}
          </span>
        ))}
      </div>

      <a
        href={`https://wa.me/6283178778719?text=${encodeURIComponent(
          `Halo, saya tertarik dengan ${kost.name}`
        )}`}
        target="_blank"
        className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg"
      >
        Booking via WhatsApp
      </a>
    </div>
  );
};

export default DetailPage;
