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
    color: "#000",
  },
  buttonBlack: {
    backgroundColor: '#fff',
    opacity: 0.4,
  },
  primaryButton: {
    backgroundColor: colors.background.primary
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  textWhite: {
    color: '#fff',
  },
  textBlack: {
    color: '#000',
  },
});
