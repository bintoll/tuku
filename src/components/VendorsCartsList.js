import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text, View } from 'react-native';

// Components
import VendorsCartsItem from './VendorsCartsItem';
import EmptyCart from './EmptyCart';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FontFamily } from '../constants/font';
import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
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
  listWrapper: {
    flex: 1,
    marginTop: 16
  },
})

/**
 * Renders a list of vendor carts.
 *
 * @param {array} cart - Array of vendor carts.
 * @param {object} auth - Auth information.
 * @param {func} handleRefresh - Refreshes cart state.
 * @param {boolean} refreshing - Set this true while waiting for new data from a refresh.
 * @param {object} cartActions - Cart actions.
 *
 * @return {JSX.Element}
 */
const VendorsCartsList = ({
  carts,
  auth,
  componentId,
  handleRefresh,
  refreshing,
  cartActions,
}) => (
  <View style={styles.container}>
    <View style={styles.titleTextWrapper}>
      <Text style={styles.titleText}>{i18n.t("My basket")}</Text>
    </View>
    <View style={styles.listWrapper}>
      <FlatList
        data={carts}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <VendorsCartsItem
            item={item}
            auth={auth}
            componentId={componentId}
            handleRefresh={handleRefresh}
            refreshing={refreshing}
            cartActions={cartActions}
          />
        )}
        ListEmptyComponent={() => <EmptyCart />}
      />
    </View>
  </View>
);

VendorsCartsList.propTypes = {
  cart: PropTypes.shape({}),
  auth: PropTypes.shape({
    token: PropTypes.string,
  }),
  refreshing: PropTypes.bool,
  handleRefresh: PropTypes.func,
  cartActions: PropTypes.shape({}),
  carts: PropTypes.arrayOf(PropTypes.shape({})),
};

export default VendorsCartsList;
