"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import zxcvbn, { ZXCVBNScore } from 'zxcvbn';

const validatePassword = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isValidLength = password.length >= 8;

  return {
    isValid: hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength,
    errors: {
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
      isValidLength,
    },
  };
};

const RegisterPage = () => {
  const [username, setNom] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<ZXCVBNScore | null>(null);
  const [passwordError, setPasswordError] = useState<string>('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { isValid, errors } = validatePassword(password);
    if (passwordStrength && passwordStrength.score < 3) {
      setPasswordError('Password is too weak. Please choose a stronger password.');
      return;
    }
    if (!isValid) {
      let errorMessage = 'Password must contain at least:';
      if (!errors.isValidLength) errorMessage += '\n- 8 characters';
      if (!errors.hasUpperCase) errorMessage += '\n- An uppercase letter';
      if (!errors.hasLowerCase) errorMessage += '\n- A lowercase letter';
      if (!errors.hasNumber) errorMessage += '\n- A number';
      if (!errors.hasSpecialChar) errorMessage += '\n- A special character';
      setPasswordError(errorMessage);
      return;
    }


    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const errorData = await res.json();
      console.error('Failed to create account:', errorData);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    const result: ZXCVBNScore = zxcvbn(password);
    setPasswordStrength(result);
    setPasswordError('');
  };

  const getProgressBarColor = (score: number) => {
    switch (score) {
      case 0:
        return 'bg-red-500';
      case 1:
        return 'bg-orange-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-blue-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 rounded-xl border border-accent">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="form-control">
            <label htmlFor="username" className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setNom(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="input input-bordered w-full"
            />
            {passwordStrength && (
              <div className="mt-2">
                <div className="relative w-full h-2 rounded">
                  <div
                    className={`absolute h-full ${getProgressBarColor(passwordStrength.score)} rounded-l-full rounded-r-full transition-width`}
                    style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                  ></div>
                </div>
              </div>
            )}
            {passwordError && <p className="text-red-500 mt-2 whitespace-pre-line">{passwordError}</p>}
          </div>
          <div className="flex justify-center">
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </div>
          <div className="flex gap-2 mt-4 w-full justify-center">
            <p> J&apos;ai déjà un compte</p>
            <button
              type="button"
              className="text-primary"
              onClick={() => router.push('/login')}
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
