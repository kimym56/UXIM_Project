import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import Category from './Category';
import Carousel from 'react-native-snap-carousel';
import RNFS from 'react-native-fs';
import {decode} from 'base64-arraybuffer';
import ExifReader from '../../node_modules/exifreader/src/exif-reader.js';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import MapViewDirections from 'react-native-maps-directions';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import {mapStyle} from '../styles/mapStyle';
import {Like} from '../assets/Button/Like';
import {storage} from '../../firebase/firebase-config';
import {ref, getDownloadURL} from 'firebase/storage';
const assets = require('../assets/assets.js');
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.546);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const coordinates = [];
// for (let i = 0; i < 14; i++) {
//   DATA.push({
//     index: i,
//     uri: '/Users/kimyoungmin/UXIM_Project0621/src/assets/IMG_' + i + '.jpeg',
//     name: i,
//     item: assets.assetsObject[i],
//   });
// }
// async function getExif(uri, index) {
//   const b64Buffer = await RNFS.readFile(uri, 'base64'); // Where the URI looks like this: "file:///path/to/image/IMG_0123.HEIC"
//   const fileBuffer = decode(b64Buffer);
//   const tags = ExifReader.load(fileBuffer, {expanded: true});
//   const coordinate = {
//     latitude: tags.gps.Latitude,
//     longitude: tags.gps.Longitude,
//   };
//   // console.log('getExif : ' + uri);
//   // console.log('cor: ', coordinate);
//   assets.markers[index].coordinate = coordinate;
//   coordinates.push(coordinate);
// }
// for (index = 0; index < 14; index++) {
//   console.log('index in MapScreen: ', index);
//   getExif(DATA[index].uri, index);
// }
// DATA[0].item = require('../assets/IMG_0.jpeg');
// DATA[1].item = require('../assets/IMG_1.jpeg');
// DATA[2].item = require('../assets/IMG_2.jpeg');
// DATA[3].item = require('../assets/IMG_3.jpeg');
// DATA[4].item = require('../assets/IMG_4.jpeg');
// DATA[5].item = require('../assets/IMG_5.jpeg');
// DATA[6].item = require('../assets/IMG_6.jpeg');
// DATA[7].item = require('../assets/IMG_7.jpeg');
// DATA[8].item = require('../assets/IMG_8.jpeg');
// DATA[9].item = require('../assets/IMG_9.jpeg');

