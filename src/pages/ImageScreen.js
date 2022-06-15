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
import {CustomFooter } from './CustomFooter.js';
import { heightPercentageToDP } from 'react-native-responsive-screen'
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
  // console.log('this.bottomSheetModalRef.index: ', this.bottomSheetModalRef);
  // console.log('***props*** : ', props);
  // console.log('***props.route*** : ', props.route);
  // console.log('***props.route.params.data : ***', props.route.params.data);
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
  const snapPoints = ['50%', '50%', '100%'];

  const [snapIndex, setSnapIndex] = useState(1);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
    setSnapIndex(index)
  }, []);

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
              console.log(
                'props.route.params.coordinates[imgNum]:',
                props.route.params.coordinates[imgNum],
              );
              props.navigation.navigate('Map', {
                index: imgNum,
                coordinate: props.route.params.coordinates[imgNum],
              });
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
          progress={imgNum / (assets.assetsObject.length - 1)}
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
            source={require('../assets/IMG_0638.jpeg')}
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
          <QAScreen bottomSheetModalRef={this.bottomSheetModalRef} snapIndex={snapIndex}/>

        </BottomSheetModal>

      </BottomSheetModalProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    top: SLIDER_HEIGHT * 0.069, //  58
    left: SLIDER_WIDTH * 0.051, //  20
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
