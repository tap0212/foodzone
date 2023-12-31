import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Restaurant } from '../../assets/Data/type';
import img from '../../assets/png/restaurant.png';
import { colors } from '../../theme/colors';
import { getRandomRating } from '../../utils';

interface RestaurantTile extends Restaurant {
  onPressRestaurant: (id: number) => void;
}
export default function RestaurantTile({
  onPressRestaurant,
  name,
  cuisines,
  id,
  distance_km,
}: RestaurantTile) {
  return (
    <TouchableOpacity
      key={id}
      onPress={() => {
        onPressRestaurant(id);
      }}
      style={styles.container}>
      <Image style={styles.img} source={img} />
      <View style={styles.restaurantView}>
        <Text style={styles.textColor}>{name}</Text>
        <Text style={styles.textColor}>{distance_km} Km away</Text>
      </View>
      <View style={styles.cuisineView}>
        <Text style={styles.textColor}>{cuisines.length} Cuisines</Text>
        <Text style={styles.textColor}>{getRandomRating()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textColor: {
    color: colors.text,
    fontWeight: '600',
  },
  img: {
    width: 24,
    height: 24,
  },
  container: {
    marginVertical: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.background.secondary,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  cuisineView: {
    alignItems: 'flex-end',
  },
  restaurantView: {
    alignItems: 'center',
  },
});
