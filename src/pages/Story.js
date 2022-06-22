import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView,{ PROVIDER_GOOGLE }  from 'react-native-maps';
import ExifReader from '../../node_modules/exifreader/src/exif-reader';
import RNFS from '../../node_modules/react-native-fs';
import {decode} from 'base64-arraybuffer';
import QAScreen from './QAScreen';
import {Like} from '../assets/Button/Like';
import {Bookmark} from '../assets/Button/Bookmark';
import {QA} from '../assets/Button/QA.js';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomFooter} from './CustomFooter.js';

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
// const b64Buffer = await RNFS.readFile('file://../src/assets/IMG_0596.heic', 'base64') // Where the URI looks like this: "file:///path/to/image/IMG_0123.HEIC"
// const fileBuffer = decode(b64Buffer)
// const tags = ExifReader.load(fileBuffer, {expanded: true});

// const lat = tags['gps']['Latitude'];
// const long = tags['gps']['Longitude'];

export default function Story({navigation}) {
  console.log('Story render');
  console.log(RNFS.CachesDirectoryPath);
  const [lat, long] = [48.855725, 2.2985333333333333];
  var [lat2, long2] = [37.566, 126.937];
  var img = require('../assets/IMG_0.jpeg');
  var imgSource = 'IMG_0.jpeg';
  const snapPoints = ['50%', '50%', '100%'];

  const [snapIndex, setSnapIndex] = useState(1);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
    setSnapIndex(index);
  }, []);
  return (
    <View style={styles.container}>
      <MapView
      // provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          navigation.navigate('Map', {
            coordinate: {latitude: lat, longitude: long},
          });
        }}>
        <Image source={img} style={styles.image} />
      </TouchableOpacity>
      <View
        style={{
          // borderWidth:1,
          bottom: 20,
          position: 'absolute',
          // height: SLIDER_HEIGHT * 0.118, // 60
          width: SLIDER_WIDTH, // 390
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: SLIDER_WIDTH,
            // borderWidth:1,
            // bottom: SLIDER_HEIGHT / 2,
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 40 / 2,
              marginLeft: 20,
            }}
            source={require('../assets/IMG_0638.jpeg')}
          />
          <Like style={{marginLeft: 190}} size={20} color={'white'} />
          <QA
            style={{marginLeft: 12}}
            onPress={() => {
              bottomSheetModalRef.present();
            }}
          />
          <Bookmark style={{marginLeft: 12}} />
        </View>
      </View>

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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 640,
    width: 354,
    borderRadius: 5,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  touchable: {
    width: '100%',
    height: '50%',
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
});
