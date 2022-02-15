import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, SafeAreaView, Image, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { format } from 'date-fns';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import { isDate } from 'date-fns';
import * as nav from '../services/navigation';

// Import actions.
import * as authActions from '../actions/authActions';
// Components
import i18n from '../utils/i18n';
import { iconsMap } from '../utils/navIcons';
import Spinner from '../components/Spinner';
import ProfileForm from '../components/ProfileForm';
import { Navigation } from 'react-native-navigation';
import { FontFamily } from '../constants/font';

const logoImage = require('../assets/logo.png')
const topLeftCornerStyleImage = require('../assets/top_left_corner_style.png')
const topRightCornerStyleImage = require('../assets/top_right-corner_style.png')
const bottomLeftCornerStyleImage = require('../assets/bottom_left_corner_style.png')
const bottomCenterStyleImage = require('../assets/bottom_center_style.png')
const bottomRightCornerStyleImage = require('../assets/bottom_right_corner_style.png')

const styles = EStyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    flex: 1,
  },
  containerContentContainerStyle: {
  },
  scrollView: {
  },
  scrollViewContentContainerStyle: {
    paddingHorizontal: 16,
  },
  logoAndTitleWrapper: {
    marginTop: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoWrapper: {
    width: 166,
    height: 29
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  titleTextWrapper: {
    marginTop: 16
  },
  titleText: {
    fontSize: 20,
    fontFamily: FontFamily.SFPRODISPLAY_BOLD,
    color: '#10083F',
    lineHeight: 26
  },
  formWrapper: {
    width: '100%',
    marginTop: 35,
  },
  topLeftCornerStyleImageWrapper: {
    height: 95,
    width: 90,
    position: 'absolute',
    left: -15,
    top: -15
  },
  topLeftCornerStyleImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  topRightCornerStyleImageWrappper: {
    height: 61,
    width: 53,
    position: 'absolute',
    right: -8,
    top: 50
  },
  topRightCornerStyleImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  bottomLeftCornerStyleImageWrapper: {
    height: 51,
    width: 51,
    position: 'absolute',
    left: 8,
    bottom: -8
  },
  bottomLeftCornerStyleImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  bottomCenterStyleImageWrapper: {
    height: 71,
    width: 71,
    position: 'absolute',
    left: '45%',
    bottom: -26
  },
  bottomCenterStyleImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  bottomRightCornerStyleImageWrapper: {
    height: 78,
    width: 66,
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  bottomRightCornerStyleImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  }
});

/**
 * Renders product detail screen.
 *
 * @reactProps {object} authActions - Auth actions.
 * @reactProps {boolean} showClose - Show close buttom or not.
 */
export class Registration extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    authActions: PropTypes.shape({
      registration: PropTypes.func,
    }),
    showClose: PropTypes.bool,
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      forms: [],
    };
    Navigation.events().bindComponent(this);
  }

  /**
   * Gets fields and sets them to state.
   */
  componentDidMount() {
    const { authActions } = this.props;
    authActions.profileFields().then((fields) => {
      this.setState({
        fetching: false,
        forms: fields,
      });
    });

    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: i18n.t('Registration'),
        },
        rightButtons: [
          {
            id: 'close',
            icon: iconsMap.close,
          },
        ],
      },
    });
  }

  /**
   * Registration modal navigation.
   *
   * @param {object} event - Information about the element on which the event occurred.
   */
  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'close') {
      Navigation.dismissModal(this.props.componentId);
    }
  }

  /**
   * Creates new user.
   *
   * @param {object} values - Registration form values.
   */
  handleRegister = async (values) => {
    const { authActions, componentId, settings } = this.props;

    if (values) {
      let data = { ...values };
      Object.keys(data).forEach((key) => {
        if (isDate(data[key])) {
          data[key] = format(data[key], settings.dateFormat);
        }
      });

      // Remove all null and undefined values.
      data = pickBy(data, identity);

      authActions.createProfile(data, componentId);
    }
  };

  onLogin = () => {
    if (this.props.navigationFromLogin) {
      nav.popLogin(this.props.componentId)
    } else {
      nav.pushLogin(this.props.componentId, {navigationFromRegistration: true})
    }
  }

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { fetching, forms } = this.state;
    const { settings } = this.props;

    if (fetching) {
      return (
        <View style={styles.container}>
          <Spinner visible />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.root}>
        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={120} style={styles.container} contentContainerStyle={styles.containerContentContainerStyle}>
          <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView} contentContainerStyle={styles.scrollViewContentContainerStyle}>
            <View style={styles.logoAndTitleWrapper}>
              <View style={styles.logoWrapper}>
                <Image source={logoImage} style={styles.logoImage} />
              </View>
              <View style={styles.titleTextWrapper}>
                <Text style={styles.titleText}>Регистрация</Text>
              </View>
            </View>
            <View style={styles.formWrapper}>
              <ProfileForm
                showTitles={true}
                fields={forms}
                dateFormat={settings.dateFormat}
                onLogin={this.onLogin}
                onSubmit={(values) => this.handleRegister(values)}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.topLeftCornerStyleImageWrapper}>
          <Image source={topLeftCornerStyleImage} style={styles.topLeftCornerStyleImage} />
        </View>
        <View style={styles.topRightCornerStyleImageWrappper}>
          <Image source={topRightCornerStyleImage} style={styles.topRightCornerStyleImage} />
        </View>
        <View style={styles.bottomLeftCornerStyleImageWrapper}>
          <Image source={bottomLeftCornerStyleImage} style={styles.bottomLeftCornerStyleImage} />
        </View>
        <View style={styles.bottomCenterStyleImageWrapper}>
          <Image source={bottomCenterStyleImage} style={styles.bottomCenterStyleImage} />
        </View>
        <View style={styles.bottomRightCornerStyleImageWrapper}>
          <Image source={bottomRightCornerStyleImage} style={styles.bottomRightCornerStyleImage} />
        </View>
      </SafeAreaView>  
    )
  }
}

export default connect(
  (state) => ({
    auth: state.auth,
    settings: state.settings,
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
  }),
)(Registration);
