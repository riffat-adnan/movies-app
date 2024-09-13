import React from 'react'
import { render, fireEvent,screen } from '@testing-library/react-native'

import { TouchableOpacity } from '../Button/TouchableOpacity'

test('should verify if calls touchableOpacity', () => {
  const onPress = jest.fn()
  const { getAllByRole } = render(<TouchableOpacity onPress={onPress} />)

  fireEvent.press(getAllByRole('button'))

  expect(screen.getAllByRole('button')).toHaveBeenCalledTimes(1)
})

test('should verify button with label', () => {
  const onPress = jest.fn()
  const { getByA11yLabel } = render(
    <TouchableOpacity onPress={onPress} accessibilityLabel="Change button" />
  )

  expect(getByA11yLabel('Change button')).toBeTruthy()
})
