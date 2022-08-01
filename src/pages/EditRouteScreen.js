import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress';
import MapView, {PROVIDER_GOOGLE,Marker, Polyline} from 'react-native-maps';
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.494);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const DATA = [];
import {db, storage} from '../../firebase/firebase-config';
import {
  collection,
  addDoc,
  GeoPoint,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore/lite';
import {ref, uploadBytesResumable} from 'firebase/storage';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditRouteScreen(props) {
  const images = props.route.params.images;
  const DATA = images;

  // console.log('img in route : ', images[0].uri);
  const [text, onChangeText] = useState('');
  const [stateIndex, setIndex] = useState(0);
  const userToken = AsyncStorage.getItem('session')
  const _renderItem = ({item, index}) => {
    // console.log('DATA : ', images[0].uri);
    // return <Category imageUri={"https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg"}/>;
    return (
      <View style={styles.itemContainer}>
        {/* <Text style={styles.itemLabel}>{`Item ${item.index}`}</Text> */}
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => {
            props.navigation.navigate('Edit', {
              data: images[index],
              coordinates: coordinates,
            });
          }}>
          <Image
            style={{width: '100%', height: '100%', borderRadius: 17}}
            source={images[index]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const setMapReady = () => {
    var markers = images.map(item => {
      return {
        latitude: item.gps.Latitude,
        longitude: item.gps.Longitude,
      };
    });

    console.log('mapReady : ', markers);
    this.map.fitToCoordinates(markers, {
      edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
    });
  };
  const onSnap = index => {
    this.map.animateToRegion({
      latitude: images[index].gps.Latitude,
      longitude: images[index].gps.Longitude,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    });

    // setGPS(assets.markers[index].coordinate);
    setIndex(index);
  };
  const getFullAddress = item => {
    return Geocoder.from({
      latitude: item.gps.Latitude,
      longitude: item.gps.Longitude,
    });
  };
  const uploadImage = async item => {
    const uri = item.uri;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `images/${filename}`);

    const img = await fetch(uri);
    const bytes = await img.blob();
    const uploadTask = await uploadBytesResumable(storageRef, bytes);
    return storageRef._location.path_;
  };
  const addData = async () => {
    const collectionRef = collection(db, 'Route');
    const docRef = await addDoc(collectionRef, {
      date: new Date(),
      images: new Array(),
      like: 0,
      private: false,
      tag: [],
      title: text,
      writer: 'default',
    });
    const colRef = collection(docRef, 'chat_log');
    await addDoc(colRef, {
      comment: 'default',
      date: new Date(),
      like: 0,
      writer: 'default',
    });

    images.map((item, index) => {
      console.log('index in EditRouteScreen: ',item, index);
      uploadImage(item)
        .then(imageUri => {
          console.log('imageUri : ', imageUri);
          getFullAddress(item).then(res => {
            console.log('geoc : ', res.results[0].formatted_address)
            updateDoc(docRef, {
              images: arrayUnion({
                geo: new GeoPoint(item.gps.Latitude, item.gps.Longitude),
                geocoding: res.results[0].formatted_address,
                uri: imageUri.split('.')[0] + '_1200x1600.jpeg',
              }),
            });
          });
        })
        .then(()=>{})
        .catch(err => {
          console.log('error in EditRouteScreen:', err);
        });
    });
    props.navigation.navigate('Stack');
    // .then(() => )
    // .catch(err => {
    //   console.log('error in EditRouteScreen2:', err);
    // });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={{width: 44, height: 44}}
          onPress={() => props.navigation.goBack()}>
          <Image source={require('../assets/goback2.png')} />
        </TouchableOpacity>
        <Text style={{fontWeight: '600', fontSize: 15}}>여행 경로 확인</Text>
        <TouchableOpacity
          style={{width: 44, height: 44}}
          onPress={() => {
            addData();
          }}>
          <Image
            source={require('../assets/Icon_Redo.png')}
            style={{width: 44, height: 44}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{
            fontWeight: '600',
            fontSize: 16,
            placeholderTextColor: '#BCBCBC',
          }}
          onChangeText={onChangeText}
          value={text}
          placeholder="여행의 제목을 입력해주세요."
        />
      </View>
      <MapView
        // provider={PROVIDER_GOOGLE}
        ref={ref => {
          this.map = ref;
        }}
        style={styles.map}
        onMapReady={setMapReady}
        initialRegion={{
          latitude: images[0].gps.Latitude,
          longitude: images[0].gps.Longitude,
        }}>
        {images.map((marker, index) => {
          // console.log('marker : ', marker);
          // console.log('marker2 : ', assets.markers[index].coordinate);

          return (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.gps.Latitude,
                longitude: marker.gps.Longitude,
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
         <Polyline
          coordinates={images.map(item => {
            return {
              latitude: item.gps.Latitude,
              longitude: item.gps.Longitude,
            };
          })}
          strokeColor="#C3AD98" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={5}
        />
      </MapView>
      <View //Carousel Container
        style={styles.carouselContainer}>
        <Carousel
          ref={c => (this.carousel = c)}
          data={images}
          renderItem={_renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          onSnapToItem={index => {
            onSnap(index);
          }}
          useScrollView={true}
        />
      </View>
      <Progress.Bar
        style={{marginTop: 28, alignSelf: 'center'}} // 25
        progress={(stateIndex + 1) / images.length}
        height={4}
        width={SLIDER_WIDTH * 0.8} //312
        color="black"
        backgroundColor="rgba(0,0,0,0.2)"
        borderWidth={0}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    height: '100%',
  },
  topBar: {
    marginTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    // position: 'absolute',
    width: SLIDER_WIDTH,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
  },
  inputContainer: {
    marginTop: 46,
    marginLeft: 40,
    height: 35,
    width: 312,
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    marginTop: 26,
    width: SLIDER_WIDTH,
    height: SLIDER_WIDTH,
  },
  carouselContainer: {
    // borderWidth: 1,

    marginTop: 26,
    // height: 160, // 292
  },
  itemContainer: {
    // top: SLIDER_HEIGHT * 0.018, //  15
    // bottom: SLIDER_HEIGHT * 0.005, // 9
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
});
