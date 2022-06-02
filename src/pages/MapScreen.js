import React, {useState, useEffect} from 'react';
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
import MapView, {Marker, Polyline} from 'react-native-maps';
import Category from './Category';
import Carousel from 'react-native-snap-carousel';
import RNFS from 'react-native-fs';
import {decode} from 'base64-arraybuffer';
import ExifReader from '../../node_modules/exifreader/src/exif-reader.js';
import MapViewDirections from 'react-native-maps-directions';

const mapData = require('../assets/mapData.js');
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const DATA = [];
const coordinates = [];
for (let i = 0; i < 12; i++) {
  DATA.push({
    index: i,
    uri: '/Users/kimyoungmin/UXIM_Project/src/assets/IMG_' + i + '.jpeg',
    name: i,
    item: mapData.assetsObject[i],
  });
}
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
  console.log(props);
  const [stateIndex, setIndex] = useState(props.route.params?props.route.params.initIndex:0);
  const [gps, setGPS] = useState(props.route.params);
  async function getExif(uri, index) {
    const b64Buffer = await RNFS.readFile(uri, 'base64'); // Where the URI looks like this: "file:///path/to/image/IMG_0123.HEIC"
    const fileBuffer = decode(b64Buffer);
    const tags = ExifReader.load(fileBuffer, {expanded: true});
    const coordinate = {
      latitude: tags.gps.Latitude,
      longitude: tags.gps.Longitude,
    };
    mapData.markers[index].coordinate = coordinate;
    coordinates.push(coordinate);
  }
  useEffect(() => {
    for (index = 0; index < 12; index++) {
      getExif(DATA[index].uri, index);
    }
    console.log('done');
  }, []);
  const onSnap = index => {
    setIndex(index);
    setGPS(
     mapData.markers[index].coordinate
    );
  };

  const setIndexAfterGoBack = (index) => {
    setIndex(index)
  };
  const _renderItem = ({item, index}) => {
    // return <Category imageUri={"https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg"}/>;
    return (
      <View style={styles.itemContainer}>
        {/* <Text style={styles.itemLabel}>{`Item ${item.index}`}</Text> */}
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => {
            props.navigation.navigate('Image', DATA[index]);
          }}>
          <Image
            style={{width: '100%', height: '100%', borderRadius: 17}}
            source={DATA[index].item}
          />
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    // <SafeAreaView>
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: gps.latitude,
          longitude: gps.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}>
        {console.log('mapData.markers : ', mapData.markers)}
        {mapData
          ? mapData.markers.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={marker.coordinate}
                  image={{
                    uri: '/Users/kimyoungmin/UXIM_Project/src/assets/breadCrumbs.png',
                  }}
                />
              );
            })
          : null}
        {console.log('coordinates : ', coordinates)}
        <Polyline
          coordinates={[
            {latitude: 48.855725, longitude: 2.2985333333333333},
            {latitude: 45.431688888888885, longitude: 12.328972222222221},
            {latitude: 45.46463055555556, longitude: 9.190441666666667},
            {latitude: 44.10744444444445, longitude: 9.72565},
            {latitude: 41.23578333333334, longitude: 1.813225},
            {latitude: 46.54750555555555, longitude: 7.985102777777778},
            {latitude: 37.560027777777776, longitude: 126.93705833333334},
            {latitude: 37.56262222222222, longitude: 126.9373638888889},
            {latitude: 37.56579722222222, longitude: 126.9386138888889},
            {latitude: 37.700875, longitude: 126.37917222222221},
            {latitude: 33.256594444444445, longitude: 126.53916111111111},
            {latitude: 33.256594444444445, longitude: 126.53916111111111},
          ]}
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000',
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000'
          ]}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={5}
        />
        {/* <MapViewDirections origin={origin} destination={destination} /> */}
      </MapView>
      <View
        style={{
          position: 'absolute',
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Image source={require('../assets/goback2.png')} />
        </TouchableOpacity>
        <Carousel
          ref={c => (this.carousel = c)}
          data={DATA}
          renderItem={_renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={index => onSnap(index)}
          useScrollView={true}
        />
      </View>
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    top: 50,
    left: 20,
    width: 40,
    borderRadius: 10,
    tintColor: 'white',
    // backgroundColor: 'rgba(100,100,100,0.15)',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  carouselContainer: {
    top: SLIDER_HEIGHT - ITEM_HEIGHT - 120,
  },
  itemContainer: {
    marginBottom: 10,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 17,
    shadowColor: '#000',
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
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
