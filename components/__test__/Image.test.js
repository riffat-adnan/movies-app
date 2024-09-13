import React from 'react'
import { render, screen } from '@testing-library/react-native'

import { Image, notFound } from '../Image/Image'

test('should verify if exist notFound image in path', () => {
  expect(notFound).toBeTruthy()
})

test('should return default values', () => {
  render(<Image />)
  expect(screen.getAllByRole('image')).toBeDefined()
})

test('should verify image with label', () => {
  const { getByLabelText } = render(
    <Image accessibilityLabel="Image with a dog" />
  )

  expect(getByLabelText('Image with a dog')).toBeTruthy()
})
