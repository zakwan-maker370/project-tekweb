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
  pembayaran?: {
    tanggal: string;
    jumlah: number;
    status: "Pending" | "Lunas";
  };
}

interface NewPenghuniInput {
  name: string;
  gender: string;
  phone: string;
  email: string;
  kostId: string;
  roomNumber: string;
  checkInDate: string;
}

interface DataContextType {
  listPenghuni: Penghuni[];
  tambahPenghuni: (data: NewPenghuniInput) => Promise<void>;
  isLoading: boolean;
}

/* =======================
   CONTEXT
======================= */
const DataContext = createContext<DataContextType | undefined>(undefined);

const API_BASE_URL = "https://6958b0096c3282d9f1d58ade.mockapi.io";

/* =======================
   PROVIDER
======================= */
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [listPenghuni, setListPenghuni] = useState<Penghuni[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /* =======================
     FETCH DATA
  ======================= */
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/penhuni`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setListPenghuni(data.reverse());
      }
    } catch (error) {
      console.error(
        "Gagal ambil data. Pastikan resource MockAPI bernama 'penhuni'",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* =======================
     TAMBAH PENGHUNI
  ======================= */
  const tambahPenghuni = async (data: NewPenghuniInput) => {
    setIsLoading(true);
    try {
      await fetch(`${API_BASE_URL}/penhuni`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          status: "Aktif",
          pembayaran: {
            tanggal: new Date().toISOString().split("T")[0],
            jumlah: 850000,
            status: "Pending",
          },
        }),
      });

      await fetchData();
    } catch (error) {
      console.error("Gagal tambah penghuni", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        listPenghuni,
        tambahPenghuni,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

/* =======================
   HOOK
======================= */
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData harus dipakai di DataProvider");
  return context;
};
