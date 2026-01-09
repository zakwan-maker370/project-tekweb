import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {LayoutDashboard, Bed, Users, LogOut, Menu, X,    Bell, Search} from "lucide-react";
import { useAuth } from "../hooks/useAuth"; 

interface AdminHeaderProps {
  children: React.ReactNode;
  onSearch?: (term: string) => void;
}

export default function AdminHeader({ children, onSearch }: AdminHeaderProps) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // ✅ 1. STATE UNTUK BUKA/TUTUP SIDEBAR
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default true (terbuka)

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Kamar", path: "/admin/kamar", icon: Bed },
    { name: "Penghuni", path: "/admin/penghuni", icon: Users },
    // Menu Keuangan SUDAH DIHAPUS
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:relative lg:translate-x-0 lg:block`} 
        // Logic di atas: 
        // 1. Kalau isSidebarOpen = true, dia muncul.
        // 2. Di layar besar (lg), dia selalu muncul (lg:translate-x-0).
      >
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <div className="bg-emerald-500 p-1.5 rounded-lg mr-2">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">
              Kost<span className="text-emerald-500">Finder</span>
            </span>
          </div>

          {/* Menu List */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <div className="mb-4 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Menu Utama
            </div>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      isActive ? "text-emerald-500" : "text-gray-400"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-4 px-2">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.email || "Admin"}&background=random`}
                alt="Profile"
                className="w-9 h-9 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email || "Admin Kost"}
                </p>
                <p className="text-xs text-emerald-500">Online</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* --- KONTEN UTAMA (KANAN) --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* HEADER ATAS */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            
            {/* ✅ 2. TOMBOL MENU SEKARANG BERFUNGSI */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* SEARCH BAR */}
            <div className="relative hidden md:block max-w-md w-full">
               {/* Search bar dirender di sini, tapi logicnya dikirim dari prop onSearch */}
               <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-500 sm:text-sm transition-colors"
                    placeholder="Cari data penghuni, kamar, atau tagihan..."
                    onChange={(e) => {
                      if (onSearch) onSearch(e.target.value);
                    }}
                  />
               </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-500">
              <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* AREA KONTEN HALAMAN (KamarPage, PenghuniPage masuk sini) */}
        <main className="flex-1 overflow-auto bg-white">
          {children}
        </main>
      </div>

      {/* OVERLAY HITAM (Hanya muncul di Mobile saat menu terbuka) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

    </div>
  );
}