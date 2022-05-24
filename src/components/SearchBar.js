import React from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'
import { FontFamily } from '../constants/font'

const searchImage = require('../assets/search.png')

export const SearchBar = (props) => (
  <View style={styles.root}>
    <TextInput {...props} style={styles.input} />
    <View style={styles.iconImageWrapper}>
      <Image source={searchImage} style={styles.iconImage} />
    </View>
  </View>
)

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    overflow: 'hidden'
  },
  input: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: FontFamily.SFPRODISPLAY_REGULAR,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  iconImageWrapper: {
    height: 20,
    width: 20,
    marginRight: 12
  },
  iconImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
})
