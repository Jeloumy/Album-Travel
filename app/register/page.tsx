"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [name_user, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Sending registration data:', { name_user, email, password });

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name_user, email, password }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const errorData = await res.json();
      console.error('Failed to create account:', errorData);
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name_user">name_user</label>
          <input
            type="text"
            id="name_user"
            value={name_user}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default RegisterPage;
