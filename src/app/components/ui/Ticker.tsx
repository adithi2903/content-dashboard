'use client';

import { useAppSelector } from '../../../hooks/useAppDispatch';
import { motion } from 'framer-motion';

export default function Ticker() {
  const { trending } = useAppSelector(state => state.content);

  if (!trending.length) return null;

  const items = [...trending, ...trending];

  return (
    <div
      className="w-full overflow-hidden py-2 px-4 flex items-center gap-3 border-b"
      style={{ background: 'var(--sidebar-bg)', borderColor: 'var(--border)' }}
    >
      <span
        className="text-xs font-black uppercase tracking-widest shrink-0"
        style={{ color: 'var(--primary)' }}
      >
        🔥 Trending
      </span>
      <div className="overflow-hidden flex-1">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {items.map((item, i) => (
            <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium shrink-0 hover:underline"
            style={{ color: 'var(--foreground)', opacity: 0.8 }}
            >
              {item.title}
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}