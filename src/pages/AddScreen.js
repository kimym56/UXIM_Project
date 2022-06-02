import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Polyline} from 'react-native-maps';
export default function AddScreen() {
  return (
    <View>
      <Text>AddScreen</Text>
      <MapView
        style={{
          width: '100%',
          height: '100%',
        }}
        initialRegion={{
          latitude:37.80184502696824, 
          longitude:-122.4353985081185,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}>
        <Polyline
          coordinates={[
            {latitude: 37.8025259, longitude: -122.4351431},
            {latitude: 37.7896386, longitude: -122.421646},
          ]}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
}
