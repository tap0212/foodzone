import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routeMap, routeXScreenMap} from './navigatorData';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeMap.onboarding.login}>
      {Object.entries(routeXScreenMap).map(([key, val]) => (
        <Stack.Screen key={key} name={key} component={val} />
      ))}
    </Stack.Navigator>
  );
};
export default StackNavigator;
