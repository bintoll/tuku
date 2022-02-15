import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView } from 'react-native';
// import * as t from 'tcomb-form-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import tCombFormStylesheet from 'tcomb-form-native/lib/stylesheets/bootstrap'

// Import actions.
import * as authActions from '../actions/authActions';

// Components
import Spinner from '../components/Spinner';
import i18n from '../utils/i18n';
import { iconsMap } from '../utils/navIcons';
import config from '../config';
import * as nav from '../services/navigation';
import { Navigation } from 'react-native-navigation';
import { FontFamily } from '../constants/font';

const logoImage = require('../assets/logo.png')
const lockClosedIconImage = require('../assets/lock_closed.png')
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
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  containerContentContainerStyle: {
    flex: 1,
    width: '100%'
  },
  scrollView: {
    width: '100%'
  },
  scrollViewContentContainerStyle: {
    width: '100%',
    paddingHorizontal: 16,
  },
  logoAndTitleWrapper: {
    marginTop: 130,
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
    marginTop: 63,
  },
  rememberMeAndForgotPasswordBtns: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 20,
  },
  btn: {
    backgroundColor: '#0024FF',
    padding: 12,
    borderRadius: 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  loginBtnLeftSide: {
    flex: 2
  },
  loginBtnCenterSide: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginBtnRightSide: {
    flex: 2
  },
  loginBtnIconImageWrapper: {
    height: 20,
    width: 20,
  },
  loginBtnIconImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  btnText: {
    color: '#fff',
    fontSize: '1rem',
    textAlign: 'center',
    fontFamily: FontFamily.SFPRODISPLAY_REGULAR
  },
  btnRegistration: {
    marginLeft: 4
  },
  btnRegistrationText: {
    color: '#004FD5',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: FontFamily.SFPRODISPLAY_REGULAR
  },
  forgotPasswordText: {
    color: '#263053',
    textAlign: 'center',
    fontFamily: FontFamily.SFPRODISPLAY_BOLD,
    fontSize: 16,
    lineHeight: 22
  },
  registrationTextAndBtnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28
  },
  registrationText: {
    fontSize: 16,
    fontFamily: FontFamily.SFPRODISPLAY_REGULAR,
    lineHeight: 22
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
 * Renders login screen.
 *
 * @reactProps {object} authActions - Auth functions.
 * @reactProps {object} auth - Auth setup.
 */
export class Login extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    authActions: PropTypes.shape({
      login: PropTypes.func,
    }),
    auth: PropTypes.shape({
      logged: PropTypes.bool,
      error: PropTypes.string,
      fetching: PropTypes.bool,
    }),
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  /**
   * Sets title and header icons.
   */
  componentWillMount() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: i18n.t('Login').toUpperCase(),
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
   * Closes login screen if user logged in.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.logged) {
      setTimeout(() => Navigation.dismissModal(this.props.componentId), 1500);
    }
  }

  /**
   * Closes login screen if user pressed close button.
   */
  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'close') {
      Navigation.dismissModal(this.props.componentId);
    }
  }

  /**
   * Activates login function.
   */
  handleLogin() {
    const { authActions } = this.props;
    const value = this.refs.form.getValue();
    if (value) {
      authActions.login(value);
    }
  }

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { auth } = this.props;
    const values = {};
    const t = require('tcomb-form-native');

    if (!t.form) {
      return null;
    }

    const Form = t.form.Form;
    const FormFields = t.struct({
      email: t.String,
      password: t.String,
    });

    if (config.demo) {
      values.email = config.demoUsername;
      values.password = config.demoPassword;
    }

    const baseFieldStyle = {
      height: 'auto',
      paddingVertical: 9,
      fontSize: 16,
      lineHeight: 22,
      fontFamily: FontFamily.SFPRODISPLAY_REGULAR,
      marginBottom: 0,
      paddingHorizontal: 13
    }

    const baseFormGroupStyle = {
      ...tCombFormStylesheet.formGroup,
      normal: {
        ...tCombFormStylesheet.formGroup.normal,
        marginBottom: 0
      }
    }

    const options = {
      disableOrder: true,
      fields: {
        email: {
          keyboardType: 'email-address',
          clearButtonMode: 'while-editing',
          placeholder: 'Ваш e-mail',
          auto: 'placeholders',
          stylesheet: {...tCombFormStylesheet, textbox: {
            ...tCombFormStylesheet.textbox,
            normal: {
              ...tCombFormStylesheet.textbox.normal,
              borderRadius: 0,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              borderBottomColor: 'transparent',
              ...baseFieldStyle
            }
          }, formGroup: baseFormGroupStyle}
        },
        password: {
          secureTextEntry: true,
          clearButtonMode: 'while-editing',
          placeholder: 'Пароль',
          auto: 'placeholders',
          stylesheet: {...tCombFormStylesheet, textbox: {
            ...tCombFormStylesheet.textbox,
            normal: {
              ...tCombFormStylesheet.textbox.normal,
              borderRadius: 0,
              borderBottomLeftRadius: 6,
              borderBottomRightRadius: 6,
              ...baseFieldStyle
            }
          }, formGroup: baseFormGroupStyle}
        },
      },
    };

    return (
      <SafeAreaView style={styles.root}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={140} style={styles.container} contentContainerStyle={styles.containerContentContainerStyle}>
          <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView} contentContainerStyle={styles.scrollViewContentContainerStyle}>
              <View style={styles.logoAndTitleWrapper}>
                <View style={styles.logoWrapper}>
                  <Image source={logoImage} style={styles.logoImage} />
                </View>
                <View style={styles.titleTextWrapper}>
                  <Text style={styles.titleText}>Вход в аккаунт</Text>
                </View>
              </View>
              <View style={styles.formWrapper}>
                <Form ref="form" type={FormFields} options={options} value={values} />
              </View>
              <View style={styles.rememberMeAndForgotPasswordBtns}>
                <View />
                <TouchableOpacity onPress={() => nav.showResetPassword()}>
                  <Text style={styles.forgotPasswordText}>
                    {i18n.t('Forgot your password?')}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.handleLogin()}
                disabled={auth.fetching}>
                <View style={styles.loginBtnLeftSide} >
                  <View style={styles.loginBtnIconImageWrapper}>
                    <Image source={lockClosedIconImage} style={styles.loginBtnIconImage} />
                  </View>
                </View>
                <View style={styles.loginBtnCenterSide}>
                  <Text style={styles.btnText}>{i18n.t('Login')}</Text>
                </View>
                <View style={styles.loginBtnRightSide}/>
              </TouchableOpacity>
              <View style={styles.registrationTextAndBtnWrapper}>
                <Text style={styles.registrationText}>
                  Нету аккаунта?
                </Text>
                <TouchableOpacity
                  style={styles.btnRegistration}
                  onPress={() => {
                    if (this.props.navigationFromRegistration) {
                      nav.popRegistration(this.props.componentId)
                    } else {
                      nav.pushRegistration(this.props.componentId, {navigationFromLogin: true})
                    }
                  }}>
                  <Text style={styles.btnRegistrationText}>
                    {i18n.t('Registration')}
                  </Text>
                </TouchableOpacity>
              </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <Spinner visible={auth.fetching} mode="modal" />
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
    );
  }
}

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
  }),
)(Login);
