import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {Like} from '../assets/Button/Like';
import {POST} from '../data/POST';
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const Comments = ({contents}) => {
  // console.log('writer : ', contents.writer);
  // console.log('contents.comments.user : ', contents.comments);
  return (
    <View style={{width: SLIDER_WIDTH, marginTop: 30}}>
      {contents.comments.map((value, index) => (
        <View
          style={{
            width: SLIDER_WIDTH,
            minHeight: 50,
            overflow: 'hidden',
            // borderBottomWidth: 1,
            // borderColor:'yellow',
            flexDirection: 'row',
          }}>
          {contents.writer != value.user ? (
            <Image
              style={{
                backgroundColor: 'gray',
                width: 30,
                height: 30,
                marginLeft: 25,
              }}
              borderRadius={30 / 2}
              // borderWidth={1}
            />
          ) : (
            <Like size={14} color={'#7E7E7E'} style={{marginLeft: 25}}></Like>
          )}
          <View
            style={{
              width: SLIDER_WIDTH * 0.68,
              // borderWidth: 1,
              marginLeft: 15,
              marginBottom: 23,
              flexDirection: 'row',
            }}>
            <Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  // borderWidth: 1,
                  alignSelf: 'flex-start',
                }}>
                {value.user}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  // borderWidth: 1,
                  alignSelf: 'flex-start',
                }}>
                {'  '}
                {value.comment}
              </Text>
            </Text>
          </View>
          {contents.writer != value.user ? (
            <Like style={{marginLeft: 15}} size={14} color={'#7E7E7E'}></Like>
          ) : (
            <Image
              style={{
                backgroundColor: 'gray',
                width: 30,
                height: 30,
                marginLeft: 15,
              }}
              borderRadius={30 / 2}
              // borderWidth={1}
            />
          )}
        </View>
      ))}
    </View>
  );
};
export default function QAScreen({bottomSheetModalRef}) {
  const [textValue, setTextValue] = useState('');
  const [textHeight, setTextHeiht] = useState(35);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  console.log('QAScreen Rendering');
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);
  // console.log('bottomSheetModalRef : ', this.bottomSheetModalRef);
  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.bottomSheetModalRef?.close();
          }}>
          <Image source={require('../assets/goback2.png')} />
        </TouchableOpacity>
        <Text style={styles.text}>QnA</Text>
      </View>
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
        style={styles.contentContainer}
        // automaticallyAdjustKeyboardInsets="true"
        alwaysBounceHorizontal ='false'
        // contentInsetAdjustmentBehavior='always'
        >
        <Comments contents={POST[0]} />
      </ScrollView>
      {/* <View style={{bottom:0,position: 'absolute', backgroundColor:'red', width:10,height:10}}/> */}
      {/* <View style={styles.textInputContainer}>
        <TextInput
          style={{
            height: Math.min(120, Math.max(35, textHeight)),
          }}
          onChangeText={value => setTextValue(value)}
          onContentSizeChange={event =>
            setTextHeiht(event.nativeEvent.contentSize.height)
          }
          value={textValue}
          multiline={true}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {top: 20},
  contentContainer: {
    
    width: SLIDER_WIDTH,
    height: '80%', // 675
    // borderWidth: 1,
    // borderColor: 'red',
    // top:30
    // backgroundColor:'red'
  },
  topBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT * 0.052, // 44
    // borderWidth: 1,
    // marginTop: SLIDER_HEIGHT * 0.018, // 15
  },
  button: {
    marginLeft: 20,
    width: 44,
    // borderWidth:1
  },
  text: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '600', // Semi Bold
    // borderWidth: 1,
  },
  textInputContainer: {
    position: 'absolute',
    alignSelf: 'center',
    borderWidth: 3,
    width: 280,
    height: 30,
    bottom: 0,
  },
});
