import React from 'react';
import {Image} from 'react-native';

import HomeScreen from './HomeScreen';
import AddScreen from './AddScreen';
import ProfileScreen from './ProfileScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {pickMultiple} from './AddScreen.js'
export default function BottomStack(props) {
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
      listeners={{
        tabPress : (e)=>{
          e.preventDefault();
          // alert('hi')
          pickMultiple(props);
        }
      }}
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
        component={ProfileScreen}
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
