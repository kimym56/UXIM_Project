import React, {useState, useCallback} from 'react';
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
import {Like} from '../assets/Button/Like';
import {Bookmark} from '../assets/Button/Bookmark';
import {QA} from '../assets/Button/QA.js';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import QAScreen from './QAScreen';
import {CustomFooter} from './CustomFooter.js';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Geocoder from 'react-native-geocoding';
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const assets = require('../assets/assets.js');
export default function ImageScreen(props) {
  console.log('ImageScreen render');
  console.log('props in imageScreen:',props.route.params)
  // console.log(
  //   'Slider Width : ',
  //   SLIDER_WIDTH,
  //   'Slider Height : ',
  //   SLIDER_HEIGHT,
  // );
  var src = props.route.params.index;
  const [imgNum, setIndex] = useState(src);
  const [imgSrc, setImgSrc] = useState(props.route.params.imgUris[imgNum]);
  const changeImage = num => {
    if (imgNum + num >= 0 && imgNum + num < props.route.params.imgUris.length) {
      setIndex(imgNum + num);
      setImgSrc(props.route.params.imgUris[imgNum + num]);
    }
  };
  const snapPoints = ['50%', '50%', '100%'];
  const [address, setAdress] = useState('');
  const [snapIndex, setSnapIndex] = useState(1);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
    setSnapIndex(index);
  }, []);
  
  return (
    <View>
      <View style={{}}>
        <ImageBackground source={{uri:props.route.params.imgUris[imgNum]}} style={styles.image2} blurRadius={20}>
          <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}></View>
        </ImageBackground>
        <Image source={{uri:props.route.params.imgUris[imgNum]}} style={styles.image} />
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
              
              props.navigation.navigate('Map', {
                data: props.route.params.data,
                index: imgNum,
                coordinate: props.route.params.data.images[imgNum].geo,
              });
            }}>
            <Image source={require('../assets/goback.png')} />
            <View style={{width: 290}}>
              <Text
                selectable={true}
                style={{color: 'white', fontWeight: '400', fontSize: 13}}>
                {props.route.params.data.images[imgNum].geocoding}
              </Text>
            </View>
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
          // backgroundColor:'blue',
          bottom: 0,
          // marginLeft: SLIDER_WIDTH * 0.08,
          position: 'absolute',
          // borderWidth: 1,
          height: SLIDER_HEIGHT * 0.118, // 60
          width: SLIDER_WIDTH, // 390
          alignItems: 'center',
        }}>
        <Progress.Bar
          style={{top: SLIDER_HEIGHT * 0.077}} // 25
          progress={(imgNum+1) / (props.route.params.data.images.length)}
          height={4}
          width={SLIDER_WIDTH * 0.8} //312
          color="white"
          // backgroundColor="black"
          borderWidth={0}
        />
        <View
          style={{
            flexDirection: 'row',
            width: SLIDER_WIDTH,
            // borderWidth:1,
            // bottom: SLIDER_HEIGHT / 2,
            alignItems: 'center',
          }}>
          <Image
            style={{width: 40, height: 40, borderRadius: 40 / 2, left: 38}}
            source={props.route.params.profileUri?{uri:props.route.params.profileUri}:require('../assets/defaultProfile.png')}
          />
          <Like style={{left: 210}} size={20} color={'white'} />
          <QA
            style={{left: 293 - 40 - 20}}
            onPress={() => {
              bottomSheetModalRef.present();
            }}
          />
          <Bookmark style={{left: 293 - 40 - 20 + 20}} />
        </View>
      </View>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref => (this.bottomSheetModalRef = ref)}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          footerComponent={CustomFooter}>
          <QAScreen
            bottomSheetModalRef={this.bottomSheetModalRef}
            snapIndex={snapIndex}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    marginTop: SLIDER_HEIGHT * 0.069, //  58
    marginLeft: SLIDER_WIDTH * 0.051, //  20
    width: 44,
    flexDirection: 'row',
    // backgroundColor: 'rgba(100,100,100,0.15)',
    // justifyContent: 'center',
    alignItems: 'center',
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
