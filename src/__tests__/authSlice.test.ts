import authReducer, { login, logout } from '../store/slices/authSlice';

describe('authSlice', () => {
  const initialState = {
    isLoggedIn: false,
    user: null,
  };

  it('should login user', () => {
    const state = authReducer(initialState, login({ name: 'Adithi', email: 'adithi@test.com' }));
    expect(state.isLoggedIn).toBe(true);
    expect(state.user?.name).toBe('Adithi');
  });

  it('should logout user', () => {
    const loggedInState = { isLoggedIn: true, user: { name: 'Adithi', email: 'adithi@test.com' } };
    const state = authReducer(loggedInState, logout());
    expect(state.isLoggedIn).toBe(false);
    expect(state.user).toBeNull();
  });
});