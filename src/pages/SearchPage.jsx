import { Link, useSearchParams } from "react-router-dom";
import { useKosts } from "../hooks/useKosts";
import { useSearch } from "../hooks/useSearch";

const SearchPage = () => {
  const { kosts } = useKosts();
  const [params] = useSearchParams();
  const q = params.get("q") || "";

  const { filteredData } = useSearch(kosts, q);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-xl font-bold mb-6">
        Hasil pencarian: "{q}"
      </h2>

      {filteredData.length === 0 && <p>Kos tidak ditemukan.</p>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredData.map((k) => (
          <Link
            key={k.id}
            to={`/kost/${k.id}`}
            className="bg-white shadow rounded-lg"
          >
            <img src={k.image} className="h-40 w-full object-cover" />
            <div className="p-3">
              <h3 className="font-semibold">{k.name}</h3>
              <p className="text-green-600 font-bold">
                Rp {k.price.toLocaleString("id-ID")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
