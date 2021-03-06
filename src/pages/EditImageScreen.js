import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
export default function EditImageScreen(props) {
  const images = props.route.params.images;
  console.log('edit props : ', props);
  const [imgNum, setImgNum] = useState(0);

  console.log('imgNum : ', imgNum, images.length);
  return (
    <View style={{}}>
      <View>
        <ImageBackground
          source={images[imgNum]}
          style={styles.image2}
          blurRadius={20}>
          <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)'}}></View>
        </ImageBackground>
        <Image source={images[imgNum]} style={styles.image} />
      </View>
      <View style={styles.topBar}>
        {imgNum != 0 ? (
          <TouchableOpacity
            style={{width: 44, height: 44, borderWidth: 1}}
            onPress={() => setImgNum(imgNum - 1)}>
            <Image source={require('../assets/goback.png')} />
          </TouchableOpacity>
        ) : (
          <View style={{width: 44}} />
        )}
        <View style={{flexDirection: 'row', left: 70}}>
          <TouchableOpacity>
            <Image
              source={require('../assets/Icon_Aa.png')}
              style={{width: 44, height: 44, borderWidth: 1}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/Icon_tag.png')}
              style={{width: 44, height: 44, borderWidth: 1}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/Icon_Aa.png')}
              style={{width: 44, height: 44, borderWidth: 1}}
            />
          </TouchableOpacity>
        </View>
        {imgNum != images.length - 1 ? (
          <TouchableOpacity
            style={{width: 44, height: 44, borderWidth: 1}}
            onPress={() => setImgNum(imgNum + 1)}>
            <Image
              source={require('../assets/Icon_Redo_white.png')}
              style={{width: 44, height: 44}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{width: 44, height: 44, borderWidth: 1}}
            onPress={() =>
              props.navigation.navigate('Edit2', {images: images})
            }>
            <Image
              source={require('../assets/Icon_Redo_white.png')}
              style={{width: 44, height: 44}}
            />
          </TouchableOpacity>
        )}
      </View>

      <Progress.Bar
        style={{marginLeft: 40, marginTop: 18}} // 25
        progress={images.length > 1 ? imgNum + 1 / images.length : 1}
        height={4}
        width={SLIDER_WIDTH * 0.8} //312
        color="white"
        // backgroundColor="black"
        borderWidth={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'black',
    // flex: 1,
    // borderWidth:1
  },
  topBar: {
    marginTop: SLIDER_HEIGHT * 0.069, //  58
    // borderWidth:1,
    flexDirection: 'row',
    // backgroundColor: 'rgba(100,100,100,0.15)',
    // justifyContent: 'center',
    // alignItems:'center',
    position: 'absolute',
    // height: 44,
    width: SLIDER_WIDTH,
    // margin: 14,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // // borderWidth:1,
    // // backgroundColor:'black'
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'contain',
    // width: SLIDER_WIDTH,
    // height: SLIDER_HEIGHT * 0.616,
  },
  image2: {
    width: '100%',
    height: '100%',
  },
});
