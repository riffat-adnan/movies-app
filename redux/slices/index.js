import { combineReducers } from '@reduxjs/toolkit'
import favoritesSlice from './favoritesSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import persistReducer from 'redux-persist/es/persistReducer'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['favorites']
}

const rootReducer = combineReducers({
  favorites: persistReducer(persistConfig, favoritesSlice)
})

export default rootReducer
