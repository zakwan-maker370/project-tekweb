import { useState, useEffect } from "react";

// ⚠️ GANTI INI DENGAN URL MOCKAPI ANDA
const API_URL = "https://6958b0096c3282d9f1d58ade.mockapi.io/kosts";

export function useKosts() {
  const [kosts, setKosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk fetch data dari API
  const fetchKosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setKosts(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data kost");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Jalankan fetch saat component pertama kali di-mount
  useEffect(() => {
    fetchKosts();
  }, []);

  return {
    kosts,      // Data kost dari API
    loading,    // Status loading (true/false)
    error,      // Pesan error (jika ada)
    refetch: fetchKosts  // Fungsi untuk retry fetch
  };
}