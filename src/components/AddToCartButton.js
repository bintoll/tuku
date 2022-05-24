import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import i18n from '../utils/i18n';
import EStyleSheet from 'react-native-extended-stylesheet';

const buyIconImage = require('../assets/buy.png')

const styles = EStyleSheet.create({
  addToCartBtnText: {
    textAlign: 'center',
    color: '$buttonWithBackgroundTextColor',
    fontSize: 16,
    marginLeft: 13
  },
  addToCartBtn: {
    backgroundColor: '$buttonBackgroundColor',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12
  },
  iconWrapper: {
    height: 17,
    width: 17
  },
  iconImage: {
    width: '110%',
    height: '110%',
    resizeMode: 'contain'
  }
});

export const AddToCartButton = ({ onPress, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.addToCartBtn, ...buttonStyle }}
      onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Image source={buyIconImage} style={styles.iconImage} />
      </View>
      <Text style={{ ...styles.addToCartBtnText, ...textStyle }}>
        {i18n.t('Add to cart').toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};
