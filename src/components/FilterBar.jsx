const filters = ["Semua", "Putra", "Putri", "Campur"];

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex gap-3">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all
          ${
            filter === item
              ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg scale-105"
              : "bg-slate-100 text-gray-600 hover:bg-slate-200"
          }
        `}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
