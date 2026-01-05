import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapPin, ArrowLeft, MessageCircle, Wifi } from "lucide-react";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";

// ⚠️ GANTI INI DENGAN URL MOCKAPI ANDA
const API_URL = "https://6958b0096c3282d9f1d58ade.mockapi.io/kosts";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [kost, setKost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data dari API
  useEffect(() => {
    const fetchKostDetail = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${API_URL}/${id}`);
        
        if (!response.ok) {
          throw new Error("Data tidak ditemukan");
        }
        
        const data = await response.json();
        setKost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKostDetail();
  }, [id]);

  // Fungsi WhatsApp Checkout
  const handleWhatsAppCheckout = () => {
    if (!kost) return;
    
    const message = `Halo, saya ingin memesan/booking ${kost.name}

Detail:
- Tipe: ${kost.type}
- Harga: Rp ${kost.price?.toLocaleString('id-ID')}/bulan
- Alamat: ${kost.address}
- Fasilitas: ${kost.facilities?.join(', ') || 'Lengkap'}

Mohon info lebih lanjut. Terima kasih!`;

    // ⚠️ GANTI INI DENGAN NOMOR WA ANDA (format: 62xxx)
    const waNumber = "6281234567890";
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(waUrl, '_blank');
  };

  // Tampilkan Loading
  if (loading) return <LoadingSkeleton />;

  // Tampilkan Error
  if (error || !kost) return <ErrorMessage message={error} />;

  // Tampilkan Data
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      
      {/* HEADER */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Kembali</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        
        {/* IMAGE */}
        <img
          src={kost.image}
          alt={kost.name}
          className="w-full h-96 object-cover rounded-2xl shadow-lg"
        />

        {/* CONTENT */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg">
          
          {/* BADGE */}
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow">
              {kost.type}
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-3xl font-bold text-gray-800">
            {kost.name}
          </h1>

          {/* ADDRESS */}
          <div className="flex items-start gap-2 text-gray-600 mt-3">
            <MapPin size={20} className="mt-0.5 flex-shrink-0" />
            <p className="text-lg">{kost.address}</p>
          </div>

          {/* PRICE */}
          <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200">
            <p className="text-sm text-gray-600 mb-1">Harga Sewa</p>
            <div className="flex items-end gap-2">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 text-4xl font-extrabold">
                Rp {kost.price?.toLocaleString("id-ID")}
              </p>
              <span className="text-gray-500 text-lg mb-1">/ bulan</span>
            </div>
          </div>

          {/* DESCRIPTION */}
          {kost.description && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Deskripsi
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {kost.description}
              </p>
            </div>
          )}

          {/* FACILITIES */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Fasilitas
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {kost.facilities?.map((facility, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 hover:border-green-300 transition"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Wifi size={18} className="text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    {facility}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* WHATSAPP BUTTON */}
          <button
            onClick={handleWhatsAppCheckout}
            className="mt-8 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl"
          >
            <MessageCircle size={24} />
            Hubungi Pemilik via WhatsApp
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            💬 Langsung chat pemilik untuk info lebih lanjut
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;