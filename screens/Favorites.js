import { useLayoutEffect, useState, useEffect } from 'react'
import { View } from 'react-native'
import { containerStyles } from '../lib/styles'
import { MovieList, MovieItem, EmptyState } from '../components'
import { useSelector } from 'react-redux'

export default function Favorites({ navigation }) {
  const { favorites } = useSelector((state) => state.favorites)

  const [view] = useState({ numColumns: 2, keyGrid: 1 })

  useEffect(() => {}, [favorites])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Favorites'
    })
  }, [navigation])

  const renderItem = (item, type, isSearch, numColumns, navigate) => {
    return (
      <MovieItem
        item={item}
        type={type}
        isSearch={isSearch}
        numColumns={numColumns}
        navigate={navigate}
      />
    )
  }

  const renderEmptyComponent = () => {
    return (
      <EmptyState
        image={require('../assets/empty-favorites.jpg')}
        title="You haven't liked any movie yet"
        message="Why not try to find a movie you like?"
        actionLabel="Go to Discover"
        onAction={() => navigation.navigate('Discover')}
      />
    )
  }

  const { navigate } = navigation
  const { numColumns, keyGrid } = view

  return (
    <View style={containerStyles}>
      <MovieList
        data={favorites}
        type="grid"
        isSearch={false}
        keyGrid={keyGrid}
        numColumns={numColumns}
        ListEmptyComponent={renderEmptyComponent}
        navigate={navigate}
        renderItem={renderItem}
      />
    </View>
  )
}
