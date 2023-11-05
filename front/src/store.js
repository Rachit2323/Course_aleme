import { configureStore, } from '@reduxjs/toolkit';
import authReducer from './Reducers/auth';
import courseReducer from './Reducers/course.js';

const store = configureStore({
  reducer: {
    user: authReducer,
    course: courseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
