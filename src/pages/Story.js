import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import RNFS from '../../node_modules/react-native-fs';
import QAScreen from './QAScreen';
import {Like} from '../assets/Button/Like';
import {Bookmark} from '../assets/Button/Bookmark';
import {QA} from '../assets/Button/QA.js';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomFooter} from './CustomFooter.js';
import {storage} from '../../firebase/firebase-config';
import {getDownloadURL, ref} from 'firebase/storage';
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient';

// const b64Buffer = await RNFS.readFile('file://../src/assets/IMG_0596.heic', 'base64') // Where the URI looks like this: "file:///path/to/image/IMG_0123.HEIC"
// const fileBuffer = decode(b64Buffer)
// const tags = ExifReader.load(fileBuffer, {expanded: true});

// const lat = tags['gps']['Latitude'];
// const long = tags['gps']['Longitude'];

export default function Story(props) {
  const [imgUri, setImgUri] = useState();
  useEffect(() => {
    const reference = ref(storage, props.data.images[0].uri);
    getDownloadURL(reference).then(ret => setImgUri(ret));
  }, []);

  console.log('Story render');
  // console.log('props in Story: ', props);
  // console.log('data : ', props.data?.images[0].geo);
  // console.log('imgUri: ',imgUri)
  // console.log(RNFS.CachesDirectoryPath);
  const [lat, long] = [
    props.data.images[0].geo.latitude,
    props.data.images[0].geo.longitude,
  ];
  // const [lat, long] = [48.855725, 2.2985333333333333];
  var [lat2, long2] = [37.566, 126.937];
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
          props.navigation.navigate('Map', {
            data: props.data,
            coordinate: {latitude: lat, longitude: long},
          });
        }}>
        <Image source={{uri: imgUri}} style={styles.image} />
      </TouchableOpacity>
      <View
        style={{
          // borderWidth: 1,
          // backgroundColor:'rgba(0,0,0,0.05)',
          bottom: 0,
          height:60,
          position: 'absolute',
          // height: SLIDER_HEIGHT * 0.118, // 60
          width: '100%', // 390
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
          <LinearGradient
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
        />
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            marginLeft: 20,
          }}
          source={require('../assets/IMG_0638.jpeg')}
        />
        <View style={{marginLeft: 14, width: 256}}>
          <Text
            selectable={true}
            style={{
              // backgroundColor: 'rgba(0,0,0,0.2)',
              color: 'white',
              fontWeight: '700',
              fontSize: 15,
            }}>
            {props.data.title}
          </Text>
        </View>
        <Like style={{right: 20}} size={20} color={'white'} />
        {/* <QA
            style={{marginLeft: 12}}
            onPress={() => {
              bottomSheetModalRef.present();
            }}
          />
          <Bookmark style={{marginLeft: 12}} /> */}
      </View>

      {/* <BottomSheetModal
        ref={ref => (this.bottomSheetModalRef = ref)}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        footerComponent={CustomFooter}>
        <QAScreen
          bottomSheetModalRef={this.bottomSheetModalRef}
          snapIndex={snapIndex}
        />
      </BottomSheetModal> */}
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
