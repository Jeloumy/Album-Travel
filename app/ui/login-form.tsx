// app/ui/login-form.tsx
'use client';

import { inter } from '../ui/fonts';
import { Button } from '../ui/button';
import { useFormStatus } from 'react-dom';
import { authenticate } from '../lib/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const error = await authenticate(undefined, formData);

    if (error) {
      setErrorMessage(error);
    } else {
      const email = formData.get('email') as string;
      try {
        const response = await fetch(`/api/user?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data); // Stocker les informations de l'utilisateur dans le contexte
          
          // Stocker les informations de l'utilisateur dans le localStorage
          localStorage.setItem('user', JSON.stringify(data));
          
          router.push('/home');
        } else {
          setErrorMessage('Failed to fetch user data');
        }
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setErrorMessage('Failed to fetch user data');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg border border-accent px-6 pb-4 pt-8">
        <h1 className={`${inter.className} mb-3 text-2xl text-center`}>
          Connexion
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="input input-bordered w-full"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="input input-bordered w-full"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <LoginButton />
        <div className="flex gap-2 mt-4 w-full justify-center">
          <p> Je n&apos;ai pas de compte</p>
          <button
            type="button"
            className="text-primary"
            onClick={() => router.push('/register')}
          >
            S&apos;inscrire
          </button>
        </div>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending}>
      Se connecter
    </Button>
  );
}
