import { configureStore, combineReducers } from '@reduxjs/toolkit';

import serverReducer from '../src/Slice/serverSlice';
import recordsReducer from '../src/Slice/recordsSlice';
import raveReducer from '../src/Slice/raveSlice';

const rootReducer = combineReducers({
  server: serverReducer,
  records: recordsReducer,
  rave: raveReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
