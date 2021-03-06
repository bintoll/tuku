import { Dimensions, UIManager } from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import store from './store';
import theme from './config/theme';
import * as nav from './services/navigation';
import * as appActions from './actions/appActions';
import { prepareIcons } from './utils/navIcons';
import registerScreens from './screens';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// Calcuate styles
const { width } = Dimensions.get('window');
EStyleSheet.build({
  $rem: width > 340 ? 18 : 16,
  // $outline: 1,
  ...theme,
});

function Start() {
  registerScreens(store);
  Navigation.events().registerAppLaunchedListener(async () => {
    await appActions.initApp();
    await prepareIcons();
    const state = store.getState();

    if (state.settings.isShopClosed) {
      Navigation.setRoot(nav.setClosedRoot());
      return;
    }

    Navigation.setRoot(nav.setRoot());
  });
}

export default Start;
