import { Restaurant, RestuarantsData } from '../assets/Data/type';

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
