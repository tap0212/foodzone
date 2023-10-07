import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Cart, LEVELS, ReduxApiStatus, User } from '../../types';
import { Restaurant } from '../../assets/Data/type';

export interface App {
  user: User;
  validations: {
    emailError: string;
    passwordError: string;
  };
  reduxState: ReduxApiStatus;
  levels: LEVELS[];
  currentRestaurant: Restaurant | null;
  cart: Cart;
}
const initialState: App = {
  user: {
    email: '',
    token: '',
  },
  validations: {
    emailError: '',
    passwordError: '',
  },
  reduxState: ReduxApiStatus.IDEL,
  levels: [],
  currentRestaurant: null,
  cart: null,
};
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<App['cart']>) => {
      const newCart = action.payload;
      state.cart = newCart;
    },
    updateCurrentRestaurant: (state, action: PayloadAction<App['currentRestaurant']>) => {
      const newRestaurant = action.payload;
      state.currentRestaurant = newRestaurant;
    },
    updateUser: (state, action: PayloadAction<App['user']>) => {
      const newUser = action.payload;
      state.user = newUser;
    },
    updateValidations: (
      state,
      action: PayloadAction<{ emailError: string; passwordError: string }>,
    ) => {
      const newValidation = action.payload;
      state.validations = newValidation;
    },
    updateReduxState: (state, action: PayloadAction<ReduxApiStatus>) => {
      state.reduxState = action.payload;
    },
    updateLevels: (state, action: PayloadAction<LEVELS>) => {
      state.levels.push(action.payload);
    },
  },
});

export const {
  updateUser,
  updateValidations,
  updateReduxState,
  updateLevels,
  updateCurrentRestaurant,
  updateCart,
} = appSlice.actions;
export const userSelector = (state: RootState) => state.app.user;
export const tokenSelector = (state: RootState) => state.app.user.token;
export const validationsSelector = (state: RootState) => state.app.validations;
export const reduxStateSelector = (state: RootState) => state.app.reduxState;
export const levelsSelector = (state: RootState) => state.app.levels;
export const currentRestaurantSelector = (state: RootState) => state.app.currentRestaurant;
export const cartSelector = (state: RootState) => state.app.cart;

export default appSlice.reducer;
