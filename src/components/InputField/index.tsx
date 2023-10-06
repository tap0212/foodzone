import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {InputProps} from './types.js';
import {colors} from '../../theme/colors';

const Input = ({
  containerStyle,
  placeholderText,
  type = 'default',
  secureTextEntry = false,
  iconLink,
  inputStyle,
  value,
  onChange,
  error,
  design = 'outlined',
}: InputProps) => {
  const [onFocus, setOnfocus] = useState<boolean>(false);
  const toggleFocus = () => {
    setOnfocus(prev => !prev);
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          ...(design === 'filled' ? [styles.filled] : [styles.outlines]),
        ]}>
        <TextInput
          value={value}
          autoCapitalize={type === 'email-address' ? 'none' : undefined}
          onChangeText={onChange}
          placeholder={placeholderText}
          placeholderTextColor={colors.background.primary}
          style={[styles.input, inputStyle]}
          keyboardType={type}
          secureTextEntry={secureTextEntry}
          onFocus={toggleFocus}
          onBlur={toggleFocus}
        />
        {iconLink && !onFocus && Boolean(value) && (
          <Image source={iconLink} style={styles.icon} />
        )}
      </View>
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    marginTop: 6,
    color: 'red',
    fontSize: 16,
  },
  container: {
    marginVertical: 12,
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: 16,
    paddingTop: 0,
    paddingBottom: 0,
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 16,
    gap: 4,
  },
  icon: {
    height: '100%',
  },
  filled: {
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  outlines: {
    borderColor: '#fff',
  },
});

export default Input;
