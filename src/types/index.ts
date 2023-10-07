import { Item } from '../assets/Data/type';

export enum ReduxApiStatus {
  IDEL = 'IDEL',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}
export type User = {
  email: string;
  token: string;
};

export enum LEVELS {
  LOGIN_COMPLETE = 'LOGIN_COMPLETE',
}

export type Cart = {
  items: Item[];
  quantityMap: {
    [itemId: number]: number;
  };
} | null;
