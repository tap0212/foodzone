import login from '../features/Login/index';
import Restaurants from '../features/Ongoing/Restaurants';

export const routeMap = {
  onboarding: {
    login: 'FoodZone.Login.main',
    landing: 'FoodZone.Landing.main',
    menu: 'FoodZone.Menu.main',
    cart: 'FoodZone.Cart.main'
  },
};

export const routeXScreenMap = {
  [routeMap.onboarding.login]: login,
  [routeMap.onboarding.landing]: Restaurants,
};
