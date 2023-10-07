import BottomSheet, {
  BottomSheetBackgroundProps,
  BottomSheetFooter,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultFooterProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { colors } from '../../theme/colors';
import { BottomSlateProps } from './type';
import React, { useMemo } from 'react';

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({ style, animatedIndex }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      [colors.background.secondary, colors.background.secondary],
    ),
    borderTopLeftRadius: interpolate(animatedIndex.value, [0, 1], [16, 16]),
    borderTopRightRadius: interpolate(animatedIndex.value, [0, 1], [16, 16]),
    borderColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      [colors.background.secondary, colors.background.secondary],
    ),
    borderTopWidth: interpolate(animatedIndex.value, [0, 1], [1, 1]),
  }));
  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  );
  return <Animated.View pointerEvents="none" style={containerStyle} />;
};
export const BottomSlate = ({
  children,
  footerComponent,
  snapPoints: snapPointsProps,
}: BottomSlateProps) => {
  const windowHeight = Dimensions.get('window').height;

  const snapPoints = useMemo(() => {
    const mid = Platform.OS === 'android' ? 0.7 : 0.65;
    const full = 0.85;
    if (snapPointsProps) {
      if (snapPointsProps === 'full') {
        return [windowHeight * full];
      }
      return [windowHeight * mid];
    }
    return [windowHeight * mid, windowHeight * full];
  }, [windowHeight, snapPointsProps]);

  const renderFooter = (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultFooterProps) => (
    <BottomSheetFooter style={styles.footer} {...props}>
      {footerComponent}
    </BottomSheetFooter>
  );
  const handleComponent = () => (
    <View style={styles.closeLineContainer}>
      <View style={styles.closeLine} />
    </View>
  );
  return (
    <BottomSheet
      handleComponent={handleComponent}
      footerComponent={footerComponent ? renderFooter : undefined}
      backgroundComponent={CustomBackground}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      index={0}
      snapPoints={snapPoints}>
      <BottomSheetScrollView style={footerComponent ? { marginBottom: 84 } : {}}>
        {children}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  closeLineContainer: {
    padding: 16,
    alignItems: 'center',
  },
  closeLine: {
    width: 36,
    backgroundColor: 'white',
    height: 4,
    borderRadius: 16,
    opacity: 0.8,
  },
  footer: {
    backgroundColor: colors.background.secondary,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
