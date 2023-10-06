import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SecondaryButtonProps} from './types';
import {colors} from '../../../theme/colors';

export const Secondary = ({
  text,
  onPress,
  disabled = false,
}: SecondaryButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? styles.buttonBlack : styles.secondaryButton,
      ]}
      onPress={onPress}>
      <Text style={styles.btnText}>{text}</Text>
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
  },
  buttonBlack: {
    backgroundColor: '#000',
  },
  secondaryButton: {
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 2,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000'
  },
});
