import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import StarsRating from './StarsRating';
import {
  DISCUSSION_COMMUNICATION,
  DISCUSSION_COMMUNICATION_AND_RATING,
  DISCUSSION_RATING,
} from '../constants';
import i18n from '../utils/i18n';
import { FontFamily } from '../constants/font';

const RATING_STAR_SIZE = 18;
const profileIconImage = require('../assets/profile.png')

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  msg: {
    color: '$discussionMessageColor',
    marginTop: 0,
    paddingBottom: 10,
    textAlign: 'justify',
    fontFamily: FontFamily.SFPRODISPLAY_REGULAR,
    fontSize: 14,
    lineHeight: 18
  },
  itemContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  itemContainerNoBorder: {
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  itemWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftSide: {
    width: 42,
  },
  avatarWrapper: {
    width: 42,
    height: 42,
    borderRadius: 42,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarImage: {
    height: '60%',
    width: '60%',
    resizeMode: 'contain'
  },
  rightSide: {
    marginLeft: 8,
    flex: 1
  },
  name: {
    fontFamily: FontFamily.SFPRODISPLAY_REGULAR,
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'left',
    color: '$darkColor',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: '0.9rem',
    color: 'gray',
    paddingBottom: 10,
    paddingTop: 4,
  },
});

/**
 * Renders reviews.
 *
 * @reactProps {object[]} items - All reviews.
 * @reactProps {boolean} infinite - Lazy pagination flag.
 * @reactProps {function} onEndReached - Lazy pagination function.
 * @reactProps {string} type - Review settings.
 * @reactProps {boolean} fetching - Spinner display flag.
 */
export default class DiscussionList extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    infinite: PropTypes.bool,
    onEndReached: PropTypes.func,
    type: PropTypes.string,
    fetching: PropTypes.bool,
  };

  /**
   * @ignore
   */
  static defaultProps = {
    items: [],
    infinite: false,
  };

  /**
   * Renders a review.
   *
   * @param {object} item - Review information.
   * @param {number} index - Review index.
   *
   * @return {JSX.Element}
   */
  renderItem(item, index) {
    const { type, items } = this.props;
    const showRating =
      type === DISCUSSION_RATING ||
      type === DISCUSSION_COMMUNICATION_AND_RATING;

    const showMessage =
      type === DISCUSSION_COMMUNICATION_AND_RATING ||
      type === DISCUSSION_COMMUNICATION;

    const noUnderlineStyle = items.length === index + 1;

    console.log('1111item ', item)

    return (
      <View
        style={[
          styles.itemContainer,
          noUnderlineStyle && styles.itemContainerNoBorder,
        ]}>
        <View style={styles.leftSide}>
          <View style={styles.avatarWrapper}>
            <Image source={profileIconImage} style={styles.avatarImage} />
          </View>
        </View>
        <View style={styles.rightSide}>
          <View style={styles.itemWrapper}>
            <Text style={styles.name}>{item.name}</Text>
            {showRating && (
              <StarsRating
                value={item.rating_value}
                size={RATING_STAR_SIZE}
                isRatingSelectionDisabled
              />
            )}
          </View>
          {showMessage && <Text style={styles.msg}>{item.message}</Text>}
        </View>
      </View>
    );
  }

  /**
   * Renders a spinner.
   *
   * @return {null}
   * @return {JSX.Element}
   */
  renderFooter() {
    const { fetching } = this.props;

    if (!fetching) {
      return null;
    }

    return <ActivityIndicator animating />;
  }

  /**
   * Renders a message if there are no reviews.
   *
   * @return {JSX.Element}
   */
  renderEmpty = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>{i18n.t('No posts found')}</Text>
    </View>
  );

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { items, infinite, onEndReached } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          numColumns={1}
          keyExtractor={(item, index) => `disucssion_${index}`}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          ListFooterComponent={() => this.renderFooter()}
          ListEmptyComponent={() => this.renderEmpty()}
          onEndReached={() => {
            if (infinite) {
              onEndReached();
            }
          }}
        />
      </View>
    );
  }
}
