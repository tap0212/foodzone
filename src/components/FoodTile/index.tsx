import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Item } from '../../assets/Data/type';
import img from '../../assets/png/restaurant.png';
import { colors } from '../../theme/colors';
import Counter from '../Counter';

interface RestaurantTile extends Item {
  onPressAddItem: (id: number) => void;
  onPressRemoveItem: (id: number) => void;
  numberOfItems: number;
}
export default function FoodTile({
  onPressRemoveItem,
  onPressAddItem,
  name,
  id,
  price,
  numberOfItems,
}: RestaurantTile) {
  const onIncrement = () => {
    onPressAddItem(id);
  };
  const onDecrement = () => {
    onPressRemoveItem(id);
  };
  return (
    <View key={id} style={styles.container}>
      <Image style={styles.img} source={img} />
      <View style={styles.restaurantView}>
        <Text>{name}</Text>
        <Text>$ {price}</Text>
      </View>
      <View style={styles.cuisineView}>
        <Counter value={numberOfItems} onIncrement={onIncrement} onDecrement={onDecrement} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
