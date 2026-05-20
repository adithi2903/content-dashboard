import reducer, {
    setItems,
    setTrending,
    setLoading,
    setError,
    setSearchQuery,
    reorderItems,
  } from '../store/slices/contentSlice';
  
  const mockItem = (id: string, type: 'news' | 'movie' | 'social') => ({
    id,
    title: `Title ${id}`,
    description: `Desc ${id}`,
    image: '',
    url: '#',
    type,
    category: type,
  });
  
  const initial = {
    items: [],
    trending: [],
    loading: false,
    error: null,
    searchQuery: '',
  };
  
  describe('contentSlice', () => {
    it('sets items', () => {
      const items = [mockItem('1', 'news'), mockItem('2', 'movie')];
      const state = reducer(initial, setItems(items));
      expect(state.items).toHaveLength(2);
    });
  
    it('sets trending', () => {
      const state = reducer(initial, setTrending([mockItem('t1', 'movie')]));
      expect(state.trending[0].id).toBe('t1');
    });
  
    it('sets loading true and false', () => {
      expect(reducer(initial, setLoading(true)).loading).toBe(true);
      expect(reducer(initial, setLoading(false)).loading).toBe(false);
    });
  
    it('sets error message', () => {
      const state = reducer(initial, setError('Failed to load'));
      expect(state.error).toBe('Failed to load');
    });
  
    it('clears error', () => {
      const withError = reducer(initial, setError('oops'));
      const cleared = reducer(withError, setError(null));
      expect(cleared.error).toBeNull();
    });
  
    it('sets search query', () => {
      const state = reducer(initial, setSearchQuery('react'));
      expect(state.searchQuery).toBe('react');
    });
  
    it('reorders items', () => {
      const items = [mockItem('1', 'news'), mockItem('2', 'movie'), mockItem('3', 'social')];
      const withItems = reducer(initial, setItems(items));
      const reordered = [items[2], items[0], items[1]];
      const state = reducer(withItems, reorderItems(reordered));
      expect(state.items[0].id).toBe('3');
    });
  });