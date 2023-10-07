import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

export default function Header({ text = 'Food zone' }: { text?: string }) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: colors.background.secondary,
    width: '100%',
    backgroundColor: colors.background.primary,
    padding: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
});
