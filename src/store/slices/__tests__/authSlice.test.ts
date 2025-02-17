import authReducer, {
  setSession,
  setLoading,
  setError,
  clearSession,
} from '../authSlice';

describe('auth slice', () => {
  const initialState = {
    session: null,
    isLoading: true,
    error: null,
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setSession', () => {
    const mockSession = {
      access_token: 'test-token',
      refresh_token: 'test-refresh',
      user: { id: '123', email: 'test@example.com' },
    } as any;

    const actual = authReducer(initialState, setSession(mockSession));
    expect(actual.session).toEqual(mockSession);
    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBeNull();
  });

  it('should handle setLoading', () => {
    const actual = authReducer(initialState, setLoading(false));
    expect(actual.isLoading).toBe(false);
  });

  it('should handle setError', () => {
    const errorMessage = 'Test error';
    const actual = authReducer(initialState, setError(errorMessage));
    expect(actual.error).toBe(errorMessage);
    expect(actual.isLoading).toBe(false);
  });

  it('should handle clearSession', () => {
    const stateWithSession = {
      session: { user: { id: '123' } } as any,
      isLoading: false,
      error: 'Previous error',
    };

    const actual = authReducer(stateWithSession, clearSession());
    expect(actual).toEqual({
      session: null,
      isLoading: false,
      error: null,
    });
  });
}); 