import { useParams } from "react-router-dom";
import kostsData from "../data/KostsData";

const DetailPage = () => {
  const { id } = useParams();
  const kost = kostsData.find((k) => k.id === Number(id));

  if (!kost) return <p>Data tidak ditemukan</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <img
        src={kost.image}
        className="w-full h-96 object-cover rounded-2xl shadow"
      />

      <div className="mt-6 bg-white rounded-2xl p-6 shadow">
        <h1 className="text-2xl font-bold">{kost.name}</h1>
        <p className="text-gray-500">{kost.address}</p>

        <p className="text-green-600 text-xl font-bold mt-4">
          Rp {kost.price.toLocaleString("id-ID")} / bulan
        </p>

        <h3 className="font-semibold mt-6">Fasilitas</h3>
        <div className="flex gap-2 mt-2 flex-wrap">
          {kost.facilities.map((f, i) => (
            <span
              key={i}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {f}
            </span>
          ))}
        </div>

        <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700">
          Hubungi Pemilik
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
