import React, { memo } from 'react'
import { Text, View } from 'react-native'
import { Image } from '../../../components'
import { getImageApi } from '../../../lib/images'
import { getResponsiveWidth } from '../../../lib/dimensions'
import styles from './styles'

const uninformed = 'Uninformed'

const WIDTH = getResponsiveWidth(30)

const CastItem = memo(
  ({ item, index }) => (
    <View
      style={[styles.containerCast(index)]}
    >
      <Image
        accessibilityRole="imagebutton"
        accessibilityLabel={`${item.character || item.job} image`}
        uri={getImageApi(item.profile_path)}
        width={WIDTH}
        height={WIDTH}
        style={styles.castPhoto}
      />
      <Text numberOfLines={1} style={styles.titleCast}>
        {item.name || uninformed}
      </Text>
    </View>
  ),
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id
)

export { CastItem }
