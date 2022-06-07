import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;

export default function QAScreen({bottomSheetModalRef}) {
  console.log('QAScreen Rendering');
  // console.log('bottomSheetModalRef : ', this.bottomSheetModalRef);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.bottomSheetModalRef?.close();
          }}>
          <Image source={require('../assets/goback2.png')} />
        </TouchableOpacity>
        <Text style={styles.text}>QnA</Text>
      </View>
      <View style={styles.contentContainer}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT * 0.806, // 680
    borderWidth: 1,
    // top:30
    // backgroundColor:'red'
  },
  topBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT * 0.052, // 44
    // borderWidth: 1,
    marginTop: SLIDER_HEIGHT * 0.018, // 15
  },
  button: {
    marginLeft: 20,
    width: 44,
    // borderWidth:1
  },
  text: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '600', // Semi Bold
    // borderWidth: 1,
  },
});
