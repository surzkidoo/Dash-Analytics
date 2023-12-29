import { configureStore } from '@reduxjs/toolkit';
import Authslice from './features/Authslice';

export const store = configureStore({
  reducer: {
    auth: Authslice,
  },
});
