import React from 'react';
import {Image} from 'react-native';

import HomeScreen from './HomeScreen';
import AddScreen from './AddScreen';
import ProfileScreen from './ProfileScreen';
import KeyboardHandlingExample from './KeyboardHandlingExample';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export default function BottomStack() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        // tabBarIconStyle: {display: 'none'},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/Icon_Home.png')}
              style={{width: 44, height: 44}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddEvent"
        component={AddScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/Icon_Add.png')}
              style={{width: 44, height: 44}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={KeyboardHandlingExample}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/Icon_Profile.png')}
              style={{width: 44, height: 44}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
