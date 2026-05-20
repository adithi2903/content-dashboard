import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  type: 'news' | 'movie' | 'social';
  category: string;
}

interface ContentState {
  items: ContentItem[];
  trending: ContentItem[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: ContentState = {
  items: [],
  trending: [],
  loading: false,
  error: null,
  searchQuery: '',
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
    },
    setTrending: (state, action: PayloadAction<ContentItem[]>) => {
      state.trending = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    reorderItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setItems, setTrending, setLoading, setError, setSearchQuery, reorderItems } = contentSlice.actions;
export default contentSlice.reducer;