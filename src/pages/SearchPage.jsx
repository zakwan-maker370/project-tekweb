import { Link, useSearchParams } from "react-router-dom";
import { MapPin, MessageCircle } from "lucide-react";
import { useKosts } from "../hooks/useKosts";
import { useSearch } from "../hooks/useSearch";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";

const SearchPage = () => {
  const { kosts, loading, error, refetch } = useKosts(); // ✅ Tambahin loading, error, refetch
  const [params] = useSearchParams();
  const q = params.get("q") || "";

  const { filteredData } = useSearch(kosts, q);

  // ✅ FUNGSI WHATSAPP CHECKOUT
  const handleWhatsAppCheckout = (kost, e) => {
    e.preventDefault(); // Jangan navigate ke detail
    e.stopPropagation();

    const message = `Halo, saya ingin memesan/booking ${kost.name}

Detail:
- Tipe: ${kost.type}
- Harga: Rp ${kost.price?.toLocaleString('id-ID')}/bulan
- Alamat: ${kost.address}
- Fasilitas: ${kost.facilities?.join(', ') || 'Lengkap'}

Mohon info lebih lanjut. Terima kasih!`;

    const waNumber = "6282339028734"; 
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(waUrl, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-2">
        Hasil pencarian: <span className="text-green-600">"{q}"</span>
      </h2>
      <p className="text-gray-600 mb-6">
        {loading ? "Mencari..." : `${filteredData.length} kost ditemukan`}
      </p>

      {/* ✅ TAMPILKAN ERROR */}
      {error && <ErrorMessage message={error} onRetry={refetch} />}

      {/* ✅ TAMPILKAN LOADING */}
      {loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      )}

      {/* ✅ TAMPILKAN DATA */}
      {!loading && !error && filteredData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredData.map((kost) => (
            <div
              key={kost.id}
              className="group bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
            >
              {/* IMAGE */}
              <Link to={`/kost/${kost.id}`} className="block relative">
                <img
                  src={kost.image}
                  alt={kost.name}
                  className="h-44 w-full object-cover group-hover:scale-105 transition"
                />

                {/* BADGE TYPE */}
                <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {kost.type}
                </span>
              </Link>

              {/* CONTENT */}
              <div className="p-4">
                <Link to={`/kost/${kost.id}`}>
                  <h3 className="font-semibold text-gray-800 line-clamp-1 hover:text-green-600 transition">
                    {kost.name}
                  </h3>
                </Link>

                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin size={14} className="mr-1" />
                  <span className="line-clamp-1">{kost.address}</span>
                </div>

                {/* PRICE */}
                <div className="mt-4 flex items-end justify-between">
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 font-extrabold text-lg">
                    Rp {kost.price?.toLocaleString("id-ID")}
                  </p>
                  <span className="text-xs text-gray-500">/ bulan</span>
                </div>

                {/* ✅ TOMBOL WHATSAPP */}
                <button
                  onClick={(e) => handleWhatsAppCheckout(kost, e)}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
                >
                  <MessageCircle size={18} />
                  Hubungi via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ JIKA DATA KOSONG */}
      {!loading && !error && filteredData.length === 0 && (
        <div className="text-center py-20">
          <div className="bg-white rounded-xl p-12 shadow-md">
            <p className="text-gray-500 text-2xl mb-2">🔍 Tidak ada hasil</p>
            <p className="text-gray-400 mb-6">
              Kost dengan kata kunci <strong>"{q}"</strong> tidak ditemukan
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;