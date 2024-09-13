import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { colors } from '../../lib/styles'

const RatingComponent = ({ value }) => {
  const [defaultRating, setDefaultRating] = useState(value)

  useEffect(() => {
    setDefaultRating(value)
  }, [value])

  const maxRatting = [1, 2, 3, 4, 5]

  const filledStar = require('../../assets/filled_stars.png')
  const unFilledStar = require('../../assets/unfilled_stars.png')

  return (
    <View style={styles.starRating}>
      {maxRatting.map((item) => {
        return (
          <View activeOpacity={0.7} key={item}>
            <Image
              style={[styles.ratingIcon, { tintColor: colors.primary }]}
              source={item <= defaultRating ? filledStar : unFilledStar}
            />
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  ratingStyle: {
    paddingVertical: 10,
    color: colors.primary
  },
  ratingIcon: {
    width: 18,
    height: 18,
    marginHorizontal: 3
  },
  starRating: {
    flexDirection: 'row',
    marginVertical: 5
  }
})

export { RatingComponent }
