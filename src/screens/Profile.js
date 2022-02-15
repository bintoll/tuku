import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import i18n from '../utils/i18n';
import theme from '../config/theme';
import config from '../config';
import * as nav from '../services/navigation';
import { registerDrawerDeepLinks } from '../utils/deepLinks';
import Icon from '../components/Icon';
import { USER_TYPE_VENDOR } from '../constants/index';

// Actions
import * as pagesActions from '../actions/pagesActions';
import * as authActions from '../actions/authActions';
import * as settingsActions from '../actions/settingsActions';
import {setStartSettings} from '../actions/appActions';
import { FontFamily } from '../constants/font';

const profileIconImage = require('../assets/profile.png')
const arrowRight = require('../assets/arrow-right.png')
const logoImage = require('../assets/logo.png')

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: '$grayColor',
    paddingTop: 10
  },
  containerContentContainerStyle: {
    paddingBottom: 50
  },
  logo: {
    resizeMode: 'contain',
    width: '100%',
    height: 130,
  },
  signInSectionContainer: {
    backgroundColor: '$grayColor',
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signInSectionContainerSettings: {
    marginTop: 30
  },
  signInSectionContainerHelp: {
    marginTop: 24
  },
  signInSectionText: {
    color: '#10083F',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 26,
    fontFamily: FontFamily.SFPRODISPLAY_BOLD
  },
  signInBtnContainer: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 6
  },
  signInButtons: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  signInBtnText: {
    color: '$menuTextColor',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FontFamily.SFPRODISPLAY_BOLD
  },
  btn: {
    borderRadius: '$borderRadius',
    height: 38,
    marginBottom: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '$menuTextColor',
    fontSize: 16,
    fontFamily: FontFamily.SFPRODISPLAY_BOLD
  },
  signInInfo: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 30,
  },
  signOut: {
    paddingBottom: 30,
  },
  userNameText: {
    color: '$menuTextColor',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  userMailText: {
    color: '$menuTextColor',
    fontSize: '1rem',
  },
  IconNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    fontSize: '1.2rem',
    color: '$menuIconsColor',
    marginRight: 5,
  },
  rightArrowIcon: {
    fontSize: '1rem',
    color: '$menuIconsColor',
  },
  hintText: {
    fontSize: '0.8rem',
    color: '$menuIconsColor',
  },
  authorizedBlock: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12
  },
  authorizedBlockLeftSide: {
    width: 62,
    height: 62,
    backgroundColor: '#F1F1F4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 62
  },
  authorizedAvatarImageWrapper: {
    height: 25,
    width: 20
  },
  authorizedAvatarImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  authorizedBloackRightSide: {
    flex: 1,
    marginLeft: 16
  },
  authorizedBlockTitle: {
    fontFamily: FontFamily.SFPRODISPLAY_BOLD,
    fontSize: 16,
    lineHeight: 22
  },
  authorizedBlockBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  },
  authorizedBlockBtnSecond: {
    marginLeft: 10
  },
  authorizedBlockEmailTextWrapper: {
    marginTop: 6
  },
  authorizedBlockEmailText: {
    fontSize: 16,
    fontFamily: FontFamily.SFPRODISPLAY_REGULAR,
    lineHeight: 22,
    color: '#10083F'
  },
  arrowRightIconImageWrapper: {
    height: 24,
    width: 24
  },
  arrowRightIconImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  logoWrapper: {
    width: 166,
    height: 29,
    marginTop: 50,
    alignSelf: 'center'
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
});

/**
 * Renders profile screen.
 *
 * @reactProps {object} authActions - Auth actions.
 */
