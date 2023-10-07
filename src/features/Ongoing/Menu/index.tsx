/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../components/Header';
import { colors } from '../../../theme/colors';
import FoodTile from '../../../components/FoodTile';
import { useDispatch, useSelector } from 'react-redux';
import {
  cartSelector,
  currentRestaurantSelector,
  updateCart,
} from '../../../store/slices/appSlice';
import { calculateTotalPrice, findItemById } from '../../../utils';
import { Restaurant } from '../../../assets/Data/type';
import { BasicButton } from '../../../components/Buttons/Basic';

export default function Restaurants() {
  const selectedRestaurant = useSelector(currentRestaurantSelector);
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const [showGoToCart, setShowGoToCart] = useState<boolean>(false);

  useEffect(() => {
    if (cart && Object.keys(cart?.quantityMap).length) {
      setShowGoToCart(true);
    } else {
      setShowGoToCart(false);
    }
  }, [cart]);
  const onPressAddItem = (itemId: number) => {
    if (!selectedRestaurant) return;

    if (!cart) {
      const targetItem = findItemById(itemId, selectedRestaurant);
      if (targetItem) {
        dispatch(
          updateCart({
            items: [targetItem],
            quantityMap: {
              [itemId]: 1,
            },
          }),
        );
      }
    } else {
      const existingQuantity = cart.quantityMap[itemId] || 0;
      const updatedQuantityMap = {
        ...cart.quantityMap,
        [itemId]: existingQuantity + 1,
      };
      const targetItem = findItemById(itemId, selectedRestaurant);

      if (targetItem) {
        dispatch(
          updateCart({
            items: [...cart.items, targetItem],
            quantityMap: updatedQuantityMap,
          }),
        );
      }
    }
  };
  const onPressRemoveItem = (itemId: number) => {
    if (!cart) return;

    const existingQuantity = cart.quantityMap[itemId] || 0;

    if (existingQuantity > 1) {
      const updatedQuantityMap = {
        ...cart.quantityMap,
        [itemId]: existingQuantity - 1,
      };

      dispatch(
        updateCart({
          items: cart.items,
          quantityMap: updatedQuantityMap,
        }),
      );
    } else {
      const updatedQuantityMap = { ...cart.quantityMap };
      delete updatedQuantityMap[itemId];

      const updatedItems = cart.items.filter((item) => item.id !== itemId);

      dispatch(
        updateCart({
          items: updatedItems,
          quantityMap: updatedQuantityMap,
        }),
      );
    }
  };
  const getNumberOfItemsInTheCart = (itemId: number) => {
    if (!cart) return 0;
    const quantity = cart.quantityMap[itemId] || 0;
    return quantity;
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header />
      <View style={styles.innerContainer}>
        <Text style={styles.h2}>{selectedRestaurant?.name}</Text>
        <Text>{selectedRestaurant?.distance_km}KM far away</Text>
        <FlatList
          contentInset={{ bottom: 100 }}
          data={selectedRestaurant?.cuisines}
          keyExtractor={(item) => item.id.toString()}
          style={{ paddingVertical: 24 }}
          renderItem={({ item }) => (
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
              <FlatList
                contentInset={{ bottom: 48 }}
                data={item.items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <FoodTile
                    onPressRemoveItem={onPressRemoveItem}
                    onPressAddItem={onPressAddItem}
                    numberOfItems={getNumberOfItemsInTheCart(item.id)}
                    {...item}
                  />
                )}
              />
            </View>
          )}
        />
      </View>
      {showGoToCart && Boolean(cart) && (
        <View style={styles.goToCartContainer}>
          <View>
            <Text style={styles.goToCartText}>
              {Object.keys(cart?.quantityMap).length} Items added
            </Text>
            <Text style={styles.goToCartText}>
              Total: $ {calculateTotalPrice(cart, selectedRestaurant as Restaurant)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.goToCartButton}
            onPress={() => {
              //
            }}>
            <Text style={styles.btnText}>Go to cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  goToCartButton: {
    display: 'flex',
    borderRadius: 10,
    height: 56,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    backgroundColor: colors.background.primary,
  },
  goToCartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: colors.background.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goToCartText: {
    color: '#fff',
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.background.primary,
    position: 'relative',
  },
  mainContainerStyle: {
    padding: 0,
  },
  innerContainer: {
    padding: 18,
    marginBottom: 100,
  },
  h2: {
    fontWeight: '600',
    fontSize: 24,
  },
  list: {},
  bottomContainer: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});
