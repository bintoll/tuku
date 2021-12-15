import {Platform, ScaledSize, Dimensions, StatusBar} from 'react-native'

import {getStatusBarHeight} from 'react-native-iphone-x-helper'


const window = Dimensions.get('window')
const FIGMA_LAYOUT_MOBILE = 375

export const windowWidth = window.width
export const windowHeight = window.height

export const statusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight || 0

export const windowRatio = windowWidth / windowHeight

const windowRatioTooHeightBreakepoint = 0.52

export const caseWindowRatioIsTooHeightBreakepoint = (
  lowerWindowRatioValueCase,
  heigherWindowRatioValueCase,
) =>
  windowRatio < windowRatioTooHeightBreakepoint ? lowerWindowRatioValueCase : heigherWindowRatioValueCase

export const calcPercentage = (percent, total) => (percent / 100) * total

// Calculate dimensions in percentage relative to width of the screen, like vw in css
export const w = (percent) => calcPercentage(percent, window.width)

// Calculate dimensions in percentage relative to height of the screen, like vh in css
export const h = (percent) =>
  calcPercentage(percent, window.height - statusBarHeight)

// enabled means pick really flexible dimentions, otherwie pick just exact numbers
export const getRelativeWidth = (size) =>
  (size * window.width) / FIGMA_LAYOUT_MOBILE

const smallScreenHeightBreakepoint = 700

export const screenHeightIsLowerThanBreakepoint = windowHeight < smallScreenHeightBreakepoint

export const caseSmallScreenHeightBreakepoint = (
  biggerValueCase,
  lowerValueCase,
) => (windowHeight < smallScreenHeightBreakepoint ? lowerValueCase : biggerValueCase)
