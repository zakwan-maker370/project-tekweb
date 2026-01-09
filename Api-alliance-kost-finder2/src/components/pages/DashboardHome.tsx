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
  const { listPenghuni, isLoading } = useData();

  // ===== LOGIKA DATA =====
  const penghuniAktif = listPenghuni.filter(
    (p) => p.status === "Aktif"
  );

  const totalPenghuni = penghuniAktif.length;

  const belumLunas = penghuniAktif.filter(
    (p) => p.pembayaran?.status === "Pending"
  ).length;

  const recentPayments = penghuniAktif
    .filter((p) => p.pembayaran)
    .sort((a, b) =>
      new Date(b.pembayaran!.tanggal).getTime() -
      new Date(a.pembayaran!.tanggal).getTime()
    )

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Wallet}
          label="Total Pendapatan"
          value="Rp 15.250.000"
          subtext="Manual (sementara)"
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
          value={`${belumLunas} Orang`}
          subtext="Perlu ditagih"
          color="bg-orange-500"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="font-bold text-lg mb-4">
          Pembayaran Terakhir
        </h3>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Kamar</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Jumlah</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {recentPayments.length > 0 ? (
              recentPayments.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">{p.roomNumber}</td>
                  <td className="px-4 py-3">{p.pembayaran!.tanggal}</td>
                  <td className="px-4 py-3">
                    Rp {p.pembayaran!.jumlah.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.pembayaran!.status === "Lunas"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {p.pembayaran!.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  Belum ada pembayaran
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
