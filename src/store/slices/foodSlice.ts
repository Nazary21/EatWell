import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  meal_category: string;
  portion_size?: number;
  portion_unit?: string;
  entry_date: string;
  entry_time: string;
  ai_generated: boolean;
  source?: string;
  image_url?: string;
}

interface FoodState {
  entries: FoodEntry[];
  isLoading: boolean;
  error: string | null;
  selectedDate: string;
}

const initialState: FoodState = {
  entries: [],
  isLoading: false,
  error: null,
  selectedDate: new Date().toISOString().split('T')[0],
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setEntries: (state, action: PayloadAction<FoodEntry[]>) => {
      state.entries = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addEntry: (state, action: PayloadAction<FoodEntry>) => {
      state.entries.push(action.payload);
    },
    updateEntry: (state, action: PayloadAction<FoodEntry>) => {
      const index = state.entries.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    deleteEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    clearEntries: (state) => {
      state.entries = [];
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setEntries,
  addEntry,
  updateEntry,
  deleteEntry,
  setLoading,
  setError,
  setSelectedDate,
  clearEntries,
} = foodSlice.actions;

export default foodSlice.reducer; 