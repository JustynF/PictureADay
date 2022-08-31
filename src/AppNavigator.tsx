import React from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import GalaxyViewerHomeScreen from "./View/GalaxyViewer/GalaxyViewerHomeScreen";
import ImageDetailView from "./View/GalaxyViewer/ImageDetailView"
const Stack = createStackNavigator();


export default () => {
  const inset = useSafeAreaInsets();
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />

      <Stack.Navigator screenOptions={{ headerBackTitle: '', title: '' }}>

        <Stack.Screen
          name="HomeScreen"
          component={GalaxyViewerHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailView"
          component={ImageDetailView}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </>
  );
};
