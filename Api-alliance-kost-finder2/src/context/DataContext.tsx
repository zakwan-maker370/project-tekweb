import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

/* =======================
   TIPE DATA
======================= */
export interface Penghuni {
  id: string;
  name: string;
  gender: string;
  phone: string;
  email: string;
  kostId: string;
  roomNumber: string;
  checkInDate: string;
  status: "Aktif" | "Keluar";
  hargaSewa: number;
}

export interface Transaksi {
  id: string;
  penghuniId?: string;
  jenis: "Masuk" | "Keluar";
  jumlah: number;
  status: "Pending" | "Lunas" | "-";
  tanggal: string;
  keterangan: string;
}

export interface DataContextType {
  transaksi: Transaksi[];
  tambahTransaksi: (data: Omit<Transaksi, "id" | "tanggal">) => void;
  updateStatusTransaksi: (id: string, status: "Pending" | "Lunas") => void;
  hapusTransaksi: (id: string) => void;

  listPenghuni: Penghuni[];
  tambahPenghuni: (data: Omit<Penghuni, "id" | "status">) => Promise<Penghuni>;

  totalMasuk: number;
  totalKeluar: number;
  saldoBersih: number;

  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);
const API_BASE_URL = "https://6958b0096c3282d9f1d58ade.mockapi.io";

/* =======================
   PROVIDER
======================= */
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [listPenghuni, setListPenghuni] = useState<Penghuni[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /* ===== TRANSAKSI (LOCAL STORAGE) ===== */
  const [transaksi, setTransaksi] = useState<Transaksi[]>(() => {
    const saved = localStorage.getItem("transaksi");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transaksi", JSON.stringify(transaksi));
  }, [transaksi]);

  /* ===== HAPUS TRANSAKSI ===== */
  const hapusTransaksi = (id: string) => {
    setTransaksi((prev) => prev.filter((t) => t.id !== id));
  };

  /* ===== FETCH PENGHUNI ===== */
  const fetchPenghuni = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/penhuni`);
      const data = await res.json();
      setListPenghuni(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPenghuni();
  }, []);

  /* ===== TAMBAH PENGHUNI ===== */
/* ===== TAMBAH PENGHUNI ===== */
const tambahPenghuni = async (data: Omit<Penghuni, "id" | "status">) => {
  setIsLoading(true);

  try {
    const res = await fetch(`${API_BASE_URL}/penhuni`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        status: "Aktif",
      }),
    });

    const penghuniBaru = await res.json();

    // 1️⃣ simpan penghuni
    setListPenghuni((prev) => [...prev, penghuniBaru]);

    // 2️⃣ TAGIHAN AWAL (ANTI DUPLIKAT)
    if (penghuniBaru.hargaSewa > 0) {
      setTransaksi((prev) => {
        const sudahAda = prev.some(
          (t) =>
            t.penghuniId === penghuniBaru.id &&
            t.jenis === "Masuk" &&
            t.keterangan.startsWith("Tagihan awal")
        );

        if (sudahAda) return prev;

        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            penghuniId: penghuniBaru.id,
            jenis: "Masuk",
            jumlah: penghuniBaru.hargaSewa,
            status: "Pending",
            tanggal: new Date().toISOString().split("T")[0],
            keterangan: `Tagihan awal kamar ${penghuniBaru.roomNumber}`,
          },
        ];
      });
    }

    return penghuniBaru;
  } catch (error) {
    console.error("Gagal tambah penghuni:", error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};


  /* ===== TAMBAH TRANSAKSI ===== */
  const tambahTransaksi = (data: Omit<Transaksi, "id" | "tanggal">) => {
    setTransaksi((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        tanggal: new Date().toISOString().split("T")[0],
        ...data,
      },
    ]);
  };

  /* ===== UPDATE STATUS ===== */
  const updateStatusTransaksi = (id: string, status: "Pending" | "Lunas") => {
    setTransaksi((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  /* ===== HITUNG KEUANGAN ===== */
  const totalMasuk = transaksi
    .filter((t) => t.jenis === "Masuk" && t.status === "Lunas")
    .reduce((sum, t) => sum + t.jumlah, 0);

  const totalKeluar = transaksi
    .filter((t) => t.jenis === "Keluar")
    .reduce((sum, t) => sum + t.jumlah, 0);

  const saldoBersih = totalMasuk - totalKeluar;

  return (
    <DataContext.Provider
      value={{
        transaksi,
        tambahTransaksi,
        updateStatusTransaksi,
        hapusTransaksi,

        listPenghuni,
        tambahPenghuni,

        totalMasuk,
        totalKeluar,
        saldoBersih,

        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

/* ===== HOOK ===== */
export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData harus di dalam DataProvider");
  return ctx;
};
