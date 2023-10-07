import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface CounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Counter = ({ value, onIncrement, onDecrement }: CounterProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={value <= 0} onPress={onDecrement} style={styles.button}>
        <Text style={[styles.buttonText, value <= 0 && { opacity: 0.4 }]}>-</Text>
      </TouchableOpacity>
      <Text style={styles.countText}>{value}</Text>
      <TouchableOpacity onPress={onIncrement} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.background.secondary,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  countText: {
    fontSize: 24,
    marginHorizontal: 20,
    color: colors.text,
    fontWeight: '600',
  },
});

export default Counter;
