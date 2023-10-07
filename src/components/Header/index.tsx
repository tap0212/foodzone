import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';

export default function Header({ text = 'Food zone' }: { text?: string }) {
  const navigation = useNavigation();
  const onBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.chevron}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderBottomColor: colors.background.secondary,
    width: '100%',
    backgroundColor: colors.background.primary,
    padding: 8,
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  chevron: {
    fontSize: 24,
  },
});
