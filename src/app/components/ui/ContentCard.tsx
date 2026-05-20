'use client';

import { motion } from 'framer-motion';
import React from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import { addFavorite, removeFavorite, incrementReadCount } from '../../../store/slices/preferencesSlice';

interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  type: 'news' | 'movie' | 'social';
  onClick?: () => void;
}

export default function ContentCard({
  id,
  title,
  description,
  image,
  url,
  type,
  onClick,
}: ContentCardProps) {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(
    (state) => state.preferences.favorites
  );

  const isFavorite = favorites.includes(id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
      toast('Removed from favorites', { icon: '🗑️' });
    } else {
      dispatch(addFavorite(id));
      toast.success('Added to favorites!');
    }
  };

  const buttonLabel = type === 'movie' ? 'View' : 'Read More';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl overflow-hidden cursor-pointer"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
      }}
      onClick={() => {
        dispatch(incrementReadCount(type === 'movie' ? 'movies' : type));
        if (onClick) onClick();
      }}
    >
      {image && (
        <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      )}

      <div className="p-4 flex flex-col gap-2">
        <span
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: 'var(--primary)' }}
        >
          {type}
        </span>

        <h3
          className="text-sm font-semibold line-clamp-2"
          style={{ color: 'var(--foreground)' }}
        >
          {title}
        </h3>

        <p
          className="text-xs line-clamp-2"
          style={{
            color: 'var(--foreground)',
            opacity: 0.6,
          }}
        >
          {description}
        </p>

        <div className="flex gap-2 mt-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 text-center px-3 py-1.5 text-xs font-semibold rounded-lg transition-all text-white"
            style={{ background: 'var(--primary)' }}
          >
            {buttonLabel}
          </a>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={
              isFavorite
                ? { background: 'var(--primary)', color: '#fff' }
                : {
                    background: 'var(--border)',
                    color: 'var(--foreground)',
                  }
            }
          >
            {isFavorite ? '★ Saved' : '☆ Save'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}