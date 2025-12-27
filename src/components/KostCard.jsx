import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

const KostCard = ({ kost }) => {
  return (
    <Link
      to={`/kost/${kost.id}`}
      className="group bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
    >
      {/* IMAGE */}
      <div className="relative">
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
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 line-clamp-1">
          {kost.name}
        </h3>

        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin size={14} className="mr-1" />
          <span className="line-clamp-1">{kost.address}</span>
        </div>

        {/* PRICE */}
        <div className="mt-4 flex items-end justify-between">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 font-extrabold text-lg">
            Rp {kost.price.toLocaleString("id-ID")}
          </p>

          <span className="text-xs text-gray-500">/ bulan</span>
        </div>
      </div>
    </Link>
  );
};

export default KostCard;
