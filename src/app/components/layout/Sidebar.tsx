'use client';

import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import { toggleDarkMode, setCategories, setContentFilter } from '../../../store/slices/preferencesSlice';
import { incrementReadCount } from '../../../store/slices/preferencesSlice';

const CATEGORIES = ['technology', 'sports', 'finance', 'health', 'science', 'entertainment'];

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { categories, darkMode, contentFilter, readCount } = useAppSelector(state => state.preferences);

  const toggleCategory = (cat: string) => {
    if (categories.includes(cat)) {
      dispatch(setCategories(categories.filter(c => c !== cat)));
    } else {
      dispatch(setCategories([...categories, cat]));
    }
  };

const totalReads = Object.values(readCount).reduce((a, b) => a + b, 0);
const dnaCategories = ['news', 'movies', 'social'];

  return (
    <aside
      className="w-64 h-screen fixed left-0 top-0 border-r p-6 flex flex-col gap-6"
      style={{ background: 'var(--sidebar-bg)', borderColor: 'var(--border)' }}
    >
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>→ Dashboard</h1>
      </div>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--foreground)', opacity: 0.5 }}>Categories</h2>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all"
              style={
                categories.includes(cat)
                  ? { background: 'var(--primary)', color: '#fff' }
                  : { color: 'var(--foreground)', opacity: 0.7 }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--foreground)', opacity: 0.5 }}>Content Type</h2>
        <div className="flex flex-col gap-2">
        {(['all', 'news', 'movies', 'social'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => dispatch(setContentFilter(filter))}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all"
              style={
                contentFilter === filter
                  ? { background: 'var(--primary)', color: '#fff' }
                  : { color: 'var(--foreground)', opacity: 0.7 }
              }
            >
              {filter === 'all' ? '🗂 All' : filter === 'news' ? '📰 News' : filter === 'movies' ? '🎬 Movies' : '💬 Social'}
            </button>
          ))}
        </div>
      </div>
      <div>
  <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" 
    style={{ color: 'var(--foreground)', opacity: 0.5 }}>
    🧬 Reading DNA
  </h2>
  {totalReads === 0 ? (
    <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.4 }}>
      Click cards to build your DNA!
    </p>
  ) : (
    <div className="flex flex-col gap-2">
      {dnaCategories.map(cat => {
        const count = readCount[cat] || 0;
        const percent = totalReads > 0 ? Math.round((count / totalReads) * 100) : 0;
        return (
          <div key={cat}>
            <div className="flex justify-between mb-1">
              <span className="text-xs capitalize font-medium" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                {cat === 'news' ? '📰 News' : cat === 'movies' ? '🎬 Movies' : '💬 Social'}
              </span>
              <span className="text-xs font-bold" style={{ color: 'var(--primary)' }}>
                {percent}%
              </span>
            </div>
            <div className="w-full rounded-full h-1.5" style={{ background: 'var(--border)' }}>
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${percent}%`, background: 'var(--primary)' }}
              />
            </div>
          </div>
        );
      })}
      <p className="text-xs mt-1" style={{ color: 'var(--foreground)', opacity: 0.4 }}>
        {totalReads} total interactions
      </p>
    </div>
  )}
</div>
      <div className="mt-auto">
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="w-full px-3 py-2 rounded-lg text-sm font-medium transition-all"
          style={{ background: 'var(--border)', color: 'var(--foreground)' }}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </aside>
  );
}