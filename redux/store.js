import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'
import rootReducer from './slices'
import { createLogger } from 'redux-logger'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['favorites'],
  stateReconciler: autoMergeLevel2
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat([createLogger()])
})

const persistor = persistStore(store)
export { store, persistor }
