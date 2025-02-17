import foodReducer, {
  setEntries,
  addEntry,
  updateEntry,
  deleteEntry,
  setLoading,
  setError,
  setSelectedDate,
  clearEntries,
  FoodEntry,
} from '../foodSlice';

describe('food slice', () => {
  const mockEntry: FoodEntry = {
    id: '123',
    name: 'Test Food',
    calories: 100,
    protein: 10,
    carbs: 20,
    fat: 5,
    meal_category: 'lunch',
    entry_date: '2024-02-14',
    entry_time: '12:00',
    ai_generated: false,
  };

  const initialState = {
    entries: [],
    isLoading: false,
    error: null,
    selectedDate: expect.any(String), // Since it's based on current date
  };

  it('should handle initial state', () => {
    expect(foodReducer(undefined, { type: 'unknown' })).toMatchObject({
      entries: [],
      isLoading: false,
      error: null,
    });
  });

  it('should handle setEntries', () => {
    const entries = [mockEntry];
    const actual = foodReducer(initialState, setEntries(entries));
    expect(actual.entries).toEqual(entries);
    expect(actual.isLoading).toBe(false);
    expect(actual.error).toBeNull();
  });

  it('should handle addEntry', () => {
    const actual = foodReducer(initialState, addEntry(mockEntry));
    expect(actual.entries).toHaveLength(1);
    expect(actual.entries[0]).toEqual(mockEntry);
  });

  it('should handle updateEntry', () => {
    const state = {
      ...initialState,
      entries: [mockEntry],
    };

    const updatedEntry = {
      ...mockEntry,
      calories: 200,
    };

    const actual = foodReducer(state, updateEntry(updatedEntry));
    expect(actual.entries[0]).toEqual(updatedEntry);
  });

  it('should handle deleteEntry', () => {
    const state = {
      ...initialState,
      entries: [mockEntry],
    };

    const actual = foodReducer(state, deleteEntry(mockEntry.id));
    expect(actual.entries).toHaveLength(0);
  });

  it('should handle setLoading', () => {
    const actual = foodReducer(initialState, setLoading(true));
    expect(actual.isLoading).toBe(true);
  });

  it('should handle setError', () => {
    const errorMessage = 'Test error';
    const actual = foodReducer(initialState, setError(errorMessage));
    expect(actual.error).toBe(errorMessage);
    expect(actual.isLoading).toBe(false);
  });

  it('should handle setSelectedDate', () => {
    const date = '2024-02-14';
    const actual = foodReducer(initialState, setSelectedDate(date));
    expect(actual.selectedDate).toBe(date);
  });

  it('should handle clearEntries', () => {
    const state = {
      ...initialState,
      entries: [mockEntry],
      error: 'Previous error',
      isLoading: true,
    };

    const actual = foodReducer(state, clearEntries());
    expect(actual.entries).toHaveLength(0);
    expect(actual.error).toBeNull();
    expect(actual.isLoading).toBe(false);
  });
}); 