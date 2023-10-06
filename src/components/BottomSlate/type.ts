import {ReactNode} from 'react';

export interface BottomSlateProps {
  children: ReactNode;
  footerComponent?: ReactNode;
  snapPoints?: 'full' | 'half';
  childerType?:
    | 'BottomSheetScrollView'
    | 'BottomSheetFlatList'
    | 'BottomSheetView';
}