export default function MapScreen(props) {
  console.log('Mapscreen render');
  console.log('props in MapScreen :', props.route.params.data.images[0].geo);
  const [stateIndex, setIndex] = useState(0);
  const [gps, setGPS] = useState(props.route.params.data.images[0].geo);
  const snapPoints = ['9%', '38%', '40%'];
  const [snapIndex, setSnapIndex] = useState(1);
  const [imgUris, setImgUris] = useState();
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges in MapScreen', index);
    setSnapIndex(index);
  }, []);
  // console.log('gps:', gps);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    var temp = [];
    props.route.params.data.images.map((item, index) => {
      const reference = ref(storage, item.uri);
      getDownloadURL(reference).then(ret => {
        // console.log('url : ', ret);
        temp.push(ret);
      });
    });
    setTimeout(() => setIsLoading(true), 1000);
    setImgUris(temp);
    console.log('useEffect done');
  }, []);
  useEffect(() => {
    this.carousel.snapToItem(props.route.params.index);
  }, [props.route.params.index]);
  const onSnap = index => {
    const corTemp = props.route.params.data.images[index].geo;
    console.log('cor : ', assets.markers[index].coordinate);
    this.map.animateToRegion({
      latitude: props.route.params.data.images[index].geo.latitude,
      longitude: props.route.params.data.images[index].geo.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    // setGPS[props.route.params.data.images[index].geo]
    // setGPS(assets.markers[index].coordinate);
    setIndex(index);
  };
  const setMapReady = () => {
    var markers = props.route.params.data.images.map(item => {
      return {
        latitude: item.geo.latitude,
        longitude: item.geo.longitude,
      };
    });

    console.log('mapReady : ', markers);
    this.map.fitToCoordinates(markers, {
      edgePadding: {top: 100, right: 100, bottom: 200, left: 100},
    });
  };
  // const setIndexAfterGoBack = (index) => {
  //   setIndex(index)
  // };
  const _renderItem = ({item, index}) => {
    // return <Category imageUri={"https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg"}/>;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => {
            props.navigation.navigate('Image', {
              index: index,
              data: props.route.params.data,
              imgUris: imgUris,
              profileUri: props.route.params.profileUri
            });
          }}>
          {isLoading ? (
            <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 17,
                // borderWidth:1
              }}
              source={{uri: imgUris[index]}}
            />
          ) : null}

          {/* <Text>{imgUris[index]}</Text> */}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    // <SafeAreaView>
    <View style={styles.container}>
      <MapView
        // provider={PROVIDER_GOOGLE}
        ref={ref => {
          this.map = ref;
        }}
        style={styles.map}
        onMapReady={setMapReady}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: gps.latitude,
          longitude: gps.longitude,
        }}>
        {/* {console.log('assets.markers : ', assets.markers)} */}
        {props.route.params.data.images.map((marker, index) => {
          console.log('marker : ', marker.geo);
          console.log('marker2 : ', assets.markers[index].coordinate);

          return (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.geo.latitude,
                longitude: marker.geo.longitude,
              }}>
              {stateIndex == index ? (
                <Image
                  source={require('../assets/UXIM_icon-05.png')}
                  style={{width: 40, height: 40}}
                />
              ) : (
                <Image
                  source={require('../assets/UXIM_icon-03.png')}
                  style={{width: 30, height: 30}}
                />
              )}
            </Marker>
          );
        })}
        {/* {console.log('coordinates : ', coordinates)} */}
        <Polyline
          coordinates={props.route.params.data.images.map(item => {
            return {
              latitude: item.geo.latitude,
              longitude: item.geo.longitude,
            };
          })}
          // strokeColors={[
          //   '#7F0000',
          //   '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
          //   '#B24112',
          //   '#E5845C',
          //   '#238C23',
          //   '#7F0000',
          //   '#7F0000',
          //   '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
          //   '#B24112',
          //   '#E5845C',
          //   '#238C23',
          //   '#7F0000',
          // ]}
          strokeColor="#C3AD98" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={5}
        />
        {/* <MapViewDirections origin={origin} destination={destination} /> */}
      </MapView>
      <View // TopGradient Container
        style={{
          position: 'absolute',
          width: SLIDER_WIDTH,
          height: SLIDER_HEIGHT * 0.15, //0.15
          // borderBottomWidth:1
        }}>
        <LinearGradient
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0)']}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Image source={require('../assets/goback.png')} />
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={ref => (this.bottomSheetModalRef = ref)}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View
          style={{
            flexDirection: 'row',
            width: SLIDER_WIDTH,
            // borderWidth:1,
            // bottom: SLIDER_HEIGHT / 2,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 28,
          }}>
          <Image
            style={{width: 40, height: 40, borderRadius: 40 / 2}}
            source={props.route.params.profileUri?{uri: props.route.params.profileUri}:require('../assets/defaultProfile.png')}
          />
          <View style={{width: 236, height: 34}}>
            <Text style={{fontWeight: '400', fontSize: 13}}>
              {props.route.params.data.images[stateIndex].geocoding}
            </Text>
          </View>
          <Like style={{}} size={20} color={'#AEAEAE'} />
        </View>
        <View //Carousel Container
          style={{
            // position: 'absolute',
            // bottom: 0,
            marginTop: 12,
            // borderWidth: 1,
            height: ITEM_HEIGHT, // 292
          }}>
          <Carousel
            ref={c => (this.carousel = c)}
            data={imgUris}
            renderItem={_renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            containerCustomStyle={styles.carouselContainer}
            inactiveSlideShift={0}
            onSnapToItem={index => {
              onSnap(index);
            }}
            useScrollView={true}
            inactiveSlideScale={0.95}
            // activeSlideOffset={20}
          />
        </View>
        <Progress.Bar
          style={{marginVertical: 28, alignSelf: 'center'}}
          progress={(stateIndex + 1) / props.route.params.data.images.length}
          height={4}
          width={SLIDER_WIDTH * 0.8}
          color="black"
          backgroundColor="rgba(0,0,0,0.2)"
          borderWidth={0}
        />
      </BottomSheet>

      {/* <View // BottomGradient Container
        style={styles.botGradientContainer}>
        <LinearGradient
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
          colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.4)']}
        />
      </View> */}
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    top: SLIDER_HEIGHT * 0.069, //  58
    left: SLIDER_WIDTH * 0.051, //  20
    width: 44,
    // borderRadius: 10,
    // tintColor: 'white',
    // backgroundColor: 'rgba(100,100,100,0.15)',
  },
  container: {
    width: '100%',
    height: '100%',
    // borderWidth:1
  },
  map: {
    width: '100%',
    height: '100%',
  },
  botGradientContainer: {
    bottom: 0,
    position: 'absolute',
    height: SLIDER_HEIGHT * 0.071, //  60
    width: SLIDER_WIDTH,
    alignItems: 'center',
    // justifyContent: 'center',
    // borderWidth: 1,
    borderColor: 'red',
  },
  carouselContainer: {
    // borderWidth: 1,
  },
  itemContainer: {
    // width: ITEM_WIDTH,
    marginHorizontal: 7,
    // marginTop: 10, //  15
    // bottom: SLIDER_HEIGHT * 0.005, // 9
    // height: ITEM_HEIGHT,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'red',
    // borderRadius: 17,
    // shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  itemLabel: {
    color: 'black',
    fontSize: 24,
  },
  // counter: {
  //   marginTop: 25,
  //   fontSize: 30,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
});
