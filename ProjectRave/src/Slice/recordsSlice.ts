import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Recording {
  id: string;
  name: string;
  uri: string;
}

interface RecordsState {
  list: Recording[];
}

const initialState: RecordsState = {
  list: [],
};

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    addRecording: (state, action: PayloadAction<Recording>) => {
      state.list.push(action.payload);
    },
    removeRecording: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(r => r.id !== action.payload);
    },
  },
});

export const { addRecording, removeRecording } = recordsSlice.actions;
export default recordsSlice.reducer;
