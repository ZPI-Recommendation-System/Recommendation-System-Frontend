import { configureStore } from '@reduxjs/toolkit'
import formsReducer from './slices/forms'
import selectionReducer from './slices/selection'
import favouritesReducer from './slices/favourites'
import historyReducer from './slices/history'

export default configureStore({
  reducer: {
    forms: formsReducer,
    selection: selectionReducer,
    favourites: favouritesReducer,
    history: historyReducer
  }
})