import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface IconButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  link?: ImageSourcePropType;
  containerStyle?: ViewStyle;
  iconPlacement?: 'right' | 'left';
  textStyle?: TextStyle;
  iconStyles?: StyleProp<ImageStyle>;
  isLinearGradient?: boolean;
}
