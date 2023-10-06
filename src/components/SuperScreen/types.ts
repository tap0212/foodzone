import { ReactNode } from 'react';
import { BasicButtonProps } from '../Buttons/Basic/types';
import { KeyboardType, TextStyle, ViewStyle } from 'react-native';

export interface SuperScreenProps {
  children: ReactNode;
  noBottomButton?: boolean;
  bottomButtonProps?: BasicButtonProps;
  contentContainerStyleProp?: ViewStyle;
  mainContainerStyle?: ViewStyle;
  scrollEnabled?: boolean;
}
