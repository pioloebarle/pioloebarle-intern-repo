import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/CounterSlice.jsx'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
