import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
import ExifReader from '../../node_modules/exifreader/src/exif-reader';
import RNFS from '../../node_modules/react-native-fs';
import {decode} from 'base64-arraybuffer';

// const b64Buffer = await RNFS.readFile('file://../src/assets/IMG_0596.heic', 'base64') // Where the URI looks like this: "file:///path/to/image/IMG_0123.HEIC"
// const fileBuffer = decode(b64Buffer)
// const tags = ExifReader.load(fileBuffer, {expanded: true});

// const lat = tags['gps']['Latitude'];
// const long = tags['gps']['Longitude'];

export default function Story({navigation}) {
  console.log(RNFS.CachesDirectoryPath);
  const [lat, long] = [48.858571, 2.294338];
  var [lat2, long2] = [37.566, 126.937];
  var img = require('../assets/IMG_0.jpeg');
  var imgSource = 'IMG_0.jpeg';
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.00522,
          longitudeDelta: 0.00521,
        }}
      />
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          navigation.navigate('Map', {latitude: lat, longitude: long});
        }}>
        <Image source={img} style={styles.image} />
      </TouchableOpacity>
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
