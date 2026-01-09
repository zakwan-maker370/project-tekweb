import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialValue = ''
}) => {
  const [query, setQuery] = useState(initialValue);

  // ✅ AUTO SEARCH — LANGSUNG, 1 HURUF JUGA JALAN
  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  // ✅ TOMBOL CARI (OPTIONAL MANUAL)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari lokasi, kampus, tipe kost"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-gray-900 bg-white placeholder:text-gray-400"
          />
        </div>

        <Button type="submit" size="lg" className="whitespace-nowrap h-12 px-6 color-white bg-emerald-700 hover:bg-emerald-900">
          Cari
        </Button>
      </div>
    </form>
  );
};
