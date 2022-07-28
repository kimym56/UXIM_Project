import React, {useEffect, useState} from 'react';
import {Image, View, Text, StyleSheet, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Story from './Story.js';
import Carousel from 'react-native-snap-carousel';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.89);
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.758);
const DATA = [1, 2, 3];
var routeList = [];
import {db, storage} from '../../firebase/firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  GeoPoint,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore/lite';
import LandingScreen from './LandingScreen'
const routesCol = collection(db, 'Route');
// const routeSnapshot = getDocs(routesCol).then(ret => {
//   console.log('getDocs')
//   routeList = ret.docs.map(doc => {
//     DATA.push(doc.data())
//     return doc.data()});

// }).catch(err => {
//   console.log('error in HomeScreen:',err);
// });
export default function Homescreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getDocs(routesCol)
      .then(ret => {
        console.log('getDocs');
        routeList = ret.docs.map(doc => {
            DATA.push(doc.data());
            return doc.data();
        });
        routeList.sort(() => Math.random() - 0.5);
      })
      .catch(err => {
        console.log('error in HomeScreen:', err);
      });
    setTimeout(() => setIsLoading(true), 5000);
  }, []);
  const _renderItem = ({item, index}) => {
    console.log('render : ', index, '\nitem : ', item);
    return (
      <View style={styles.story}>
        <Story navigation={props.navigation} data={routeList[index]} />
      </View>
    );
  };
  const onSnap = index => {
    // setGPS(assets.markers[index].coordinate);
    // setIndex(index);
  };
  goNav = destination => {
    props.navigation.navigate(destination);
  };
  if (!isLoading)
    return (
      <LandingScreen/>
    );
  else
    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <BottomSheetModalProvider>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                console.log('DATA : ', DATA);
                console.log('routeList : ', routeList);
                // getDocs(routesCol).then(ret => {
                //   const routeList = ret.docs.map(doc => doc.data());
                //   console.log('routeList : ', routeList);
                // });
              }}>
              <Image
                source={require('../assets/Icon_Alarm.png')}
                style={{width: 44, height: 44}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Image source={require('../assets/LOGO.png')} />
            </TouchableOpacity>
            <Image
              source={require('../assets/Icon_Search.png')}
              style={{width: 44, height: 44}}
            />
          </View>
          <View>
            <Carousel
              // layout={'stack'}
              // layoutCardOffset={12}
              ref={c => (this.carousel = c)}
              data={routeList}
              renderItem={_renderItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              containerCustomStyle={styles.carouselContainer}
              inactiveSlideShift={0}
              onSnapToItem={index => {
                onSnap(index);
              }}
              useScrollView={true}
            />
          </View>
        </BottomSheetModalProvider>
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 48,
    paddingRight: 48,
    backgroundColor: 'white',
  },
  story: {
    // backgroundColor:'red',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
