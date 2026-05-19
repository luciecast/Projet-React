import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RaveState {
  models: string[];
  selectedModel: string | null;
  selectedAudioUri: string | null;
  transformedUri: string | null;
  loading: boolean;
}

const initialState: RaveState = {
  models: [],
  selectedModel: null,
  selectedAudioUri: null,
  transformedUri: null,
  loading: false,
};

const raveSlice = createSlice({
  name: 'rave',
  initialState,
  reducers: {
    setModels: (state, action: PayloadAction<string[]>) => {
      state.models = action.payload;
    },
    setSelectedModel: (state, action: PayloadAction<string | null>) => {
      state.selectedModel = action.payload;
    },
    setSelectedAudioUri: (state, action: PayloadAction<string | null>) => {
      state.selectedAudioUri = action.payload;
    },
    setTransformedUri: (state, action: PayloadAction<string | null>) => {
      state.transformedUri = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setModels,
  setSelectedModel,
  setSelectedAudioUri,
  setTransformedUri,
  setLoading,
} = raveSlice.actions;

export default raveSlice.reducer;
