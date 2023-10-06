import React, { useMemo } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routeMap, routeXScreenMap} from './navigatorData';
import { levelsSelector } from '../store/slices/appSlice';
import { useSelector } from 'react-redux';
import { LEVELS } from '../types';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const levels = useSelector(levelsSelector);
  const latestLevel = useMemo(() => {
    if (levels?.length > 0) {
      return levels[levels.length - 1];
    }
    return '';
  }, [levels]);

  const getLeveWiseInitialRoute = () => {
    switch (latestLevel) {
      case LEVELS.LOGIN_COMPLETE:
        return routeMap.onboarding.landing;
      
      default:
        return routeMap.onboarding.login;
    }
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={getLeveWiseInitialRoute()}>
      {Object.entries(routeXScreenMap).map(([key, val]) => (
        <Stack.Screen key={key} name={key} component={val} />
      ))}
    </Stack.Navigator>
  );
};
export default StackNavigator;
