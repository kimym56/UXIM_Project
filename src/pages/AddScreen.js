import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Polyline, Geojson} from 'react-native-maps';
export default function AddScreen() {
  const myPlace = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [64.165329, 48.844287],
        },
      },
    ],
  };
  return (
    <View>
      <Text>AddScreen</Text>
      <MapView
        style={{
          width: '100%',
          height: '100%',
        }}
        region={{
          latitude: 37.39327199259832,
          longitude: 126.63303760163976 ,
          latitudeDelta: 0.055,
          longitudeDelta: 0.055,
        }}>
        <Polyline
          coordinates={[
            {latitude: 37.8025259, longitude: -122.4351431},
            {latitude: 37.7896386, longitude: -122.421646},
            {latitude: 37.7665248, longitude: -122.4161628},
            {latitude: 37.7734153, longitude: -122.4577787},
            {latitude: 37.7948605, longitude: -122.4596065},
            {latitude: 37.8025259, longitude: -122.4351431},
          ]}
          strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
          // strokeColors={[
          //   'red',
          //   // '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
          //   'orange',
          //   'yellow',
          //   'green',
          //   'blue',
          //   'purple',
          // ]}
          strokeWidth={5}
        />
        {/* <Geojson 
      geojson={myPlace} 
      strokeColor="blue"
      fillColor="red"
      strokeWidth={10}
    /> */}
      </MapView>
    </View>
  );
}
