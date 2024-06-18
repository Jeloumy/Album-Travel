// app/context/UserContext.tsx
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Users {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: Users | null;
  setUser: React.Dispatch<React.SetStateAction<Users | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Users | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  if (!isHydrated) {
    // Render a loading state or null while waiting for hydration
    return null;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
