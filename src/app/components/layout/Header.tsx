'use client';

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/useAppDispatch';
import { setSearchQuery } from '../../../store/slices/contentSlice';
import { logout } from '../../../store/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector(state => state.auth);
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(input));
    }, 500);
    return () => clearTimeout(timer);
  }, [input, dispatch]);

  return (
    <header
      className="fixed top-0 left-64 right-0 h-16 flex items-center px-6 gap-4 z-10 border-b"
      style={{ background: 'var(--sidebar-bg)', borderColor: 'var(--border)' }}
    >
      <input
        type="text"
        placeholder="Search news, movies..."
        value={input}
        onChange={e => setInput(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg text-sm outline-none"
        style={{ background: 'var(--border)', color: 'var(--foreground)' }}
      />
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => { dispatch(logout()); router.push('/login'); }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
          style={{ background: 'var(--primary)' }}
        >
          {user?.name?.[0]?.toUpperCase() || 'A'}
        </div>
        <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
          {user?.name || 'Guest'}
        </span>
      </div>
    </header>
  );
}