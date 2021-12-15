import Icons from 'react-native-vector-icons/MaterialIcons';
import theme from '../config/theme';

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

const preloadIcons = {
  home: [30, theme.$navBarButtonColor],
  favorite: [30, theme.$navBarButtonColor],
  person: [30, theme.$navBarButtonColor],
  'shopping-cart': [30, theme.$navBarButtonColor],
  menu: [30, theme.$navBarButtonColor],
  search: [30, theme.$navBarButtonColor],
  share: [30, theme.$navBarButtonColor],
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
    Object.keys(preloadIcons).map((iconName) =>
      Icons.getImageSource(
        iconName,
        preloadIcons[iconName][0],
        preloadIcons[iconName][1],
      ),
    ),
  );

  Object.keys(preloadIcons).forEach((iconName, idx) => {
    iconsMap[iconName] = icons[idx];
  });

  iconsMap.home = home
  iconsMap.favorite = heart
  iconsMap.catalog = catalog
  iconsMap.person = profile
  iconsMap['shopping-cart'] = buy

  iconsMap.homeSelected = homeSelected
  iconsMap.favoriteSelected = heartSelected
  iconsMap.catalogSelected = catalogSelected
  iconsMap.personSelected = profileSelected
  iconsMap['shopping-cartSelected'] = buySelected

  return iconsMap;
}

export { iconsMap, prepareIcons };
