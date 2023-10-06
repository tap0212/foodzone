import login from '../features/login/index';

export const routeMap = {
  onboarding: {
    login: 'FoodZone.Login.main',
  },
};

export const routeXScreenMap = {
  [routeMap.onboarding.login]: login,
};
