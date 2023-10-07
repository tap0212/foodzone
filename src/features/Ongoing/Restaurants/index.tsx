/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import restaurants from '../../../assets/Data/restaurants.json';
import Header from '../../../components/Header';
import { colors } from '../../../theme/colors';
import { RestuarantsData } from '../../../assets/Data/type';
import RestaurantTile from '../../../components/RestaurantTile';
import { useNavigation } from '@react-navigation/native';
import { routeMap } from '../../../navigator/navigatorData';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentRestaurantSelector,
  updateCart,
  updateCurrentRestaurant,
} from '../../../store/slices/appSlice';
import { findRestaurantById } from '../../../utils';
// @ts-ignore
const jsonData: RestuarantsData = restaurants.restaurants;

export default function Restaurants() {
  const navigator = useNavigation();
  const currentRestaurant = useSelector(currentRestaurantSelector);
  const dispatch = useDispatch();
  const onPressRestaurant = (id: number) => {
    const selectedRestaurant = findRestaurantById(id, jsonData);

    if (selectedRestaurant && currentRestaurant && selectedRestaurant.id !== currentRestaurant.id) {
      dispatch(updateCurrentRestaurant(selectedRestaurant));
      dispatch(updateCart(null));
    } else {
      dispatch(updateCurrentRestaurant(selectedRestaurant));
    }

    navigator.navigate(routeMap.onboarding.menu);
  };
  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header />
      <View style={styles.innerContainer}>
        <Text style={styles.h2}>Choose a restaurant to check the menu</Text>
        <FlatList
          style={styles.list}
          data={[...jsonData.trusted_restaurants, ...jsonData.trusted_restaurants]}
          renderItem={({ item }) => {
            if (item.header) {
              return (
                <Text style={[styles.h2, { marginVertical: 12, marginTop: 28 }]}>
                  {item.header}
                </Text>
              );
            }
            return <RestaurantTile onPressRestaurant={onPressRestaurant} {...item} />;
          }}
          contentInset={{ bottom: 48 }}
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
    text: 18,
    color: '#000',
  },
  list: {},
  bottomContainer: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});
