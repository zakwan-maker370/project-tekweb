import { useState, useEffect } from 'react';

export interface Kost {
  id: string;
  name: string;
  type: string;         
  price: number;
  address: string;
  image: string;
  facilities: string[];
  description?: string;
}

export const useKostData = (filter = 'all', searchQuery = '') => {
  const [data, setData] = useState<Kost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          'https://695f4cfc7f037703a81347e2.mockapi.io/kosts'
        );

        const result: Kost[] = await response.json();
        let filtered = result;

        // ✅ FILTER PUTRA / PUTRI / CAMPUR
        if (filter !== 'all') {
          filtered = filtered.filter(
            kost => kost.type.toLowerCase() === filter
          );
        }

        // ✅ FILTER SEARCH
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(
            kost =>
              kost.name.toLowerCase().includes(q) ||
              kost.address.toLowerCase().includes(q) ||
              kost.facilities.some(facility => facility.toLowerCase().includes(q))
          );
        }

        setData(filtered);
      } catch (err) {
        setError('Gagal memuat data kost');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter, searchQuery]);

  return { data, loading, error };
};
