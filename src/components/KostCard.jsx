import { MapPin, Star, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const KostCard = ({ kost }) => {
  console.log("Kost ID:", kost.id);
  // ✅ FUNGSI WHATSAPP CHECKOUT
  const handleCheckout = (e) => {
    e.preventDefault(); // Agar tidak navigate ke detail page
    e.stopPropagation();

    const message = `Halo, saya ingin memesan/booking ${kost.name}

Detail:
- Tipe: ${kost.type}
- Harga: Rp ${kost.price?.toLocaleString("id-ID")}/bulan
- Alamat: ${kost.address}
- Fasilitas: ${kost.facilities?.join(", ") || "Lengkap"}

Mohon info lebih lanjut. Terima kasih!`;

    const waNumber = "6282339028734";
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(waUrl, "_blank");
  };

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
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

        {/* RATING */}
        <div className="absolute top-3 right-3 flex items-center bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-bold shadow">
          <Star size={14} className="mr-1 fill-white" /> 4.8
        </div>
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

        {/* TOMBOL WHATSAPP */}
        <button
          onClick={handleCheckout}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
        >
          <MessageCircle size={18} />
          Hubungi via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default KostCard;
