import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import MapView from 'react-native-maps';
import ExifReader from '../../node_modules/exifreader/src/exif-reader';
import RNFS from '../../node_modules/react-native-fs';
import {decode} from 'base64-arraybuffer';

// const b64Buffer = await RNFS.readFile('file://../src/assets/IMG_0596.heic', 'base64') // Where the URI looks like this: "file:///path/to/image/IMG_0123.HEIC"
// const fileBuffer = decode(b64Buffer)
// const tags = ExifReader.load(fileBuffer, {expanded: true});

// const lat = tags['gps']['Latitude'];
// const long = tags['gps']['Longitude'];

export default function Story() {
  console.log(RNFS.CachesDirectoryPath);
var [lat, long] = [48.858571, 2.294338];
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
      <Image source={require('../assets/IMG_0596.jpg')} style={styles.image} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 600,
    width: 354,
    borderRadius: 5,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  image: {
    width: '100%',
    height: '50%',
    overflow: 'hidden',
  },
});
