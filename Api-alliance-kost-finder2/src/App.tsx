import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/hooks/useAuth"; 
import ProtectedRoute from "./components/admin/ProtectedRoute"; 
import AdminHeader from "./components/admin/AdminHeader";
import DashboardHome from "./components/pages/DashboardHome"; 
import LoginPage from "./components/pages/LoginPage";
import KamarPage from "./components/pages/KamarPage"; 
import PenghuniPage from "./components/pages/PenghuniPage";
import KeuanganPage from "./components/pages/KeuanganPage";


// 1. PENTING: Import DataProvider
import { DataProvider } from "./context/DataContext"; 

function App() {
  return (
    <AuthProvider>
      {/* 2. PENTING: Bungkus aplikasi dengan DataProvider di sini */}
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
                
              {/* Redirect /admin ke dashboard */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

              {/* Dashboard: Tetap dibungkus AdminHeader sesuai kodemu */}
              <Route path="/admin/dashboard" element={
                <AdminHeader>
                  <DashboardHome />
                </AdminHeader>
              } />

              {/* ✅ FIXED: Jangan bungkus KamarPage (Sesuai permintaanmu) */}
              <Route path="/admin/kamar" element={<KamarPage />} />

              {/* ✅ FIXED: PenghuniPage tidak dibungkus AdminHeader di sini */}
              {/* (Asumsi: Di dalam file PenghuniPage.tsx sudah ada AdminHeader sendiri) */}
              <Route path="/admin/penghuni" element={<PenghuniPage />} />

              <Route path="/admin/keuangan" element={<KeuanganPage />} />

            </Route>

            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;