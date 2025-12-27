import { useMemo } from "react";

export function useSearch(data, query) {
  const filteredData = useMemo(() => {
    return data.filter(
      (k) =>
        k.name.toLowerCase().includes(query.toLowerCase()) ||
        k.address.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);

  return { filteredData };
}
