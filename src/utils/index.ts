import { Restaurant, RestuarantsData } from '../assets/Data/type';
import { Cart } from '../types';

export function getRandomRating() {
  const ratings = ['$$$', '$', '$$'];
  const randomIndex = Math.floor(Math.random() * ratings.length);
  return ratings[randomIndex];
}
export function findRestaurantById(idToFind: number, restaurantData: RestuarantsData) {
  const foundInQuickBites = restaurantData.quick_bites.find(
    (restaurant) => restaurant.id === idToFind,
  );

  const foundInTrustedRestaurants = restaurantData.trusted_restaurants.find(
    (restaurant) => restaurant.id === idToFind,
  );

  if (foundInQuickBites) {
    return foundInQuickBites;
  } else if (foundInTrustedRestaurants) {
    return foundInTrustedRestaurants;
  } else {
    return null;
  }
}

export function findItemById(itemIdToFind: number, restaurant: Restaurant) {
  for (const cuisine of restaurant.cuisines) {
    const foundItem = cuisine.items.find((item) => item.id === itemIdToFind);
    if (foundItem) {
      return foundItem;
    }
  }
  return null;
}

export const calculateTotalPrice = (cart: Cart, selectedRestaurant: Restaurant) => {
  if (!cart) return 0;

  let totalPrice = 0;
  for (const itemId in cart.quantityMap) {
    if (Object.hasOwnProperty.call(cart.quantityMap, itemId)) {
      const quantity = cart.quantityMap[itemId];
      const item = findItemById(Number(itemId), selectedRestaurant);

      if (item) {
        totalPrice += item.price * quantity;
      }
    }
  }

  return totalPrice.toFixed(2);
};
