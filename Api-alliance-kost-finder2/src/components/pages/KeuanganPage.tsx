import React, { useState } from "react";
import { Wallet, ArrowDown, ArrowUp } from "lucide-react";
import { useData } from "../../context/DataContext";
import AdminHeader from "../admin/AdminHeader";

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-white p-5 rounded-xl border shadow-sm flex justify-between">
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className={`text-xl font-bold ${color}`}>{value}</h3>
    </div>
    <Icon className="w-6 h-6 text-gray-400" />
  </div>
);

export default function KeuanganPage() {
const {
  transaksi,
  tambahTransaksi,
  updateStatusTransaksi,
  hapusTransaksi,
  listPenghuni,
  totalMasuk,
  totalKeluar,
  saldoBersih,
} = useData();

  const [selectedPenghuniId, setSelectedPenghuniId] = useState("");
  const [jumlahText, setJumlahText] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [jenis, setJenis] = useState<"Masuk" | "Keluar">("Masuk");
  const [status, setStatus] = useState<"Pending" | "Lunas">("Pending");

  const handleSubmit = () => {
    const jumlahAngka = Number(jumlahText.replace(/\D/g, ""));
    if (!jumlahAngka) return alert("Jumlah tidak valid");

    if (jenis === "Masuk" && !selectedPenghuniId) {
      return alert("Pilih penghuni terlebih dahulu");
    }

    tambahTransaksi({
      penghuniId: jenis === "Masuk" ? selectedPenghuniId : "-",
      jenis,
      keterangan,
      jumlah: jumlahAngka,
      status: jenis === "Keluar" ? "-" : status,
    });

    setJumlahText("");
    setKeterangan("");
    setStatus("Pending");
    setSelectedPenghuniId("");
  };

  const getNamaPenghuni = (id?: string) => {
    if (!id) return "-";

    const p = listPenghuni.find((x) => x.id === id);
    return p ? p.name : "-";
  };
  const uangMasuk = transaksi.filter((t) => t.jenis === "Masuk");
  const uangKeluar = transaksi.filter((t) => t.jenis === "Keluar");

  return (
    <AdminHeader>
      <div className="p-6 space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">Keuangan & Tagihan</h1>
          <p className="text-gray-500">Uang masuk & keluar kost</p>
        </div>

        {/* STAT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            icon={ArrowDown}
            label="Total Masuk (Lunas)"
            value={`Rp ${totalMasuk.toLocaleString("id-ID")}`}
            color="text-emerald-600"
          />
          <StatCard
            icon={ArrowUp}
            label="Total Keluar"
            value={`Rp ${totalKeluar.toLocaleString("id-ID")}`}
            color="text-red-600"
          />
          <StatCard
            icon={Wallet}
            label="Saldo Bersih"
            value={`Rp ${saldoBersih.toLocaleString("id-ID")}`}
            color="text-blue-600"
          />
        </div>

        {/* FORM */}
        <div className="bg-white p-5 rounded-xl border max-w-xl space-y-3">
          <h3 className="font-semibold">Catat Transaksi</h3>

          <select
            className="border p-2 rounded w-full"
            value={jenis}
            onChange={(e) => setJenis(e.target.value as any)}
          >
            <option value="Masuk">Uang Masuk</option>
            <option value="Keluar">Uang Keluar</option>
          </select>

          {jenis === "Masuk" && (
            <>
              <select
                className="border p-2 rounded w-full"
                value={selectedPenghuniId}
                onChange={(e) => setSelectedPenghuniId(e.target.value)}
              >
                <option value="">Pilih Penghuni</option>
                {listPenghuni.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <select
                className="border p-2 rounded w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <option value="Pending">Pending</option>
                <option value="Lunas">Lunas</option>
              </select>
            </>
          )}

          <input
            type="text"
            placeholder="Keterangan"
            className="border p-2 rounded w-full"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />

          <input
            type="text"
            placeholder="Jumlah (contoh: 200.000)"
            className="border p-2 rounded w-full"
            value={jumlahText}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              setJumlahText(raw ? Number(raw).toLocaleString("id-ID") : "");
            }}
          />

          <button
            onClick={handleSubmit}
            className="bg-emerald-500 text-white px-4 py-2 rounded"
          >
            Simpan Transaksi
          </button>
        </div>

        {/* UANG MASUK */}
        <div className="bg-white rounded-xl border">
          <h3 className="font-semibold p-4 border-b">Uang Masuk</h3>

          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Tanggal</th>
                <th className="p-3 text-left">Penghuni</th>
                <th className="p-3 text-left">Keterangan</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Jumlah</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {uangMasuk.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="p-3">{t.tanggal}</td>
                  <td className="p-3">{getNamaPenghuni(t.penghuniId)}</td>
                  <td className="p-3">{t.keterangan}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        t.status === "Lunas"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3 text-right text-emerald-600">
                    Rp {(t.jumlah ?? 0).toLocaleString("id-ID")}

                  </td>
<td className="p-3 text-center space-x-2">
  {t.status === "Pending" ? (
    <>
      <button
        onClick={() => updateStatusTransaksi(t.id, "Lunas")}
        className="text-xs bg-emerald-500 text-white px-2 py-1 rounded"
      >
        Tandai Lunas
      </button>

      <button
        onClick={() => {
          if (confirm("Yakin hapus transaksi ini?")) {
            hapusTransaksi(t.id);
          }
        }}
        className="text-xs bg-red-500 text-white px-2 py-1 rounded"
      >
        Hapus
      </button>
    </>
  ) : (
    <button
      onClick={() => updateStatusTransaksi(t.id, "Pending")}
      className="text-xs bg-yellow-500 text-white px-2 py-1 rounded"
    >
      Pendingkan
    </button>
  )}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* UANG KELUAR */}
        <div className="bg-white rounded-xl border">
          <h3 className="font-semibold p-4 border-b">Uang Keluar</h3>

          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Tanggal</th>
                <th className="p-3 text-left">Keterangan</th>
                <th className="p-3 text-right">Jumlah</th>
              </tr>
            </thead>

            <tbody>
              {uangKeluar.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="p-3">{t.tanggal}</td>
                  <td className="p-3">{t.keterangan}</td>
                  <td className="p-3 text-right text-red-600">
                    Rp {(t.jumlah ?? 0).toLocaleString("id-ID")}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
        </div>
      </div>
    </AdminHeader>
  );
}
