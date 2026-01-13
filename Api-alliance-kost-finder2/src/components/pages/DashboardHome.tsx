import React from "react";
import { Users, Bed, Wallet, AlertCircle } from "lucide-react";
import { useData } from "../../context/DataContext";

const StatCard = ({ icon: Icon, label, value, subtext, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
        <p className="text-xs text-gray-500 mt-1">{subtext}</p>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export default function DashboardHome() {
  const { listPenghuni, transaksi, isLoading } = useData();

  /* ===== DATA PENGHUNI ===== */
  const penghuniAktif = listPenghuni.filter((p) => p.status === "Aktif");
  const totalPenghuni = penghuniAktif.length;

  /* ===== DATA KEUANGAN ===== */
const pembayaranTerakhir = transaksi
  .filter((t) => t.jenis === "Masuk" && t.status === "Lunas")
  .sort(
    (a, b) =>
      new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
  );


  const pendingTagihan = transaksi.filter(
    (t) => t.status === "Pending" && t.penghuniId
  );

  const transaksiMasuk = transaksi
    .filter((t) => t.jenis === "Masuk" && t.status === "Lunas")
    .sort(
      (a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime()
    );

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Sedang memuat data dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Ringkasan data kost hari ini</p>
      </div>

      {/* STAT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Wallet}
          label="Total Pendapatan"
          value={`Rp ${transaksi
            .filter((t) => t.jenis === "Masuk")
            .reduce(
              (a, b) => a + (typeof b.jumlah === "number" ? b.jumlah : 0),
              0
            )
            .toLocaleString("id-ID")}`}
          subtext="Realtime"
          color="bg-emerald-500"
        />

        <StatCard
          icon={Bed}
          label="Kamar Terisi"
          value={`${totalPenghuni} / 20`}
          subtext="Realtime"
          color="bg-blue-500"
        />

        <StatCard
          icon={Users}
          label="Total Penghuni"
          value={`${totalPenghuni} Orang`}
          subtext="Aktif"
          color="bg-purple-500"
        />

        <StatCard
          icon={AlertCircle}
          label="Tagihan Pending"
          value={`${pendingTagihan.length} Transaksi`}
          subtext="Perlu ditagih"
          color="bg-orange-500"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="font-bold text-lg mb-4">Pembayaran Terakhir</h3>

        <table className="w-full text-sm overflow-y-auto">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              {/* DATA PENGHUNI */}
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Kamar</th>
              <th className="px-4 py-3 text-left">Tanggal</th>

              {/* DATA KEUANGAN */}
              <th className="px-4 py-3 text-right">Jumlah</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {pembayaranTerakhir.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  Belum ada pembayaran lunas
                </td>
              </tr>
            ) : (
              pembayaranTerakhir.map((t) => {
                const penghuni = listPenghuni.find(
                  (p) => p.id === t.penghuniId
                );

                return (
                  <tr key={t.id}>
                    <td className="px-4 py-3 font-medium">
                      {penghuni?.name ?? "-"}
                    </td>
                    <td className="px-4 py-3">{penghuni?.roomNumber ?? "-"}</td>
                    <td className="px-4 py-3">{t.tanggal}</td>

                    <td className="px-4 py-3 text-right">
                      Rp {t.jumlah.toLocaleString("id-ID")}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        Lunas
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
