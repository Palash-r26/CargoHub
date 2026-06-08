import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  login: (token: string, profile?: any) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('@cargohub_driver_token');
        if (token) {
          const response = await api.get('/auth/me');
          if (response.data?.data) setUser(response.data.data);
        }
      } catch (error) {
        console.log('No active session or session expired');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (token: string, fallbackProfile?: any) => {
    await AsyncStorage.setItem('@cargohub_driver_token', token);
    try {
      const response = await api.get('/auth/me');
      if (response.data?.data) {
        setUser(response.data.data);
        return;
      }
    } catch (e) {
      console.log('Error fetching user profile during login:', e);
    }
    if (fallbackProfile) setUser(fallbackProfile);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@cargohub_driver_token');
    await AsyncStorage.removeItem('@cargohub_mock_uid');
    setUser(null);
  };

  const updateProfile = (updates: any) => setUser((prev: any) => prev ? { ...prev, ...updates } : null);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
