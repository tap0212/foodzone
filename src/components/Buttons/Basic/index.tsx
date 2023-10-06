import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BasicButtonProps} from './types';
import {colors} from '../../../theme/colors';

export const BasicButton = ({
  text,
  onPress,
  disabled = false,
}: BasicButtonProps) => {
  const onPresshandler = () => {
    if (!disabled) {
      onPress();
    }
  };

  return (
    <LinearGradient
      colors={[colors.white.DEFAULT, '#F9F1E7']}
      style={styles.button}>
      <TouchableOpacity
        style={[
          styles.button,
          disabled ? styles.buttonBlack : styles.primaryButton,
        ]}
        onPress={onPresshandler}>
        {typeof text === 'string' ? (
          <Text style={styles.btnText}>{text}</Text>
        ) : (
          <>{text}</>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    display: 'flex',
    borderRadius: 10,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.black[60],
  },
  buttonBlack: {
    backgroundColor: colors.black[40],
  },
  primaryButton: {},
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black[80],
  },
  textWhite: {
    color: colors.white.DEFAULT,
  },
  textBlack: {
    color: colors.black[80],
  },
});
