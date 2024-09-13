import React, { memo } from 'react'
import { View, Text } from 'react-native'
import { Image, TouchableOpacity, RatingComponent } from '../../../components'
import { getResponsiveWidth } from '../../../lib/dimensions'
import { getImageApi } from '../../../lib/images'
import { convertTypeWithGenre } from '../../../lib/genre'
import { ROUTES } from '../../../lib/routes'
import styles from './styles'

const WIDTH = getResponsiveWidth(30)
const HEIGHT = getResponsiveWidth(40)

const MovieItem = memo(
  ({ itemKey, numColumns, item, type, isSearch, navigate }) => (
    <>
      {numColumns === 1 ? (
        <TouchableOpacity
          key={itemKey}
          onPress={() => {
            console.log('[item]', item)
            navigate(ROUTES.MOVIE_DETAILS, {
              id: item.id,
              title: item.title,
              item: item
            })
          }}
        >
          <View style={styles.containerItem}>
            <Image
              accessibilityRole="imagebutton"
              accessibilityLabel={`${item.title} image`}
              uri={getImageApi(item.poster_path)}
              width={WIDTH}
              height={HEIGHT}
              style={styles.photo}
            />
            <View style={styles.item}>
              <View>
                <Text numberOfLines={1} style={styles.textTitle}>
                  {item.title}
                </Text>
                <View style={[styles.textRow, styles.containerSubTitle]}>
                  <RatingComponent value={Math.round(item.vote_average / 2)} />
                </View>
                <Text numberOfLines={2} style={styles.textSmall}>
                  {convertTypeWithGenre(item.genre_ids, type, isSearch)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          key={itemKey}
          style={styles.containerTwoItem}
          onPress={() =>
            navigate(ROUTES.MOVIE_DETAILS, {
              id: item.id,
              title: item.title,
              item: item
            })
          }
        >
          <View>
            <Image
              accessibilityRole="imagebutton"
              accessibilityLabel={`${item.title} image`}
              uri={getImageApi(item.poster_path)}
              style={styles.photo}
              width={WIDTH + 40}
              height={HEIGHT + 40}
            />
          </View>
          <Text numberOfLines={2} style={styles.textTwoTitle}>
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    </>
  ),
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id
)

export { MovieItem }
