import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/slice'

export const store = configureStore({
  reducer: {
    auth,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
