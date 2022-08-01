import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

export default function LandingScreen() {
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LottieView
        source={require('../assets/lottie/78790-hello.json')}
        autoPlay
        // loop
        style={{borderWidth:0}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
