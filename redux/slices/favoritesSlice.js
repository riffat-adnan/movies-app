import { createSlice, current } from '@reduxjs/toolkit'
import { SETTING_SORTBY_DATA } from '../../lib/constants'

const initialState = {
  favorites: [],
  sortByOptions: SETTING_SORTBY_DATA,
  genreOptions: []
}

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorite: (state, action) => addToFavUtil(state, action),
    removeFromFavorite: (state, action) =>
      removeFromFavoriteUtil(state, action),
    fillGenreData: (state, action) => fillGenreDataUtil(state, action),
    updateSortbyOptions: (state, action) =>
      updateSortbyOptionsUtil(state, action),
    updateGenreOptions: (state, action) => updateGenreOptionsUtil(state, action)
  }
})

//Utility Methods
const checkIfAlreadyPresent = (array, id) => {
  if (typeof array !== []) return
  return array.some((elem) => elem.id === id)
}

const addToFavUtil = (state, action) => {
  const { payload } = action
  const favArray = current(state).favorites
  if (favArray?.length === 0) {
    state.favorites = [...favArray, payload]
    return
  }
  const isPresent = checkIfAlreadyPresent(favArray, payload.id)
  if (isPresent) {
    return
  }
  state.favorites = [...favArray, payload]
}

const removeFromFavoriteUtil = (state, action) => {
  const { payload } = action
  let favoritesArray = current(state).favorites
  if (favoritesArray?.length === 0) return
  state.favorites = favoritesArray.filter((elem) => elem.id !== payload.id)
}

const fillGenreDataUtil = (state, action) => {
  const { payload } = action
  state.genreOptions = [...payload]
}

const updateSortbyOptionsUtil = (state, action) => {
  const { payload } = action
  let sortByOptionsArray = [...current(state).sortByOptions]
  state.sortByOptions = [
    ...sortByOptionsArray.map((elem) => {
      elem = {
        ...elem,
        selected: false
      }
      if (elem.id === payload) {
        return {
          ...elem,
          selected: !elem.selected
        }
      }
      return elem
    })
  ]
}

const updateGenreOptionsUtil = (state, action) => {
  const { payload } = action
  let genreOptionsArray = [...current(state).genreOptions]
  state.genreOptions = genreOptionsArray.map((elem) => {
    if (elem.id === payload) {
      return {
        ...elem,
        selected: !elem.selected
      }
    }
    return elem
  })
}

export const {
  addToFavorite,
  removeFromFavorite,
  updateGenreOptions,
  updateSortbyOptions,
  fillGenreData
} = favoriteSlice.actions

export default favoriteSlice.reducer
