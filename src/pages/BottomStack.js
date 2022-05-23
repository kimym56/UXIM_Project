import React from 'react';
import {Image} from 'react-native';

import HomeScreen from './HomeScreen';
import AddScreen from './AddScreen';
import ProfileScreen from './ProfileScreen';

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
              source={require('../assets/Home.png')}
              style={{width: 25, height: 25}}
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
              source={require('../assets/Add.png')}
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/Profile.png')}
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
