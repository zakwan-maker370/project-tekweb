import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Lock, Mail, AlertCircle } from "lucide-react";

// Komponen Logo (biar tidak perlu import)
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="bg-emerald-500 p-2 rounded-lg">
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    </div>
    <span className="text-2xl font-bold text-gray-900">
      Kost<span className="text-emerald-500">Finder</span>
    </span>
  </div>
);

export default function LoginPage() {
  const navigate = useNavigate();
  // Ambil fungsi login dari hook
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulasi delay loading
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validasi Manual di Frontend (Contoh sederhana)
    if (email === "admin@kostfinder.com" && password === "admin123") {
      
      // ✅ PERBAIKAN DI SINI:
      // Kita panggil login dengan 2 argumen: (email, password)
      // Ini akan memuaskan TypeScript yang minta 2 argumen.
      await login(email, password);
      
      navigate("/admin/dashboard");
    } else {
      setError("Email atau password salah! (Coba: admin@kostfinder.com / admin123)");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 font-sans">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">
        
        {/* Card Header */}
        <div className="pt-10 pb-6 px-6 flex flex-col items-center text-center space-y-2">
          <div className="scale-110 mb-2">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
          <p className="text-sm text-gray-500">Masukkan akun admin untuk melanjutkan.</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleLogin} className="px-6 pb-8 space-y-4">
          
          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-200">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input 
                type="email" 
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-400 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kostfinder.com"
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input 
                type="password" 
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-gray-400 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                required 
              />
            </div>
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? "Memeriksa..." : "Masuk Dashboard"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}