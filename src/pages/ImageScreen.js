import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
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
  const [imgSrc, setImgSrc] = useState(assets.assetsObject[imgNum]);
  const changeImage = num => {
    if (imgNum + num >= 0 && imgNum + num < 12) {
      setIndex(imgNum + num);
      setImgSrc(assets.assetsObject[imgNum + num]);
    }
  };
  // var src2 = '../assets/'+src
  // var image = require(src);
  return (
    <View>
      <View style={{}}>
        <ImageBackground source={imgSrc} style={styles.image2} blurRadius={20}>
          <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)'}}></View>
        </ImageBackground>
        <Image source={imgSrc} style={styles.image} />
      </View>
      <View //Touchable Area
        style={styles.touchableArea}>
        <TouchableOpacity
          style={{
            width: '50%',
            height: '100%',
          }}
          onPress={() => {
            changeImage(-1);
          }}>
          <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Image source={require('../assets/goback.png')} />
        </TouchableOpacity>
        
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            height: '100%',
          }}
          onPress={() => {
            changeImage(+1);
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    top: 4,
    left: 20,
    width: 40,
    borderRadius: 10,
    // backgroundColor: 'rgba(100,100,100,0.15)',
  },
  touchableArea:{
    width: '100%',
    height: '100%',
    marginTop: 46, //Need to change
    position: 'absolute',
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'contain',
  },
  image2: {
    width: '100%',
    height: '100%',
  },
});
