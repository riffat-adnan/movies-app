import React from 'react'
import { render } from '@testing-library/react-native'
import { MovieItem } from '../ListItems/MovieItem/MovieItem'

const props = {
  item: {
    poster_path: '',
    original_language: 'ak',
    vote_average: 10,
    genre_ids: '',
    type: '',
    isSearch: false,
    title: 'Title'
  },
  numColumns: 1
}

test('should verify if has only one Image in list mode', () => {
  const { getAllByRole, getByText } = render(<MovieItem {...props} />)

  expect(getAllByRole('imagebutton')).toBeTruthy()
  expect(getByText('Title')).toBeTruthy()
  expect(getByText('10')).toBeTruthy()
  expect(getByText('Kate Winstlet')).toBeTruthy()
})

test('should verify if has only one Image in columns mode', () => {
  const { getAllByRole, queryByText } = render(
    <MovieItem {...props} numColumns={2} />
  )

  expect(getAllByRole('imagebutton')).toBeTruthy()
  expect(queryByText('Title')).toBeTruthy()
  expect(queryByText('10')).not.toBeTruthy()
  expect(queryByText('Kate Winstlet')).not.toBeTruthy()
})
