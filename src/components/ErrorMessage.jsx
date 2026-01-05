import { useNavigate } from "react-router-dom";

const ErrorMessage = ({ message }) => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-red-800 mb-2">Data Tidak Ditemukan</h2>
        <p className="text-red-600 mb-6">{message || "Kost yang Anda cari tidak tersedia"}</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;