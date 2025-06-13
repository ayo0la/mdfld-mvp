import React, { useEffect, useState, createContext, useContext } from 'react';
import { getCurrentUser, signIn as amplifySignIn, signOut as amplifySignOut } from 'aws-amplify/auth';

interface AuthContextType {
  user: any;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (username: string, password: string) => {
    const user = await amplifySignIn({ username, password });
    setUser(user);
    return user;
  };

  const signOut = async () => {
    await amplifySignOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}; 