import { StyleSheet } from 'react-native'
import { getResponsiveFontSize } from '../../../lib/dimensions'
import { colors } from '../../../lib/styles'

const WIDTH = getResponsiveFontSize(20)

const styles = StyleSheet.create({
  containerCast: (index) => {
    return {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: index === 0 ? 0 : 10
    }
  },
  titleCast: {
    marginTop: 10,
    color: colors.blue,
    textAlign: 'center'
  },
  titleCharacter: {
    fontWeight: 'bold'
  },
  castPhoto: {
    borderRadius: WIDTH / 2,
    marginTop: 5
  }
})

export default styles
