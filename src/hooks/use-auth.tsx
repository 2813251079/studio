'use client';

import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// A mock user type. In a real app, this would be more complex.
type User = {
  displayName: string | null;
  email: string | null;
  photoURL?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for a mock user in localStorage on initial load
  useEffect(() => {
    try {
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    } catch (error) {
        console.error("Could not parse mock user from localStorage", error);
        localStorage.removeItem('mockUser');
    }
    setLoading(false);
  }, []);

  const login = useCallback((userData: User) => {
    localStorage.setItem('mockUser', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('mockUser');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useRequireAuth(redirectUrl = '/auth/login') {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If loading is finished and there is no user, redirect.
    if (!loading && !user) {
        // We can store the attempted path to redirect back after login.
        if (pathname !== redirectUrl) {
            sessionStorage.setItem('redirectAfterLogin', pathname);
        }
        router.push(redirectUrl);
    }
  }, [user, loading, router, redirectUrl, pathname]);

  return { user, loading };
}
