/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import Header from '../../../components/Header';
import { colors } from '../../../theme/colors';
import FoodTile from '../../../components/FoodTile';
import { useDispatch, useSelector } from 'react-redux';
import {
  cartSelector,
  currentRestaurantSelector,
  updateCart,
} from '../../../store/slices/appSlice';
import { findItemById } from '../../../utils';

export default function Restaurants() {
  const selectedRestaurant = useSelector(currentRestaurantSelector);
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.background.primary,
  },
  mainContainerStyle: {
    padding: 0,
  },
  innerContainer: {
    padding: 18,
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
