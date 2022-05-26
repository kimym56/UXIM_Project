import React, {useState} from 'react';
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
import MapView, {Marker} from 'react-native-maps';
import Category from './Category';
import Carousel from 'react-native-snap-carousel';
import RNFS from 'react-native-fs';
import {decode} from 'base64-arraybuffer';
import ExifReader from '../../node_modules/exifreader/src/exif-reader.js';

const assets = require('../assets/assets.js');
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push({
    index: i,
    uri: '/Users/kimyoungmin/UXIM_Project/src/assets/IMG_' + i + '.jpeg',
    name: i,
    // item : assets[this.name]
  });
}
DATA[0].item = require('../assets/IMG_0.jpeg');
DATA[1].item = require('../assets/IMG_1.jpeg');
DATA[2].item = require('../assets/IMG_2.jpeg');
DATA[3].item = require('../assets/IMG_3.jpeg');
DATA[4].item = require('../assets/IMG_4.jpeg');
DATA[5].item = require('../assets/IMG_5.jpeg');
DATA[6].item = require('../assets/IMG_6.jpeg');
DATA[7].item = require('../assets/IMG_7.jpeg');
DATA[8].item = require('../assets/IMG_8.jpeg');
DATA[9].item = require('../assets/IMG_9.jpeg');

export default function MapScreen(props) {
  // console.log(props);
  console.log("Mapscreen render");
  const [stateIndex, setIndex] = useState(0);
  const [gps, setGPS] = useState({
    lat: props.route.params.latitude,
    long: props.route.params.longitude,
  });
  async function getExif(uri, index) {
    const b64Buffer = await RNFS.readFile(uri, 'base64'); // Where the URI looks like this: "file:///path/to/image/IMG_0123.HEIC"
    const fileBuffer = decode(b64Buffer);
    const tags = ExifReader.load(fileBuffer, {expanded: true});
    tags.gps
      ? setGPS({lat: tags.gps.Latitude, long: tags.gps.Longitude})
      : null;
    console.log(gps);
  }
  const onSnap = index => {
    setIndex(index);
    getExif(DATA[index].uri, index);
  };
  const _renderItem = ({item, index}) => {
    // return <Category imageUri={"https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg"}/>;
    return (
      <View style={styles.itemContainer}>
        {/* <Text style={styles.itemLabel}>{`Item ${item.index}`}</Text> */}
        <TouchableOpacity style={{width:'100%'}} onPress={()=>{props.navigation.navigate('Image',DATA[index])}}>
          <Image
            style={{width: '100%', height: '100%', borderRadius: 17}}
            source={DATA[index].item}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const goBack = () => {
    props.navigation.navigate('Stack');
  };

  return (
    // <SafeAreaView>
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: gps.lat,
          longitude: gps.long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}>
        <Marker
          coordinate={{latitude: gps.lat, longitude: gps.long}}
          // image={{uri: '/Users/kimyoungmin/UXIM_Project/src/assets/bread crumbs.png'}}
        />
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
          <Image source={require('../assets/goback.png')} />
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
    backgroundColor: 'rgba(100,100,100,0.15)',
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
