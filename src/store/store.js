import { configureStore } from '@reduxjs/toolkit'
import formsReducer from './slices/forms'
import selectionReducer from './slices/selection'

export default configureStore({
  reducer: {
    forms: formsReducer,
    selection: selectionReducer
  }
})