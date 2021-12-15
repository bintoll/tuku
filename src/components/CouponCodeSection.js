import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import i18n from '../utils/i18n';
import FormBlock from './FormBlock';
import Icon from './Icon';
import { FontFamily } from '../constants/font';

const styles = EStyleSheet.create({
  wrapper: {
    borderRadius: 12
  },
  itemContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  itemText: {
    paddingTop: 4,
    fontSize: '1rem',
  },
  itemBtn: {
    width: 30,
    height: 30,
  },
  input: {
    color: '#000000',
    fontSize: 15,
    lineHeight: 22,
    paddingVertical: Platform.OS === 'ios' ? 9 : 0,
    paddingHorizontal: 7,
    borderRadius: 12,
    marginBottom: 5,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    fontFamily: FontFamily.SFPRODISPLAY_REGULAR,
    backgroundColor: 'white',
    flex: 1
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  inputBtn: {
    backgroundColor: '#0024FF',
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '1rem',
  },
  removeBtn: {
    padding: 2,
  },
});

/**
 * Renders the coupon input field and coupons.
 *
 * @reactProps {function} onAddPress - Adds a coupon.
 * @reactProps {function} onRemovePress - Removes a coupon.
 * @reactProps {string[]} items - Applied coupons.
 */
class CouponCodeSection extends Component {
  /**
   * @ignore
   */
  static propTypes = {
    onAddPress: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.string),
  };

  /**
   * @ignore
   */
  state = {
    value: '',
  };

  /**
   * Condition for adding a coupon.
   *
   * @param {string} value - Coupon name.
   */
  handleAddCoupon = () => {
    const { value } = this.state;
    const { onAddPress } = this.props;

    if (value && value !== '') {
      this.setState({
        value: '',
      });
      onAddPress(value);
    }
  };

  /**
   * Renders coupon item.
   *
   * @param {string} item - Coupon name.
   * @param {number} index - Coupon index.
   *
   * @return {JSX.Element}
   */
  renderCouponItem = (item, index) => {
    const { onRemovePress } = this.props;
    return (
      <View style={styles.itemContainer} key={index}>
        <Text style={styles.itemText}>{item}</Text>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => onRemovePress(item)}>
          <Icon name="clear" style={styles.removeBtnIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Renders component.
   *
   * @return {JSX.Element}
   */
  render() {
    const { items } = this.props;
    const { value } = this.state;

    return (
      <View style={styles.wrapper}>
        <FormBlock title={i18n.t('Coupon code')}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ value: text })}
              value={value}
            />
            <TouchableOpacity
              onPress={this.handleAddCoupon}
              style={styles.inputBtn}>
              <Text style={styles.inputBtnText}>Применить</Text>
            </TouchableOpacity>
          </View>
          {items.map((item, index) => this.renderCouponItem(item, index))}
        </FormBlock>
      </View>
    );
  }
}

export default CouponCodeSection;
