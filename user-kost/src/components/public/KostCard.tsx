import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Kost } from '../../hooks/useKostData';

interface KostCardProps {
  kost: Kost;
}

export const KostCard: React.FC<KostCardProps> = ({ kost }) => {
  const handleCheckout = (e: React.MouseEvent) => {
    e.stopPropagation(); // ⛔ cegah pindah halaman
    const message = `Halo, saya ingin memesan ${kost.name} di ${kost.address}. Harga: Rp ${kost.price.toLocaleString('id-ID')}/bulan`;
    window.open(
      `https://wa.me/6283178778719?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      
      {/* IMAGE → LINK KE DETAIL */}
      <Link to={`/kost/${kost.id}`} state={{ kost }}>
        <div className="relative">
          <img
            src={kost.image}
            alt={kost.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-2 left-2">
            <Badge variant="default" className="capitalize">
              {kost.type}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="p-4">
        {/* TITLE → LINK KE DETAIL */}
        <Link to={`/kost/${kost.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:underline">
            {kost.name}
          </h3>
        </Link>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{kost.address}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          {kost.facilities.slice(0, 3).map((facility, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {facility}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-600 font-bold text-xl">
              Rp {(kost.price / 1000).toFixed(0)}Rb
            </p>
            <p className="text-gray-500 text-xs">per bulan</p>
          </div>

          {/* ✅ BUTTON TIDAK PINDAH HALAMAN */}
          <Button size="sm" onClick={handleCheckout}>
            Booking
          </Button>
        </div>
      </div>
    </Card>
  );
};
