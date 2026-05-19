import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServerState {
  ip: string;
  port: string;
  connected: boolean;
}

const initialState: ServerState = {
  ip: '',
  port: '',
  connected: false,
};

const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    setServerInfo: (state, action: PayloadAction<{ ip: string; port: string }>) => {
      state.ip = action.payload.ip;
      state.port = action.payload.port;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
  },
});

export const { setServerInfo, setConnected } = serverSlice.actions;
export default serverSlice.reducer;
