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
import * as Progress from 'react-native-progress';
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const assets = require('../assets/assets.js');
export default function ImageScreen(props) {
  console.log('ImageScreen render');
  console.log(
    'Slider Width : ',
    SLIDER_WIDTH,
    'Slider Height : ',
    SLIDER_HEIGHT,
  );
  console.log('***props*** : ', props);
  console.log('***props.route*** : ', props.route);
  console.log('***props.route.params.data : ***',props.route.params.data)
  // console.log(assets.assetsObject);
  var src = props.route.params.data.name;
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
              console.log('props.route.params.coordinates[imgNum]:',props.route.params.coordinates[imgNum])
              props.navigation.navigate('Map',{index : imgNum, coordinate : props.route.params.coordinates[imgNum]});
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

      <View
        style={{
          bottom: 0,
          // marginLeft: SLIDER_WIDTH * 0.08,
          position: 'absolute',
          // borderWidth: 1,
          height: SLIDER_HEIGHT * 0.071,  // 60
          width: SLIDER_WIDTH,  // 390
          alignItems: 'center',
        }}>
        <Progress.Bar
          style={{top: SLIDER_HEIGHT * 0.016}}  // 14
          progress={imgNum / (assets.assetsObject.length - 1)}
          height={4}
          width={SLIDER_WIDTH * 0.9}  //350
          color="white"
          // backgroundColor="black"
          borderWidth={0}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    top: SLIDER_HEIGHT*0.069, //  58
    left: SLIDER_WIDTH*0.051, //  20
    width: 44,
    // backgroundColor: 'rgba(100,100,100,0.15)',
  },
  touchableArea: {
    width: '100%',
    height: '100%',
    // top: 46, //Need to change
    position: 'absolute',
    flexDirection: 'row',
    // borderWidth:1,
    // borderColor:'red'
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
