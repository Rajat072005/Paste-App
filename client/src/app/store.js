import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from '../features/counter/pasteslice'

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
})