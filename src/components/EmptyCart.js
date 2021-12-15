import React from 'react';
import { View, Text, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Components
import Icon from './Icon';

// Links
import i18n from '../utils/i18n';
import { FontFamily } from '../constants/font';

const sadEmojiIconImage = require('../assets/sad_emoji.png')

// Styles
const styles = EStyleSheet.create({
  root: {
    width: '100%',
  },
  titleTextWrapper: {
    marginLeft: 8,
    marginTop: 10
  },
  titleText: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: FontFamily.SFPRODISPLAY_BOLD
  },
  emptyListContainer: {
    marginTop: 70,
    flexDirection: 'column',
    alignItems: 'center',
    height: 240,
    width: 240,
    backgroundColor: '#F1F1F4',
    borderRadius: 240,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  emptyListIconWrapper: {
    width: 64,
    height: 64,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListIconImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  emptyListHeader: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FontFamily.SFPRODISPLAY_BOLD,
    color: '#10083F',
    marginTop: '1rem',
    textAlign: 'center',
    maxWidth: '80%',
    height: 22*2
  },
});

/**
 * Renders if cart is empty.
 *
 * @return {JSX.Element}
 */
const EmptyCart = () => (
  <View style={styles.root}>
    <View style={styles.titleTextWrapper}>
      <Text style={styles.titleText}>Моя корзина</Text>
    </View>
    <View style={styles.emptyListContainer}>
      <View style={styles.emptyListIconWrapper}>
        <Image source={sadEmojiIconImage} style={styles.emptyListIconImage} />
      </View>
      <Text style={styles.emptyListHeader}>
        {i18n.t('Your shopping cart is empty.')}
      </Text>
    </View>
  </View>
);

export default EmptyCart;
