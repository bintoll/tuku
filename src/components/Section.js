import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  warpperTop: {
    backgroundColor: 'white',
    marginTop: 20
  },
  container: {
    paddingTop: 20,
  },
  topDivider: {
    borderTopWidth: 1,
    borderColor: '#F1F1F4',
    width: '100%',
  },
  wrapper: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    paddingBottom: 15,
    textAlign: 'left',
    fontWeight: '600',
    color: '#10083F',
    marginLeft: 10
  },
  rightButton: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  rightButtonText: {
    color: '$buttonWithoutBackgroundTextColor',
    fontSize: 14,
  },
});

/**
 * Application section wrapper.
 *
 * @param {string} title - Section title.
 * @param {object} wrapperStyle - Styles for children wrapper.
 * @param {object} containerStyle - Styles for section wrapper.
 * @param {boolean} showRightButton - Right button flag.
 * @param {string} rightButtonText - Right button text.
 * @param {function} onRightButtonPress - Right button onPress function.
 *
 * @return {JSX.Element}
 */
const Section = ({
  children,
  title = '',
  wrapperStyle,
  containerStyle,
  showRightButton,
  rightButtonText,
  onRightButtonPress,
  topDivider = false,
}) => (
  <View style={styles.warpperTop}>
    {topDivider && <View style={styles.topDivider} />}
    <View style={[styles.container, containerStyle]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.topDivider} />
      {showRightButton && (
        <TouchableOpacity
          onPress={() => onRightButtonPress()}
          style={styles.rightButton}>
          <Text style={styles.rightButtonText}>{rightButtonText}</Text>
        </TouchableOpacity>
      )}
      <View style={[styles.wrapper, wrapperStyle]}>{children}</View>
    </View>
  </View>
);

/**
 * @ignore
 */
Section.propTypes = {
  title: PropTypes.string,
  wrapperStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  containerStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  showRightButton: PropTypes.bool,
  rightButtonText: PropTypes.string,
  onRightButtonPress: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
