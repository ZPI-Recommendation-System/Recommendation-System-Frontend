import { configureStore } from '@reduxjs/toolkit'
import formsReducer from './slices/forms'

export default configureStore({
  reducer: {
    forms: formsReducer
  }
})