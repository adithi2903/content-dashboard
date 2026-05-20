import preferencesReducer, {
    setCategories,
    toggleDarkMode,
    addFavorite,
    removeFavorite,
    setContentFilter,
    incrementReadCount,
  } from '../store/slices/preferencesSlice';
  
  describe('preferencesSlice', () => {
    const initialState = {
      categories: ['technology', 'sports', 'finance'],
      darkMode: false,
      favorites: [],
      contentFilter: 'all' as const,
      readCount: {},
    };
  
    it('should set categories', () => {
      const newCats = ['health', 'science'];
      const state = preferencesReducer(initialState, setCategories(newCats));
      expect(state.categories).toEqual(newCats);
    });
  
    it('should toggle dark mode', () => {
      const state = preferencesReducer(initialState, toggleDarkMode());
      expect(state.darkMode).toBe(true);
    });
  
    it('should add favorite', () => {
      const state = preferencesReducer(initialState, addFavorite('news-1'));
      expect(state.favorites).toContain('news-1');
    });
  
    it('should not add duplicate favorite', () => {
      const stateWithFav = { ...initialState, favorites: ['news-1'] };
      const state = preferencesReducer(stateWithFav, addFavorite('news-1'));
      expect(state.favorites.length).toBe(1);
    });
  
    it('should remove favorite', () => {
      const stateWithFav = { ...initialState, favorites: ['news-1'] };
      const state = preferencesReducer(stateWithFav, removeFavorite('news-1'));
      expect(state.favorites).not.toContain('news-1');
    });
  
    it('should set content filter', () => {
      const state = preferencesReducer(initialState, setContentFilter('movies'));
      expect(state.contentFilter).toBe('movies');
    });
    it('should increment read count for a new category', () => {
        const state = preferencesReducer(initialState, incrementReadCount('news'));
        expect(state.readCount['news']).toBe(1);
      });
      
      it('should accumulate read count across multiple clicks', () => {
        let state = preferencesReducer(initialState, incrementReadCount('news'));
        state = preferencesReducer(state, incrementReadCount('news'));
        state = preferencesReducer(state, incrementReadCount('movies'));
        expect(state.readCount['news']).toBe(2);
        expect(state.readCount['movies']).toBe(1);
      });
  });