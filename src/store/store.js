import formsReducer from './slices/forms'
import selectionReducer from './slices/selection'
import favouritesReducer from './slices/favourites'
import historyReducer from './slices/history'
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
  history: historyReducer
})

const persistConfig = {
  key: 'favourites',
  whitelist: ['favourites'],
  version: 1,
  storage,
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

export const persistor = persistStore(store)