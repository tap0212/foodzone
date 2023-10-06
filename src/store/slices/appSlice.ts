import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '..';

export interface App {
  id: string;
  name: string;
  email: string;
}
const initialState: Array<App> = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@test.com',
  },
];
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<App>) => {
      state.push(action.payload);
    },
  },
});

export const {addUser} = appSlice.actions;
export const userSelector = (state: RootState) => state.appReducer;
export default appSlice.reducer;
