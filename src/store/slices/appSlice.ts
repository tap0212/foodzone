import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '..';
import { LEVELS, ReduxApiStatus, User } from '../../types';

export interface App {
  user: User;
  validations: {
    emailError: string;
    passwordError: string;
  };
  reduxState: ReduxApiStatus;
  levels: LEVELS[];
}
const initialState: App = {
  user: {
    email: '',
    token: ''
  },
  validations: {
    emailError: '',
    passwordError: '',
  },
  reduxState: ReduxApiStatus.IDEL,
  levels: []
};
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
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

export const {updateUser, updateValidations, updateReduxState, updateLevels} = appSlice.actions;
export const userSelector = (state: RootState) => state.app.user;
export const tokenSelector = (state: RootState) => state.app.user.token;
export const validationsSelector = (state: RootState) => state.app.validations;
export const reduxStateSelector = (state: RootState) => state.app.reduxState;
export const levelsSelector = (state: RootState) => state.app.levels;
export default appSlice.reducer;
