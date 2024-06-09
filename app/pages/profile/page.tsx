// app/pages/profile/page.tsx
"use client"; // Indique que ce module est du code côté client

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]); // Ajout de router aux dépendances

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default ProfilePage;
