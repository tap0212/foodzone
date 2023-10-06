import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconButtonProps} from './types';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../theme/colors';

const IconButton = ({
  text,
  onPress,
  link,
  containerStyle,
  iconPlacement = 'right',
  textStyle,
  iconStyles,
  isLinearGradient = false,
}: IconButtonProps) => {
  const renderBtn = () => (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text
        style={[
          styles.text,
          isLinearGradient ? styles.blackText : {},
          textStyle,
        ]}>
        {text}
      </Text>
      {link && <Image source={link} style={[styles.img, iconStyles]} />}
    </TouchableOpacity>
  );

  return isLinearGradient ? (
    <LinearGradient
      style={[
        styles.btnContainer,
        iconPlacement === 'right' ? null : styles.reverseIcon,
        containerStyle,
      ]}
      colors={['#fff', '#F9F1E7']}>
      {renderBtn()}
    </LinearGradient>
  ) : (
    <View
      style={[
        styles.btnContainer,
        iconPlacement === 'right' ? null : styles.reverseIcon,
        containerStyle,
      ]}>
      {renderBtn()}
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    marginBottom: 16,
    width: '100%',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  reverseIcon: {
    flexDirection: 'row-reverse',
  },
  img: {
    height: '100%',
  },
  text: {
    fontSize: 16,
    color: '#fff'
  },
  blackText: {
    color: '#000',
  },
});

export default IconButton;
