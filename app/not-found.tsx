"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const NotFoundPage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session.status, router]);

  if (session.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session.status === 'unauthenticated') {
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
    </div>
  );
};

export default NotFoundPage;
