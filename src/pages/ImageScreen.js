import React from 'react';
import {View, Text, Image,SafeAreaView,StyleSheet} from 'react-native';

export default function ImageScreen(props) {
  console.log('***props1*** : ', props);
  console.log('***props2*** : ', props.route.params.image);

  var img = require('../assets/IMG_0.jpeg');
  var src = props.route.params.image;
  // var src2 = '../assets/'+src
  // var image = require(src);
  return (
    <SafeAreaView>
    <View>
      <Image source={img} style={styles.image} />
    </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create(
  {
    image: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }, 
  }
)
