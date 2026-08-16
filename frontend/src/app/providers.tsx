'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { I18nProvider } from '@/lib/i18n';
import { api } from '@/lib/api';

interface AuthContextType {
  user: any;
  token: string | null;
  login: (dto: any) => Promise<void>;
  register: (dto: any) => Promise<void>;
  logout: () => void;
  openAuthModal: (mode?: 'login' | 'register') => void;
  authModalOpen: boolean;
  authModalMode: 'login' | 'register';
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface SavedContextType {
  savedIds: string[];
  isSaved: (itemId: string) => boolean;
  toggleSave: (itemType: string, itemId: string) => Promise<void>;
}

const SavedContext = createContext<SavedContextType>({} as SavedContextType);

export function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const savedToken = localStorage.getItem('vsl_token');
    const savedUser = localStorage.getItem('vsl_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (dto: any) => {
    const res = await api.login(dto);
    setToken(res.access_token);
    setUser(res.user);
    localStorage.setItem('vsl_token', res.access_token);
    localStorage.setItem('vsl_user', JSON.stringify(res.user));
    setAuthModalOpen(false);
  };

  const register = async (dto: any) => {
    const res = await api.register(dto);
    setToken(res.access_token);
    setUser(res.user);
    localStorage.setItem('vsl_token', res.access_token);
    localStorage.setItem('vsl_user', JSON.stringify(res.user));
    setAuthModalOpen(false);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('vsl_token');
    localStorage.removeItem('vsl_user');
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => setAuthModalOpen(false);

  const isSaved = (itemId: string) => savedIds.includes(itemId);

  const toggleSave = async (itemType: string, itemId: string) => {
    if (!token) {
      openAuthModal('login');
      return;
    }
    try {
      await api.toggleSave(itemType, itemId);
      setSavedIds(prev =>
        prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
      );
    } catch (e) {
      // Local fallback toggle
      setSavedIds(prev =>
        prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
      );
    }
  };

  return (
    <I18nProvider>
      <AuthContext.Provider
        value={{
          user,
          token,
          login,
          register,
          logout,
          openAuthModal,
          authModalOpen,
          authModalMode,
          closeAuthModal,
        }}
      >
        <SavedContext.Provider value={{ savedIds, isSaved, toggleSave }}>
          {children}
        </SavedContext.Provider>
      </AuthContext.Provider>
    </I18nProvider>
  );
}

export const useAuth = () => useContext(AuthContext);
export const useSaved = () => useContext(SavedContext);
