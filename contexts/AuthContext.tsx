'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AuthContextValue, AuthResponse, Credentials, RegistrationInput, User } from '@/types';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function postAuth(url: string, body: unknown = {}): Promise<User | null> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || result.message || 'Something went wrong');
  return (result as AuthResponse).user;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((response) => (response.ok ? response.json() : { user: null }))
      .then((result: AuthResponse) => setUser(result.user))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (credentials: Credentials) => {
    const signedIn = await postAuth('/api/auth/login', credentials);
    setUser(signedIn);
    return signedIn;
  }, []);

  const register = useCallback(async (input: RegistrationInput) => {
    const created = await postAuth('/api/auth/register', input);
    setUser(created);
    return created;
  }, []);

  const logout = useCallback(async () => {
    await postAuth('/api/auth/logout');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
