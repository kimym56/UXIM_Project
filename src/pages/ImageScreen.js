import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {IMG_0} from '../assets/assets.js';

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const assets = require('../assets/assets.js');
export default function ImageScreen(props) {
  console.log('***props1*** : ', props);
  console.log('***props2*** : ', props.route);
  var src = props.route.params.name;
  const [imgNum, setIndex] = useState(src);
  const [imgSrc, setImgSrc] = useState(assets[imgNum]);
  const changeImage = num => {
    if (imgNum+num >= 0 && imgNum+num < 10) {
      setIndex(imgNum + num);
      setImgSrc(assets[imgNum + num]);
    }
  };
  // var src2 = '../assets/'+src
  // var image = require(src);
  return (
    <SafeAreaView>
      <View style={{borderWidth: 5, borderColor: 'yellow'}}>
        <Image source={imgSrc} style={styles.image} />
      </View>
      <View
        style={{
          width: '100%',
          height: '100%',
          marginTop: 46, //Need to change
          borderWidth: 5,
          borderColor: 'green',
          position: 'absolute',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            width: '50%',
            height: '100%',
            borderWidth: 1,
            borderColor: 'red',
          }}
          onPress={() => {
            changeImage(-1);
          }}>
          <Text>{imgNum}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            height: '100%',
            borderWidth: 1,
            borderColor: 'blue',
          }}
          onPress={() => {
            changeImage(+1);
          }}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
