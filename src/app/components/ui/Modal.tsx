'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  image,
  url,
  type,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.6)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl overflow-hidden max-w-lg w-full"
          style={{ background: 'var(--card-bg)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-56 object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}

          <div className="p-6 flex flex-col gap-3">
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: 'var(--primary)' }}
            >
              {type}
            </span>

            <h2
              className="text-lg font-bold"
              style={{ color: 'var(--foreground)' }}
            >
              {title}
            </h2>

            <p
              className="text-sm leading-relaxed"
              style={{
                color: 'var(--foreground)',
                opacity: 0.7,
              }}
            >
              {description}
            </p>

            <div className="flex gap-2 mt-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-4 py-2 rounded-full text-sm font-semibold text-white transition-all"
                style={{ background: 'var(--primary)' }}
              >
                {type === 'movie'
                  ? 'View on TMDB'
                  : 'Read Full Article'}
              </a>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: 'var(--border)',
                  color: 'var(--foreground)',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}