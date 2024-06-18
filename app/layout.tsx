// app/layout.tsx
'use client';

import { UserProvider } from './context/UserContext';
import { Inter } from 'next/font/google';
import './globals.css'; // Importez vos styles globaux

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} mx-20`}> {/* Ajoutez vos classes Tailwind ici */}
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
