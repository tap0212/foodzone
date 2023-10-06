import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SuperScreenProps} from './types';
import {BasicButton} from '../Buttons/Basic';
import {colors} from '../../theme/colors';

const SuperScreen = ({
  children,
  noBottomButton,
  bottomButtonProps = {
    onPress: () => {
      //
    },
    text: 'No botton props provided',
  },
  contentContainerStyleProp,
  mainContainerStyle,
  scrollEnabled = true,
}: SuperScreenProps) => {
  return (
    <SafeAreaView>
      <View style={[styles.mainContainer, mainContainerStyle]}>
        <ScrollView
          scrollEnabled={scrollEnabled}
          style={styles.subContainer}
          contentContainerStyle={[styles.flexGrow, contentContainerStyleProp]}>
          <KeyboardAvoidingView
            style={styles.flexGrow}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              {children}
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
        {!noBottomButton && (
          <View style={styles.buttonContainer}>
            <BasicButton {...bottomButtonProps} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.background.primary,
    padding: 16,
  },
  subContainer: {
    backgroundColor: colors.background.primary,
  },
  buttonContainer: {
    height: 48,
    paddingBottom: 24,
  },
  flexGrow: {
    flexGrow: 1,
  },
});

export default SuperScreen;
