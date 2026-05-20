import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
  categories: string[];
  darkMode: boolean;
  favorites: string[];
  contentFilter: 'all' | 'news' | 'movies' | 'social';
  readCount: Record<string, number>;
}

const initialState: PreferencesState = {
    categories: ['technology', 'sports', 'finance'],
    darkMode: false,
    favorites: [],
    contentFilter: 'all',
    readCount: {},
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    setContentFilter: (state, action: PayloadAction<'all' | 'news' | 'movies' | 'social'>) => {
      state.contentFilter = action.payload;
    },
    incrementReadCount: (state, action: PayloadAction<string>) => {
        const cat = action.payload;
        state.readCount[cat] = (state.readCount[cat] || 0) + 1;
      },
  },
});

export const { setCategories, toggleDarkMode, addFavorite, removeFavorite, setContentFilter, incrementReadCount } = preferencesSlice.actions;
export default preferencesSlice.reducer;