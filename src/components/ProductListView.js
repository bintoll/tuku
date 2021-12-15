import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import toInteger from 'lodash/toInteger';
import get from 'lodash/get';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PRODUCT_IMAGE_WIDTH, formatPrice, getImagePath } from '../utils';
import i18n from '../utils/i18n';
import StarsRating from '../components/StarsRating';
import { PRODUCT_NUM_COLUMNS } from '../utils';
import { FontFamily } from '../constants/font';

const bagIconImage = require('../assets/bag.png')

const RATING_STAR_SIZE = 18;

const styles = EStyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '$productBorderColor',
    borderRadius: 12,
    backgroundColor: '#fff',
    margin: 5,
    paddingBottom: 16,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: `${Math.floor(94 / PRODUCT_NUM_COLUMNS)}%`,
    overflow: 'hidden'
  },
  productImage: {
    width: PRODUCT_IMAGE_WIDTH,
    height: PRODUCT_IMAGE_WIDTH,
  },
  description: {
    paddingTop: 8,
    paddingHorizontal: 8,
    width: '100%'
  },
  productName: {
    color: 'black',
    textAlign: 'left',
    marginTop: 6,
    fontFamily: FontFamily.SFPRODISPLAY_REGULAR
  },
  productPrice: {
    color: '#10083F',
    textAlign: 'left',
    fontSize: 20,
    lineHeight: 26,
    fontFamily: FontFamily.SFPRODISPLAY_BOLD
  },
  discountAndRaitingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listDiscountWrapper: {
    backgroundColor: '$productDiscountColor',
    paddingVertical: 2,
    borderRadius: '$borderRadius',
    width: 51,
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceWrapper: {
    flexDirection: 'row',
    marginTop: 6,
  },
  listPriceText: {
    textDecorationLine: 'line-through',
    color: '$darkColor',
    textAlign: 'left',
    paddingRight: 4,
    paddingTop: 2,
    fontSize: 12,
  },
  listDiscountText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: FontFamily.SFPRODISPLAY_REGULAR
  },
  rating: {
    marginLeft: -10,
    marginRight: -10,
    marginTop: 0,
  },
  vendorWrapper: {
    marginTop: 11,
    flexDirection: 'row',
    alignItems: 'center'
  },
  vendorIconImageWrapper: {
    height: 16,
    width: 16,
  },
  vendorIconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  vendorText: {
    marginLeft: 5,
    color: '#858295',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: FontFamily.SFPRODISPLAY_REGULAR
  }
});

/**
 * Renders a product card.
 *
 * @reactProps {object} product - Product information.
 * @reactProps {function} onPress - Opens product screen.
 */
class ProductListView extends PureComponent {
  /**
   * @ignore
   */
  static propTypes = {
    product: PropTypes.shape({
      item: PropTypes.object,
    }),
    onPress: PropTypes.func,
  };

  /**
   * Renders discount.
   *
   * @return {JSX.Element}
   */
  renderDiscount = () => {
    const { product } = this.props;
    const { item } = product;

    if (!item.list_discount_prc && !item.discount_prc) {
      return <View />;
    }

    const discount = item.list_discount_prc || item.discount_prc;

    return (
      <View style={styles.listDiscountWrapper}>
        <Text style={styles.listDiscountText} numberOfLines={1}>
          {`${discount}%`}
        </Text>
      </View>
    );
  };

  /**
   * Renders price.
   *
   * @return {JSX.Element}
   */
  renderPrice = () => {
    const { product } = this.props;
    const { item } = product;
    const productTaxedPrice = get(item, 'taxed_price_formatted.price', '');
    const productPrice =
      productTaxedPrice || get(item, 'price_formatted.price', product.price);
    let discountPrice = null;

    if (toInteger(item.discount_prc)) {
      discountPrice = item.base_price_formatted.price;
    } else if (toInteger(item.list_price)) {
      discountPrice = item.list_price_formatted.price;
    }

    const isProductPriceZero = Math.ceil(item.price) === 0;
    const showDiscount =
      isProductPriceZero && (item.discount_prc || item.list_discount_prc);

    return (
      <View style={styles.priceWrapper}>
        {showDiscount && (
          <Text style={styles.listPriceText}>{discountPrice}</Text>
        )}
        {isProductPriceZero ? (
          <Text>{i18n.t('Contact us for a price')}</Text>
        ) : (
          <Text numberOfLines={1} style={styles.productPrice}>
            {formatPrice(productPrice)}
          </Text>
        )}
      </View>
    );
  };

  /**
   * Renders rating.
   *
   * @return {JSX.Element}
   */
  renderRating = () => {
    const {
      product: { item },
    } = this.props;

    return (
      <StarsRating
        value={item.average_rating}
        size={RATING_STAR_SIZE}
        isRatingSelectionDisabled
      />
    );
  };

  renderVendor = () => {
    const {
      product: { item },
    } = this.props;
    return (
      <View style={styles.vendorWrapper}>
        <View style={styles.vendorIconImageWrapper}>
          <Image style={styles.vendorIconImage} source={bagIconImage} />
        </View>
        <Text style={styles.vendorText}>
          {item.company_name}
        </Text>
      </View>
    )
  }

  /**
   * Renders component
   *
   * @return {JSX.Element}
   */
  render() {
    const { product, onPress } = this.props;
    const { item } = product;
    const imageUri = getImagePath(item);

    return (
      <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
        <View>
          {imageUri !== null && (
            <Image
              style={styles.productImage}
              source={{ uri: imageUri }}
              resizeMode="contain"
              resizeMethod="resize"
            />
          )}
        </View>
        <View style={styles.description}>
          <View style={styles.discountAndRaitingWrapper}>
            {this.renderDiscount()}
            {this.renderRating()}
          </View>
          {this.renderPrice()}
          <Text numberOfLines={3} style={styles.productName}>
            {item.product}
          </Text>
          {this.renderVendor()}
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect((state) => ({
  settings: state.settings,
}))(ProductListView);
