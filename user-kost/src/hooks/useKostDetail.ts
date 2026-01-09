import { useEffect, useState } from "react";
import { Kost } from "./useKostData";

export const useKostDetail = (id: string) => {
  const [data, setData] = useState<Kost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(
          `https://695f4cfc7f037703a81347e2.mockapi.io/kosts/${id}`
        );

        if (!res.ok) throw new Error("Gagal mengambil detail kost");

        const result: Kost = await res.json();
        setData(result);
      } catch (err) {
        setError("Data kost tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { data, loading, error };
};
