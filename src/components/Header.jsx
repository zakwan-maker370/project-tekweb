import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold text-gray-800">
            Kost<span className="text-green-600">Finder</span>
          </span>
        </Link>

        {/* AUTH BUTTON */}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              Halo, {user.name}
            </span>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold"
            >
              <LogOut size={16} />
              Keluar
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold"
          >
            Masuk
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