export class ProfileEdit extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    authActions: PropTypes.shape({
      registration: PropTypes.func,
    }),
  };

  /**
   * Gets data for Pages block.
   */
  componentDidMount() {
    const { pagesActions, settings } = this.props;
    pagesActions.fetch(config.layoutId);
    if (!settings.languageCurrencyFeatureFlag) {
      setStartSettings(settings.selectedLanguage, settings.selectedCurrency);
    }
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        visible: false
      },
    });
  }

  /**
   * Renders Seller block if the user is vendor.
   *
   * @return {JSX.Element}
   */
  renderVendorFields() {
    return (
      <>
        <View style={styles.signInSectionContainer}>
          <Text style={styles.signInSectionText}>
            {i18n.t('Seller')}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => nav.pushVendorManageOrders(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="archive" style={styles.menuItemIcon} />
            <Text style={styles.signInBtnText}>{i18n.t('Vendor Orders')}</Text>
          </View>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => nav.pushVendorManageProducts(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="pages" style={styles.menuItemIcon} />
            <Text style={styles.signInBtnText}>
              {i18n.t('Vendor products')}
            </Text>
          </View>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => nav.showVendorManageCategoriesPicker({ parent: 0 })}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="add-circle" style={styles.menuItemIcon} />
            <Text style={styles.signInBtnText}>{i18n.t('Add product')}</Text>
          </View>
          <Icon name="chevron-right" style={styles.rightArrowIcon} />
        </TouchableOpacity>
      </>
    );
  }

  /**
   * Renders Settings block.
   *
   * @return {JSX.Element}
   */
  renderSettings(settings) {
    return (
      <>
        <View style={[styles.signInSectionContainer, styles.signInSectionContainerSettings]}>
          <Text style={styles.signInSectionText}>
            {i18n.t('Settings')}
          </Text>
        </View>

        {/* <TouchableOpacity
          onPress={() => nav.pushLanguageSelection(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <Text style={styles.signInBtnText}>{i18n.t('Language')}</Text>
          <View style={styles.IconNameWrapper}>
            <Text style={styles.hintText}>
              {settings.selectedLanguage.langCode.toUpperCase()}
            </Text>
            <Icon name="chevron-right" style={styles.rightArrowIcon} />
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => nav.pushCurrencySelection(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <Text style={styles.signInBtnText}>{i18n.t('Currency')}</Text>
          <View style={styles.IconNameWrapper}>
            <Text style={styles.hintText}>
              {settings.selectedCurrency.symbol.toUpperCase()}
            </Text>
            <View style={styles.arrowRightIconImageWrapper}>
              <Image source={arrowRight} style={styles.arrowRightIconImage} />
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }

  /**
   * Renders pages.
   *
   * @param {object} pages - Pages information.
   *
   * @return {JSX.Element}
   */
  renderPages = (pages) => {
    return (
      <View>
        <View style={[styles.signInSectionContainer, styles.signInSectionContainerHelp]}>
          <Text style={styles.signInSectionText}>
            Помощь
          </Text>
        </View>
        {pages.items.map((page, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.signInBtnContainer}
              onPress={() =>
                registerDrawerDeepLinks(
                  {
                    link: `dispatch=pages.view&page_id=${page.page_id}`,
                    payload: {
                      title: page.page,
                    },
                  },
                  this.props.componentId,
                )
              }>
              <Text style={styles.signInBtnText}>{page.page}</Text>
              <View style={styles.arrowRightIconImageWrapper}>
                <Image source={arrowRight} style={styles.arrowRightIconImage} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  /**
   * Renders user infotmation.
   *
   * @param {object} cart - Cart data.
   *
   * @return {JSX.Element}
   */
  renderUserInformation = (cart, profile) => {
    const firstName = cart?.user_data?.b_firstname || profile.firstname
    const email = cart?.user_data?.email || profile.email
    if (!firstName || !email) {
      return <View />
    }
    return (
      <View style={styles.authorizedBlock}>
        <View style={styles.authorizedBlockLeftSide}>
          <View style={styles.authorizedAvatarImageWrapper}>
            <Image source={profileIconImage} style={styles.authorizedAvatarImage} />
          </View>
        </View>
        <View style={styles.authorizedBloackRightSide}>
          <Text style={styles.authorizedBlockTitle}>{`Привет, ${cart?.user_data?.b_firstname || profile.firstname}!`}</Text>
          <View style={styles.authorizedBlockEmailTextWrapper}>
            <Text style={styles.authorizedBlockEmailText}>{cart?.user_data?.email || profile.email}</Text>
          </View>
        </View>
      </View>
    );
  };

  /**
   * Renders login form if the user didn`t login.
   *
   * @param {object} auth - Auth information.
   * @param {object} cart - Cart information.
   *
   * @return {JSX.Element}
   */
  renderSignedIn = (auth, cart, profile) => {
    if (!auth.logged) {
      return (
        <View style={styles.authorizedBlock}>
          <View style={styles.authorizedBlockLeftSide}>
            <View style={styles.authorizedAvatarImageWrapper}>
              <Image source={profileIconImage} style={styles.authorizedAvatarImage} />
            </View>
          </View>
          <View style={styles.authorizedBloackRightSide}>
            <Text style={styles.authorizedBlockTitle}>Вы не авторизованы</Text>
            <View style={styles.authorizedBlockBtns}>
              <TouchableOpacity
                onPress={() => nav.showLogin()} >
                <Text style={{ ...styles.btnText, color: '#F97062' }}>
                  {i18n.t('Sign in')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => nav.showRegistration()} style={styles.authorizedBlockBtnSecond}>
                <Text style={styles.btnText}>{i18n.t('Registration')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    } else {
      return this.renderUserInformation(cart, profile)
    }
  };

  /**
   * Renders profile if the user logged in.
   *
   * @param {object} authActions - Auth actions.
   *
   * @return {JSX.Element}
   */
  renderSignedInMenu = (authActions) => {
    return (
      <>
        <View style={styles.signInSectionContainer}>
          <Text style={styles.signInSectionText}>
            {i18n.t('Buyer').toUpperCase()}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => nav.pushProfileEdit(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="person" style={styles.menuItemIcon} />
            <Text style={styles.signInBtnText}>{i18n.t('Profile')}</Text>
          </View>
          <View style={styles.arrowRightIconImageWrapper}>
            <Image source={arrowRight} style={styles.arrowRightIconImage} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => nav.pushOrders(this.props.componentId)}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="receipt" style={styles.menuItemIcon} />
            <Text style={styles.signInBtnText}>{i18n.t('Orders')}</Text>
          </View>
          <View style={styles.arrowRightIconImageWrapper}>
            <Image source={arrowRight} style={styles.arrowRightIconImage} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => authActions.logout()}
          style={styles.signInBtnContainer}>
          <View style={styles.IconNameWrapper}>
            <Icon name="exit-to-app" style={styles.menuItemIcon} />
            <Text style={styles.signInBtnText}>{i18n.t('Logout')}</Text>
          </View>
          <View style={styles.arrowRightIconImageWrapper}>
            <Image source={arrowRight} style={styles.arrowRightIconImage} />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { profile, pages, auth, cart, authActions, settings } = this.props;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.containerContentContainerStyle}>
        {this.renderSignedIn(auth, cart, profile)}

        {settings.languageCurrencyFeatureFlag && this.renderSettings(settings)}

        {auth.logged && this.renderSignedInMenu(authActions)}

        {profile.user_type === USER_TYPE_VENDOR && this.renderVendorFields()}

        {this.renderPages(pages)}
        <View style={styles.logoWrapper}>
          <Image source={logoImage} style={styles.logoImage} />
        </View>
      </ScrollView>
    );
  }
}

export default connect(
  (state) => ({
    auth: state.auth,
    pages: state.pages,
    cart: state.cart,
    profile: state.profile,
    settings: state.settings,
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
    pagesActions: bindActionCreators(pagesActions, dispatch),
    settingsActions: bindActionCreators(settingsActions, dispatch),
  }),
)(ProfileEdit);
