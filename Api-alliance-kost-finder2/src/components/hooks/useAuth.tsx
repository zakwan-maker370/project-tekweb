import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// 1. Definisikan tipe data User
interface User {
  email: string;
  name: string;
  role: string;
}

// 2. Definisikan tipe data Context (agar login terbaca callable)
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// 3. Buat Context dengan tipe data yang benar
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("kostfinder_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulasi Login
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "admin@kostfinder.com" && password === "admin123") {
          const userData: User = { email, name: "Super Admin", role: "admin" };
          setUser(userData);
          localStorage.setItem("kostfinder_user", JSON.stringify(userData));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kostfinder_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. Custom Hook dengan validasi
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}