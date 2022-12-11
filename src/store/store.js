import formsReducer from './slices/forms'
import selectionReducer from './slices/selection'
import favouritesReducer from './slices/favourites'
import historyReducer from './slices/history'
import dialogReducer from './slices/dialog'
import galleryReducer from './slices/gallery'
// app/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  forms: formsReducer,
  selection: selectionReducer,
  favourites: favouritesReducer,
  
  history: historyReducer,
  dialog: dialogReducer,
  gallery: galleryReducer,
})

const persistConfig = {
  key: 'store',
  version: 1,
  storage,
  blacklist: ['history', 'dialog', 'gallery']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// this is left for puppetteer and debugging 
window.store = store;

export const persistor = persistStore(store, )