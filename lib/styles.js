import { StyleSheet } from 'react-native'
import { getResponsiveFontSize } from './dimensions'

export const colors = {
  light: '#f0f0f0',
  neutral: '#757575',
  black: '#000000',
  white: '#ffffff',
  primary: '#0d9488',
  grey: '#e9e9e9',
  darkGrey: '#a1a1a4',
  blue: '#8190a5',
  darkBlue: '#47525e',
  pink: '#f95f62',
  lightRed: '#ff7f7f',
  lightYellow: '#eab079',
  lightGreen: '#82c596'
}

export const fontWeights = {
  normal: '400',
  bold: '700'
}

export const sizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 24
}

export const textStyles = {
  small: {
    fontSize: sizes.sm,
    color: colors.neutral
  },
  paragraph: {
    fontSize: sizes.md,
    color: colors.neutral,
    marginBottom: 5
  },
  h1: {
    fontSize: sizes.xxl,
    fontWeight: fontWeights.bold,
    color: colors.black,
    marginBottom: 8
  },
  h2: {
    fontSize: sizes.xl,
    color: colors.black,
    fontWeight: fontWeights.bold,
    marginBottom: 16
  },
  h3: {
    fontSize: sizes.lg,
    color: colors.black,
    fontWeight: fontWeights.bold,
    marginBottom: 8
  },
  h4: {
    fontSize: sizes.md,
    color: colors.black,
    fontWeight: fontWeights.normal,
    marginBottom: 8
  }
}

export const containerStyles = {
  flex: 1,
  backgroundColor: '#ffffff'
}

export const headerIconStyle = {
  paddingRight: 10
}

export const ratingContainer = { alignSelf: 'center' }

export const moviesDiscoverStyles = StyleSheet.create({
  buttonFilter: {
    paddingRight: 15,
    paddingLeft: 20
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center'
  },
  containerList: {
    justifyContent: 'center',
    flex: 1
  },
  containerMainText: {
    paddingVertical: 25,
    paddingHorizontal: 20
  },
  textMain: {
    fontSize: getResponsiveFontSize(3),
    fontWeight: 'bold',
    color: colors.darkBlue,
    width: '80%'
  },
  buttonGrid: {
    position: 'absolute',
    right: 12,
    top: 18,
    padding: 8,
    borderRadius: 100
  },
  buttonGridActive: {
    borderColor: colors.light
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  loadingMore: {
    paddingTop: 20,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingButton: {
    padding: 10,
    width: '50%',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: colors.light
  },
  loadingText: {
    fontSize: getResponsiveFontSize(2.1),
    color: colors.darkBlue,
    textAlign: 'center'
  },
  flatListContentContainerStyle: {
    flexGrow: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
