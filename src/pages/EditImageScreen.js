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
import Geocoder from 'react-native-geocoding';

export default function EditImageScreen(props) {
  const images = props.route.params.images || null;
  // console.log('edit props : ', props);
  const [imgNum, setImgNum] = useState(0);
  const [geocoder, setGeocoder] = useState('');
  // console.log('imgNum : ', imgNum, images.length);

  Geocoder.from({
    latitude: images[imgNum].gps.Latitude,
    longitude: images[imgNum].gps.Longitude,
  }).then(ret => setGeocoder(ret.results[0].formatted_address))
  .catch(err => {
    console.log('error in EditImageSreen:',err);
  });
  if (images) {
    return (
      <View style={{}}>
        <View>
          <ImageBackground
            source={images[imgNum]}
            style={styles.image2}
            blurRadius={40}>
            <View
              style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}></View>
          </ImageBackground>
          <Image source={images[imgNum]} style={styles.image} />
        </View>
        <View style={styles.topBar}>
          {imgNum != 0 ? (
            <TouchableOpacity
              style={{width: 44, height: 44}}
              onPress={() => setImgNum(imgNum - 1)}>
              <Image
                source={require('../assets/Icon_Undo.png')}
                style={{width: 44, height: 44}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
            style={{width: 44, height: 44}}
            onPress={() => props.navigation.goBack()}>
            <Image
              source={require('../assets/Icon_delete.png')}
              style={{width: 44, height: 44,}}
            />
          </TouchableOpacity>
          )}
          <View style={{marginLeft: 14, width: 256}}>
            <Text
              selectable={true}
              style={{color: 'white', fontWeight: '400', fontSize: 13}}>
              {geocoder}
            </Text>
          </View>
          {imgNum != images.length - 1 ? (
            <TouchableOpacity
              style={{width: 44, height: 44}}
              onPress={() => setImgNum(imgNum + 1)}>
              <Image
                source={require('../assets/Icon_Redo_white.png')}
                style={{width: 44, height: 44}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{width: 44, height: 44}}
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
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            right: 30,
            bottom: 70,
          }}>
          <TouchableOpacity>
            <Image
              source={require('../assets/Icon_locationTag.png')}
              style={{width: 44, height: 44}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/Icon_tag.png')}
              style={{width: 44, height: 44}}
            />
          </TouchableOpacity>
        </View>
        <Progress.Bar
          style={{position: 'absolute', bottom: 40, left: 40}} // 25
          progress={(imgNum + 1) / images.length}
          height={4}
          width={SLIDER_WIDTH * 0.8} //312
          color="white"
          // backgroundColor="white"
          borderWidth={0}
        />
      </View>
    );
  } else return <View />;
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'black',
    // flex: 1,
    // borderWidth:1
  },
  topBar: {
    marginTop: SLIDER_HEIGHT * 0.069, //  58
    padding: 16,
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
