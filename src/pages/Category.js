import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default function Category(props) {
  return (
    <View style={styles.container}>
      <View style={{flex: 2}}>
        <Image source={props.imageUri} style={styles.image} />
      </View>
      <View style={{flex:1,paddingLeft:10,paddingTop:10}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 130,
    marginLeft: 20,
    borderWidth: 0.5,
    borderColor: '#dddddd',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
