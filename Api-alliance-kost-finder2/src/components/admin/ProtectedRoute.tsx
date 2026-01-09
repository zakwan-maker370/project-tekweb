import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Jika tidak ada user, tendang ke Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada user, izinkan akses konten (Outlet)
  return <Outlet />;
}