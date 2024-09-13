import { StyleSheet } from 'react-native'
import { getResponsiveFontSize } from '../../../lib/dimensions'
import { colors } from '../../../lib/styles'

const styles = StyleSheet.create({
  containerItem: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    marginBottom: 20,
    flexDirection: 'row'
  },
  containerTwoItem: {
    paddingTop: 10,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%'
  },
  photo: {
    borderRadius: 15
  },
  item: {
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  },
  textTitle: {
    fontSize: getResponsiveFontSize(2.2),
    color: colors.darkBlue,
    fontWeight: '500'
  },
  textTwoTitle: {
    textAlign: 'left',
    fontSize: getResponsiveFontSize(2),
    color: colors.darkBlue,
    fontWeight: 'bold',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    height: getResponsiveFontSize(8),
    justifyContent: 'flex-start',
    alignSelf: 'flex-start'
  },
  textRow: {
    flexDirection: 'row'
  },
  containerSubTitle: {
    marginTop: 3,
    marginBottom: 3
  },
  containerReview: {
    justifyContent: 'space-between',
    marginRight: 20
  },
  textSmall: {
    fontSize: getResponsiveFontSize(2.1),
    color: colors.neutral
  },
  trace: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: getResponsiveFontSize(2.1),
    color: colors.black
  },
  score: {
    minWidth: '25%',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 100
  },
  low: {
    backgroundColor: colors.lightRed
  },
  mid: {
    backgroundColor: colors.lightYellow
  },
  high: {
    backgroundColor: colors.lightGreen
  },
  textPercent: {
    fontSize: getResponsiveFontSize(2.1),
    fontWeight: '500',
    color: colors.white,
    textAlign: 'center'
  },
  containerModal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  containerError: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingMore: {
    marginTop: 20,
    marginBottom: 30
  }
})

export default styles
