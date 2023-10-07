import login from '../features/Login/index';
import Restaurants from '../features/Ongoing/Restaurants';
import Menu from '../features/Ongoing/Menu';
import Checkout from '../features/Checkout';
export const routeMap = {
  onboarding: {
    login: 'FoodZone.Login.main',
    landing: 'FoodZone.Landing.main',
    menu: 'FoodZone.Menu.main',
  },
  checkout: {
    cart: 'FoodZone.checkout.main',
  },
};

export const routeXScreenMap = {
  [routeMap.onboarding.login]: login,
  [routeMap.onboarding.landing]: Restaurants,
  [routeMap.onboarding.menu]: Menu,
  [routeMap.checkout.cart]: Checkout,
};
