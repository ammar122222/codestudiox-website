
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const authToken = localStorage.getItem('admin_auth');
    if (authToken === 'authenticated') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // For now, using hardcoded credentials - replace with Supabase auth later
    const validCredentials = [
      { email: 'admin@codestudiox.com', password: 'admin123' },
      { email: 'brother@codestudiox.com', password: 'brother123' }
    ];

    const isValid = validCredentials.some(
      cred => cred.email === email && cred.password === password
    );

    if (isValid) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'authenticated');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
};
