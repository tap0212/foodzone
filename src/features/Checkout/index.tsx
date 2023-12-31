/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../../components/Header';
import { colors } from '../../theme/colors';
import { useSelector } from 'react-redux';
import { cartSelector, currentRestaurantSelector, updateCart } from '../../store/slices/appSlice';
import { findItemById } from '../../utils';
import { Restaurant } from '../../assets/Data/type';
import Toast from 'react-native-toast-message';
import { routeMap } from '../../navigator/navigatorData';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../hooks/resux';

export default function Restaurants() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const cart = useSelector(cartSelector);
  const selectedRestaurant = useSelector(currentRestaurantSelector);
  const calculateSubtotal = () => {
    let subtotal = 0;
    if (cart) {
      for (const itemId in cart.quantityMap) {
        if (Object.hasOwnProperty.call(cart.quantityMap, itemId)) {
          const quantity = cart.quantityMap[itemId];
          const item = findItemById(Number(itemId), selectedRestaurant as Restaurant);

          if (item) {
            subtotal += item.price * quantity;
          }
        }
      }
    }
    return subtotal;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.08; // 8% tax
  };

  // Calculate total including tax, delivery charges, and convenience fee
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const deliveryCharges = 2.0; // $2 delivery charges
    const convenienceFee = 0.2; // $0.20 convenience fee
    return subtotal + tax + deliveryCharges + convenienceFee;
  };
  const OnPressCheckout = () => {
    Toast.show({
      type: 'success',
      text1: 'Your order has been placed and will be delivered soon',
      position: 'top',
      topOffset: 80,
    });
    dispatch(updateCart(null));
    navigation.navigate(routeMap.onboarding.landing);
  };
  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header text="Checkout" />
      <ScrollView scrollEnabled style={styles.innerContainer}>
        <Text style={styles.h2}>Delivering super fast to you!</Text>
        <View style={styles.card}>
          <Text style={[styles.h2, styles.white]}>
            {selectedRestaurant?.name} will start preparing your order as soon as you complete it!
          </Text>
          <Text style={[styles.h2, styles.white]}>Order details</Text>

          {cart &&
            cart.items.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Text style={styles.orderItemName}>{item.name}</Text>
                <Text style={styles.orderItemQuantity}>Quantity: {cart.quantityMap[item.id]}</Text>
                <Text style={styles.orderItemPrice}>Price: ${item.price.toFixed(2)}</Text>
              </View>
            ))}
        </View>
        <View style={styles.totalCard}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Subtotal:</Text>
              <Text style={styles.tableCell}>${calculateSubtotal().toFixed(2)}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Tax (8%):</Text>
              <Text style={styles.tableCell}>${calculateTax().toFixed(2)}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Delivery Charges:</Text>
              <Text style={styles.tableCell}>$2.00</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Convenience Fee:</Text>
              <Text style={styles.tableCell}>$0.20</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Total:</Text>
              <Text style={styles.tableCell}>${calculateTotal().toFixed(2)}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.goToCartButton} onPress={OnPressCheckout}>
          <Text style={styles.btnText}>Make Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  goToCartButton: {
    display: 'flex',
    borderRadius: 10,
    height: 56,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    backgroundColor: colors.background.secondary,
    marginBottom: 44,
  },
  table: {
    marginTop: 20,
    borderColor: colors.background.secondary,
    borderWidth: 2,
    borderRadius: 5,
  },

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: colors.background.secondary,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  tableCell: {
    fontSize: 16,
    color: colors.background.secondary,
  },
  orderItem: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingBottom: 10,
  },

  orderItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },

  orderItemQuantity: {
    fontSize: 14,
    color: 'white',
  },

  orderItemPrice: {
    fontSize: 14,
    color: 'white',
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.background.primary,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    gap: 8,
    backgroundColor: colors.background.secondary,
  },
  totalCard: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    gap: 8,
    backgroundColor: colors.background.primary,
  },
  innerContainer: {
    padding: 18,
  },
  white: {
    color: '#fff',
  },
  h2: {
    fontWeight: '600',
    text: 18,
  },
});
