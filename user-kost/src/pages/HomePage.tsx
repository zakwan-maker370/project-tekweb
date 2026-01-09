import React, { useState } from "react";
import { Navbar } from "../components/public/Navbar";
import { SearchBar } from "../components/public/SearchBar";
import { FilterBar } from "../components/public/FilterBar";
import { KostCard } from "../components/public/KostCard";
import { SkeletonCard } from "../components/public/SkeletonCard";
import { Footer } from "../components/public/Footer";
import { useKostData } from "../hooks/useKostData";

export const HomePage: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useKostData(filter, searchQuery);

  return (
    <div className="min-h-[100dvh] flex flex-col overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Cari kos nyaman
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-yellow-300">tanpa ribet</span>
          </h2>
          <p className="text-emerald-50 mb-8 text-lg">
            Ribuan kos terverifikasi, harga transparan, langsung booking
          </p>

          <div className="max-w-3xl">
            <SearchBar onSearch={setSearchQuery} initialValue={searchQuery} />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <FilterBar
            activeFilter={filter}
            onFilterChange={setFilter}
          />
        </div>

        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-bold mb-6">Rekomendasi Kost</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
            </div>
          ) : data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((kost) => (
                <KostCard key={kost.id} kost={kost} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-gray-500 text-lg">
                Tidak ada kost yang ditemukan. Coba ubah filter atau kata kunci pencarian.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default HomePage;    