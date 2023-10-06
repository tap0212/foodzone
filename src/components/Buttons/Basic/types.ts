import {ReactNode} from 'react';

export interface BasicButtonProps {
  text: string | ReactNode;
  onPress: () => void;
  disabled?: boolean;
}
