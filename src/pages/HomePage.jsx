import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useKosts } from "../hooks/useKosts";
import FilterBar from "../components/FilterBar";
import KostCard from "../components/KostCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";

const HomePage = () => {
  const navigate = useNavigate();
  const { kosts, loading, error, refetch } = useKosts(); // ✅ Tambahin loading, error, refetch
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Semua");

  const filteredData =
    filter === "Semua"
      ? kosts
      : kosts.filter((k) => k.type === filter);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-500 to-teal-400 py-28">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-20 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Cari kos nyaman <br />
            <span className="text-yellow-300">tanpa ribet</span>
          </h1>

          <p className="text-lg mt-4 opacity-90 max-w-xl">
            Ribuan kos terverifikasi, harga transparan, langsung booking
          </p>

          {/* SEARCH BOX */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search?q=${query}`);
            }}
            className="mt-10 bg-white rounded-2xl shadow-2xl p-2 flex max-w-3xl"
          >
            <div className="flex items-center px-4 text-gray-400">
              <Search />
            </div>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari lokasi, kampus, atau nama kos"
              className="flex-1 py-4 outline-none text-gray-700"
            />

            <button className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 rounded-xl font-semibold">
              Cari
            </button>
          </form>
        </div>
      </section>

      {/* FILTER */}
      <FilterBar filter={filter} setFilter={setFilter} />

      {/* LIST */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold mb-6">Rekomendasi Kost</h2>

        {/* ✅ TAMPILKAN ERROR */}
        {error && (
          <ErrorMessage message={error} onRetry={refetch} />
        )}

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
              <KostCard key={kost.id} kost={kost} />
            ))}
          </div>
        )}

        {/* ✅ JIKA DATA KOSONG */}
        {!loading && !error && filteredData.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white rounded-xl p-12 shadow-md">
              <p className="text-gray-500 text-lg mb-2">🔍 Tidak ada kost ditemukan</p>
              <p className="text-gray-400 text-sm">
                Coba ganti filter atau cari dengan kata kunci lain
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;