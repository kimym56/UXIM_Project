import React, {Component, useState, useEffect} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,SafeAreaView
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import {db, storage} from '../../firebase/firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  GeoPoint,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore/lite';
import Geocoder from 'react-native-geocoding';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';

Geocoder.init('AIzaSyAIEOOAcL44fsau394qnzogwV2CDYwym1s', {language: 'en'});

export function pickMultiple(props) {
  ImagePicker.openPicker({
    multiple: true,
    waitAnimationEnd: false,
    sortOrder: 'asc',
    includeExif: true,
    forceJpg: true,
    maxFiles:10,
  })
    .then(images => {
      // console.log('images : ', images);
      const temp = images.map(i => {
        console.log('received exif', i.exif['{TIFF}']);
        return {
          uri: i.path,
          width: i.width,
          height: i.height,
          mime: i.mime,
          gps: i.exif['{GPS}'],
          DateTime : i.exif['{TIFF}'].DateTime
        };
      });
      // setImageState({
      //   images: temp,
      // });
      return temp.sort((a,b)=>a.DateTime > b.DateTime);
    })
    .then(ret => {
      // console.log('ret : ', ret),
        props.navigation.navigate('Edit', {images: ret});
    })
    .catch(e => console.log('alert:',e));
};


export default function AddScreen(props) {
  useEffect(() => {
    // pickMultiple();
  });
  console.log('props : ', props);
  const [imageState, setImageState] = useState({images: null});
  const [progress, setProgress] = useState(0);
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
    // const promises = [];
    //   promises.push(uploadTask);
    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //         const prog = Math.round(
    //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //         );
    //         // setProgress(prog);
    //     },
    //     (error) => console.log(error),
    //     async () => {
    //         await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
    //             // setURLs(prevState => [...prevState, downloadURLs])
    //             // console.log("File available at", downloadURLs);
    //         });
    //     }
    // );
    // const img = await fetch(uri);
    // const bytes =  await img.blob();
    // console.log('bytes : ',bytes)
    // await uploadBytes(ref, bytes); //upload images
    /////////////////////////////////////////////////////////////////////////////////
    // Promise.all(promises)
    // .then(() => alert("All images uploaded"))
    // .catch((err) => console.log(err));

    // const uri = imageState.image.uri;
    // const filename = uri.substring(uri.lastIndexOf('/') + 1);
    // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    // // setUploading(true);
    // // setTransferred(0);
    // console.log('filename : ', filename);
    // console.log('url : ', uploadUri);

    // const storageRef = ref(storage, `images/${filename}`);
    // // const uploadTask = uploadBytesResumable(storageRef, uri);

    // const img = await fetch(uri);
    // const bytes = await img.blob();
    // await uploadBytes(ref, bytes); //upload images

    // uploadTask.on(
    //   'state_changed',
    //   snapshot => {
    //     const prog = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
    //     );
    //     setProgress(prog);
    //   },
    //   err => console.log(err),
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then(url => console.log(url));
    //   },
    // );

    // storageRef.putFile(uploadUri).on(
    //   storage.TaskEvent.STATE_CHANGED,
    //   snapshot => {
    //     console.log('snapshot: ' + snapshot.state);
    //     console.log(
    //       'progress: ' +
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
    //     );

    //     if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
    //       console.log('Success');
    //     }
    //   },
    //   error => {
    //     unsubscribe();
    //     console.log('image upload error: ' + error.toString());
    //   },
    //   () => {
    //     storageRef.getDownloadURL().then(downloadUrl => {
    //       console.log('File available at: ' + downloadUrl);
    //     });
    //   },
    // );

    // try {
    //   await task;
    // } catch (e) {
    //   console.error(e);
    // }
    // setUploading(false);
    // Alert.alert(
    //   'Photo uploaded!',
    //   'Your photo has been uploaded to Firebase Cloud Storage!',
    // );
    // setImage(null);
  };
  const addData = async () => {
    const collectionRef = collection(db, 'Route');
    const docRef = await addDoc(collectionRef, {
      date: new Date(),
      images: new Array(),
      like: 0,
      private: false,
      tag: [],
      title: 'defaultTitle',
      writer: 'defaultWriter',
    });
    const colRef = collection(docRef, 'chat_log');
    await addDoc(colRef, {
      comment: 'defaultComment',
      date: new Date(),
      like: 0,
      writer: 'defaultWriter',
    });

    imageState.images.map((item, index) => {
      console.log('index in AddScreen: ', index);
      uploadImage(item)
        .then(imageUri => {
          console.log('imageUri : ', imageUri);
          getFullAddress(item).then(res => {
            updateDoc(docRef, {
              images: arrayUnion({
                geo: new GeoPoint(item.gps.Latitude, item.gps.Longitude),
                geocoding: res.results[0].formatted_address,
                uri: imageUri,
              }),
            });
          });
        })
        .then(() => alert('All images uploaded'))
        .catch(err => {
          console.log('error in AddScreen:',err);
        });
    });
  };

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  // const pickSingle = (cropit, circular = false, mediaType) => {
  //   ImagePicker.openPicker({
  //     cropping: cropit,
  //     cropperCircleOverlay: circular,
  //     sortOrder: 'none',
  //     compressImageMaxWidth: 1000,
  //     compressImageMaxHeight: 1000,
  //     compressImageQuality: 1,
  //     compressVideoPreset: 'MediumQuality',
  //     includeExif: true,
  //     cropperStatusBarColor: 'white',
  //     cropperToolbarColor: 'white',
  //     cropperActiveWidgetColor: 'white',
  //     cropperToolbarWidgetColor: '#3498DB',
  //   })
  //     .then(image => {
  //       console.log('received image', image);

  //       setImageState({
  //         images: {
  //           uri: image.path,
  //           width: image.width,
  //           height: image.height,
  //           mime: image.mime,
  //         },
  //       });
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       Alert.alert(e.message ? e.message : e);
  //     });
  // };

  const pickMultiple = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      // sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    })
      .then(images => {
        console.log('images : ', images);
        const temp = images.map(i => {
          console.log('received exif', i.exif['{GPS}']);
          return {
            uri: i.path,
            width: i.width,
            height: i.height,
            mime: i.mime,
            gps: i.exif['{GPS}'],
          };
        });
        setImageState({
          images: temp,
        });
        return temp;
      })
      .then(ret => {
        console.log('ret : ', ret),
          props.navigation.navigate('Edit', {images: ret});
      })
      .catch(e => alert(e));
  };

  // const scaledHeight = (oldW, oldH, newW) => {
  //   return (oldH / oldW) * newW;
  // };

  const renderImage = image => {
    return (
      <Image
        style={{width: 300, height: 300, resizeMode: 'contain'}}
        source={image}
      />
    );
  };

  const renderAsset = image => {
    // if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
    //   return this.renderVideo(image);
    // }

    return renderImage(image);
  };
  // const cropLast = () => {
  //   if (!image) {
  //     return Alert.alert(
  //       'No image',
  //       'Before open cropping only, please select image',
  //     );
  //   }

  //   ImagePicker.openCropper({
  //     path: image.uri,
  //     width: 300,
  //     height: 400,
  //   })
  //     .then(image => {
  //       console.log('received cropped image', image);
  //       this.setState({
  //         image: {
  //           uri: image.path,
  //           width: image.width,
  //           height: image.height,
  //           mime: image.mime,
  //         },
  //         images: null,
  //       });
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       Alert.alert(e.message ? e.message : e);
  //     });
  // };
  // console.log('img : ', imageState);
  return (
    <SafeAreaView style={styles.container}>
      
      {imageState ? (
        <ScrollView>
          {imageState.image ? renderAsset(imageState.image) : null}
          {imageState.images
            ? imageState.images.map(i => (
                <View key={i.uri}>{renderAsset(i)}</View>
              ))
            : null}
        </ScrollView>
      ) : (
        <Image
          source={require('../assets/loading2.png')}
          style={{width: 40, height: 40}}
        />
      )}

      {/* <TouchableOpacity onPress={() => pickSingle(false)} style={styles.button}>
        <Text style={styles.text}>Select Single</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={pickMultiple.bind(this)} style={styles.button}>
        <Text style={styles.text}>Select Multiple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => getData()}>
        <Text style={styles.text}>Get data</Text>
      </TouchableOpacity>

       */}
      {/* <TouchableOpacity onPress={() => cropLast()} style={styles.button}>
        <Text style={styles.text}>Crop Last Selected Image</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        onPress={() => {
          console.log('imageState : ', imageState.images);
        }}
        style={styles.button}>
        <Text style={styles.text}>state check</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Edit', {images: imageState.images})
        }
        style={styles.button}>
        <Text style={styles.text}>navigate</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
});

// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       image: null,
//       images: null,
//     };
//   }

// pickSingleWithCamera(cropping, mediaType = 'photo') {
//   ImagePicker.openCamera({
//     cropping: cropping,
//     width: 500,
//     height: 500,
//     includeExif: true,
//     mediaType,
//   })
//     .then((image) => {
//       console.log('received image', image);
//       this.setState({
//         image: {
//           uri: image.path,
//           width: image.width,
//           height: image.height,
//           mime: image.mime,
//         },
//         images: null,
//       });
//     })
//     .catch((e) => alert(e));
// }

// cropLast() {
//   if (!this.state.image) {
//     return Alert.alert(
//       'No image',
//       'Before open cropping only, please select image'
//     );
//   }

//   ImagePicker.openCropper({
//     path: this.state.image.uri,
//     width: 300,
//     height: 400,
//   })
//     .then((image) => {
//       console.log('received cropped image', image);
//       this.setState({
//         image: {
//           uri: image.path,
//           width: image.width,
//           height: image.height,
//           mime: image.mime,
//         },
//         images: null,
//       });
//     })
//     .catch((e) => {
//       console.log(e);
//       Alert.alert(e.message ? e.message : e);
//     });
// }
// uploadImage(image) {
//   if (image.uri) {
//     const fileExtension = image.uri.split('.').pop();
//     console.log('EXT: ' + fileExtension);

//     var uuid = uuidv4();

//     const fileName = `${uuid}.${fileExtension}`;
//     var storageRef = firebase.storage().ref(`images/${fileName}`);

//     storageRef.putFile(image.uri).on(
//       firebase.storage.TaskEvent.STATE_CHANGED,
//       snapshot => {
//         console.log('snapshot: ' + snapshot.state);
//         console.log(
//           'progress: ' +
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
//         );

//         if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
//           console.log('Success');
//         }
//       },
//       error => {
//         unsubscribe();
//         console.log('image upload error: ' + error.toString());
//       },
//       () => {
//         storageRef.getDownloadURL().then(downloadUrl => {
//           console.log('File available at: ' + downloadUrl);

//           image.image = downloadUrl;

//           delete image.uri;
//         });
//       },
//     );
//   }
// }

//   render() {
//     return (

//         {/* <TouchableOpacity
//           onPress={() => this.pickSingleWithCamera(false)}
//           style={styles.button}
//         >
//           <Text style={styles.text}>Select Single Image With Camera</Text>
//         </TouchableOpacity> */}
//         {/* <TouchableOpacity
//           onPress={() =>
//             this.pickSingleWithCamera(false, (mediaType = 'video'))
//           }
//           style={styles.button}
//         >
//           <Text style={styles.text}>Select Single Video With Camera</Text>
//         </TouchableOpacity> */}
//         {/* <TouchableOpacity
//           onPress={() => this.pickSingleWithCamera(true)}
//           style={styles.button}
//         >
//           <Text style={styles.text}>
//             Select Single With Camera With Cropping
//           </Text>
//         </TouchableOpacity> */}

//         {/* <TouchableOpacity
//           onPress={() => this.pickSingleBase64(false)}
//           style={styles.button}
//         >
//           <Text style={styles.text}>Select Single Returning Base64</Text>
//         </TouchableOpacity> */}
//         {/* <TouchableOpacity
//           onPress={() => this.pickSingle(true)}
//           style={styles.button}
//         >
//           <Text style={styles.text}>Select Single With Cropping</Text>
//         </TouchableOpacity> */}
//         {/* <TouchableOpacity
//           onPress={() => this.pickSingle(true, true)}
//           style={styles.button}
//         >
//           <Text style={styles.text}>Select Single With Circular Cropping</Text>
//         </TouchableOpacity> */}

//         {/* <TouchableOpacity
//           onPress={this.cleanupImages.bind(this)}
//           style={styles.button}
//         >
//           <Text style={styles.text}>Cleanup All Images</Text>
//         </TouchableOpacity> */}

//     );
//   }
// }
