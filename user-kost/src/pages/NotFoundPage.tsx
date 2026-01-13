import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold text-emerald-600 mb-4">404</h1>
      <p className="text-xl font-semibold mb-2">
        Halaman tidak ditemukan
      </p>
      <p className="text-gray-500 mb-6">
        Data kost yang kamu cari tidak tersedia
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg"
      >
        <ArrowLeft size={18} />
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFoundPage;
