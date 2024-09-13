import React from 'react'
import { FlatList } from 'react-native'

const CastList = ({ data, renderItem }) => (
  <FlatList
    horizontal
    data={data}
    removeClippedSubviews
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => renderItem(item)}
  />
)

export { CastList }
