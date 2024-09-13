import React from 'react'
import { FlatList } from 'react-native'
import { moviesDiscoverStyles } from '../../lib/styles'

const MovieList = ({
  data,
  type,
  isSearch,
  keyGrid,
  numColumns,
  refreshing,
  onRefresh,
  ListFooterComponent,
  ListEmptyComponent,
  navigate,
  renderItem
}) => (
  <FlatList
    data={data}
    key={keyGrid}
    numColumns={numColumns}
    contentContainerStyle={moviesDiscoverStyles.flatListContentContainerStyle}
    removeClippedSubviews
    keyExtractor={(item) => item.id.toString()}
    refreshing={refreshing}
    onRefresh={onRefresh}
    ListFooterComponent={ListFooterComponent}
    ListEmptyComponent={ListEmptyComponent}
    renderItem={({ item, index }) =>
      renderItem(item, type, isSearch, numColumns, navigate, index)
    }
  />
)

export { MovieList }
