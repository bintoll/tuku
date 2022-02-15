import Icons from 'react-native-vector-icons/MaterialIcons';
import theme from '../config/theme';
import {Image, Dimensions, Platform} from 'react-native'
import RNFS from 'react-native-fs'

const home = require('../assets/tabBar_home.png')
const homeSelected = require('../assets/tabBar_home_selected.png')
const catalog = require('../assets/tabBar_catalog.png')
const catalogSelected = require('../assets/tabBar_catalog_selected.png')
const buy = require('../assets/tabBar_buy.png')
const buySelected = require('../assets/tabBar_buy_selected.png')
const heart = require('../assets/tabBar_heart.png')
const heartSelected = require('../assets/tabBar_heart_selected.png')
const profile = require('../assets/tabBar_profile.png')
const profileSelected = require('../assets/tabBar_profile_selected.png')
const share = require('../assets/share.png')
const heartAdd = require('../assets/heartAdd.png')

const preloadIcons = {
  home: [30, theme.$navBarButtonColor, home],
  favorite: [30, theme.$navBarButtonColor, heart],
  favoriteBig: [30, theme.$navBarButtonColor, heart, true],
  person: [30, theme.$navBarButtonColor, profile],
  'shopping-cart': [30, theme.$navBarButtonColor, buy],
  catalog: [30, theme.$navBarButtonColor, catalog],
  homeSelected: [30, theme.$navBarButtonColor, homeSelected],
  favoriteSelected: [30, theme.$navBarButtonColor, heartSelected],
  personSelected: [30, theme.$navBarButtonColor, profileSelected],
  'shopping-cartSelected': [30, theme.$navBarButtonColor, buySelected],
  catalogSelected: [30, theme.$navBarButtonColor, catalogSelected],
  menu: [30, theme.$navBarButtonColor],
  search: [30, theme.$navBarButtonColor],
  share: [30, theme.$navBarButtonColor, share, true],
  heartAdd: [30, theme.$navBarButtonColor, heartAdd, true],
  close: [30, theme.$navBarButtonColor],
  delete: [30, theme.$navBarButtonColor],
  create: [30, theme.$navBarButtonColor],
  'more-horiz': [30, theme.$navBarButtonColor],
  add: [30, theme.$navBarButtonColor],
  'keyboard-arrow-right': [40, theme.$navBarButtonColor],
};

const iconsMap = {};

async function prepareIcons() {
  const icons = await Promise.all(
    Object.keys(preloadIcons).map((iconName) => {
      if (preloadIcons[iconName][2] !== undefined) {
        const sourceUri = Image.resolveAssetSource(preloadIcons[iconName][2]).uri
        const scaleAdjust = preloadIcons[iconName][3] ? 0.5 : 1.5
        if (Platform.OS === 'android') {
          return { uri: sourceUri, scale: Dimensions.get('window').scale + scaleAdjust }
        } else {
          const path = `${RNFS.CachesDirectoryPath}/${iconName}.png`
          return RNFS.downloadFile({
            fromUrl: sourceUri,
            toFile: path
          }).promise.then(() => {
            return { uri: path, scale: Dimensions.get('window').scale + scaleAdjust }
          })
          .catch((error) => {
            console.log(error)
          })
        }
      } else {
        return Icons.getImageSource(
          iconName,
          preloadIcons[iconName][0],
          preloadIcons[iconName][1],
        )
      }
    }
    ),
  );

  Object.keys(preloadIcons).forEach((iconName, idx) => {
    iconsMap[iconName] = icons[idx];
  });

  return iconsMap;
}

export { iconsMap, prepareIcons };
