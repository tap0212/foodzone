/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackNavigator from './src/navigator';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { colors } from './src/theme/colors';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.flex1}>
      <NavigationContainer>
        <StatusBar barStyle={'light-content'} />
        <SafeAreaView style={styles.main} />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StackNavigator />
            <Toast />
          </PersistGate>
        </Provider>
        <SafeAreaView style={styles.safeArea} />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  flex1: {flex: 1},
  main: {flex: Platform.OS === 'android' ? 0.03 : 0, backgroundColor: colors.background.primary},
  safeArea: {
    flex: Platform.OS === 'android' ? 0.03 : 0,
    backgroundColor: '#1a1a1a',
  },
});
export default App;
