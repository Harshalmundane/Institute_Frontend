// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import branchReducer from '../redux/slice/branchSlice'; // Adjust path as needed
import courseReducer from '../redux/slice/courseSlice'; // Adjust path as needed

export const store = configureStore({
  reducer: {
    branches: branchReducer,
    courses: courseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});
