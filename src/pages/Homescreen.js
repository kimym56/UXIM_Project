import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Story from './Story.js';

export default function Homescreen(props) {
  goNav = (destination) => {
    props.navigation.navigate(destination);
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require('../assets/Alarm.png')}
          style={{width: 30, height: 30}}
        />
        <Image source={require('../assets/LOGO.png')} />
        <Image
          source={require('../assets/Search.png')}
          style={{width: 30, height: 30}}
        />
      </View>
      <View style={styles.story}>
        <Story navigation={props.navigation}/>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 48,
    paddingRight: 48,
  },
  story: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
