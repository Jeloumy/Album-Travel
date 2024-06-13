'use client';

import { inter } from '../ui/fonts';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      router.push('/home'); // Rediriger vers la page d'accueil après connexion réussie
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
            <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="email">
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
            <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="password">
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
          <p> Je n'ai pas de compte</p>
          <button
            type="button"
            className="text-primary"
            onClick={() => router.push('/register')}
          >
            S'incrire
          </button>
        </div>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
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
