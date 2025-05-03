// src/context/authContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload, AuthContextType } from '../types/login';
import { loginUser as apiLoginUser } from '../api/usersApi'; // import from your API layer

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  login: async () => {},
  logout: () => {},
});

// Helper function to get current user from token
function getCurrentUser(): JwtPayload | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<JwtPayload | null>(getCurrentUser());

  useEffect(() => {
    // This will ensure the user state updates if the token changes
    const handleStorageChange = () => {
      setUser(getCurrentUser());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Login function: uses API method and sets the user state
  const login = async (email: string, password: string) => {
    console.log('Login function called with:', email, password)
    try {
      const token = await apiLoginUser(email, password)
      console.log('Token after login:', token); // Get token from API
      if (token) {
        localStorage.setItem('token', token);  // Store token in localStorage
        setUser(getCurrentUser());  // Set the user state after decoding the token
      }
    } catch (error) {
      throw new Error('Login failed'); // Handle any errors from the API
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin: user?.role === 'ADMIN', login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}