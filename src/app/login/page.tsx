'use client';

import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { login } from '../../store/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!name || !email) {
      setError('Please fill in all fields');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    dispatch(login({ name, email }));
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
      <div className="w-full max-w-md p-8 rounded-2xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>→ Dashboard</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--foreground)', opacity: 0.6 }}>Sign in to your account</p>

        {error && (
          <p className="text-red-500 text-xs mb-4">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--foreground)', opacity: 0.6 }}>Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: 'var(--border)', color: 'var(--foreground)' }}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--foreground)', opacity: 0.6 }}>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: 'var(--border)', color: 'var(--foreground)' }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all mt-2"
            style={{ background: 'var(--primary)' }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}