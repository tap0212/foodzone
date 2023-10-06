import {
  ImageSourcePropType,
  KeyboardTypeOptions,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface InputProps {
  containerStyle?: ViewStyle;
  placeholderText: string;
  type?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  iconLink?: ImageSourcePropType;
  inputStyle?: TextStyle;
  value: string | number | string[] | number[];
  onChange: (value: string) => void;
  error?: string;
  design?: 'filled' | 'outlined';
}
