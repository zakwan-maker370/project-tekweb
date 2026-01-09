import React from 'react';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'Semua' },
    { id: 'putra', label: 'Putra' },
    { id: 'putri', label: 'Putri' },
    { id: 'campur', label: 'Campur' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
            activeFilter === filter.id
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-600'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};