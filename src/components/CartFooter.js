import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from './Button';
import i18n from '../utils/i18n';
import { formatPrice } from '../utils';
import { FontFamily } from '../constants/font';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: 24,
    paddingTop: 10
  },
  cartInfoTitle: {
    color: '#10083F',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FontFamily.SFPRODISPLAY_REGULAR
  },
  cartInfoTitleBold: {
    fontFamily: FontFamily.SFPRODISPLAY_BOLD
  },
  cartInfoValue: {
    color: '#10083F',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FontFamily.SFPRODISPLAY_BOLD
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  btnWrapper: {
    marginTop: 10
  },
  btn: {
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  placeOrderBtnText: {
    fontSize: 16
  }
});

/**
 * Cart footer.
 *
 * @reactProps {string} totalPrice - The total amount of the order.
 * @reactProps {string} btnText - Text on the footer button.
 * @reactProps {function} onBtnPress - Push function.
 * @reactProps {boolean} isBtnDisabled - Button activity flag.
 */
export default class extends PureComponent {
  /**
   * @ignore
   */
  static propTypes = {
    totalPrice: PropTypes.string,
    btnText: PropTypes.string,
    onBtnPress: PropTypes.func,
    isBtnDisabled: PropTypes.bool,
    products: PropTypes.array
  };

  /**
   * Renders component.
   *
   * @returns {JSX.Element}
   */
  render() {
    const { onBtnPress, totalPrice, isBtnDisabled, btnText, products } = this.props;
    const allProductsPrice = products?.reduce((acc, cur) => acc+cur.price, 0)
    const productsForSum = allProductsPrice ? allProductsPrice.toFixed(2) : allProductsPrice
    const productsAmount = products?.length
    return (
      <View style={styles.container}>
        {
          productsAmount ? (
            <View style={styles.row}>
              <Text style={styles.cartInfoTitle}>
                {i18n.t("Products in order")}
              </Text>
              <Text style={styles.cartInfoValue}>{products?.length}</Text>
            </View>
          ) : undefined
        }
        {
          productsForSum ? (
            <View style={styles.row}>
              <Text style={styles.cartInfoTitle}>
              {i18n.t("Products for sum")}
              </Text>
              <Text style={styles.cartInfoValue}>{productsForSum}</Text>
            </View>
          ) : undefined
        }
        <View style={styles.row}>
          <Text style={[styles.cartInfoTitle, styles.cartInfoTitleBold]}>
            {i18n.t('Total')}
          </Text>
          <Text style={styles.cartInfoValue}>{formatPrice(totalPrice)}</Text>
        </View>
        <View style={styles.btnWrapper}>
          <Button
            type={isBtnDisabled ? 'disabledPrimary' : 'primary'}
            onPress={() => onBtnPress()}
            disabled={isBtnDisabled}
            style={styles.btn}>
            <Text style={styles.placeOrderBtnText}>{btnText}</Text>
          </Button>
        </View>
      </View>
    );
  }
}
