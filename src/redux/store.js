import { configureStore } from '@reduxjs/toolkit'
import userData from './slice/slice'

export const store = configureStore({
  reducer: {
    userData,
  },
})
