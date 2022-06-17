import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;

export default function SettingScreen(props) {
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={styles.topBar}>
        <View style={{position: 'absolute', left: 20}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Image
              source={require('../assets/Icon_Undo.png')}
              style={{width: 44, height: 44}}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.textSemiBold}>SettingScreen</Text>
        </View>
      </View>
      <View style={styles.contents}>
        <TouchableOpacity style={styles.touchableContents}>
          <Text style={styles.textNormal}>개인정보변경</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contents}>
        <TouchableOpacity style={styles.touchableContents}>
          <Text style={styles.textNormal}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contents}>
        <TouchableOpacity style={styles.touchableContents}>
          <Text style={styles.textNormal}>회원 탈퇴</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contents}>
        <TouchableOpacity style={styles.touchableContents}>
          <Text style={styles.textNormal}>서비스 정책</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    // width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT * 0.142,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    backgroundColor: '#F2F2F2',
  },
  contents: {
    // borderWidth: 1,
    height: 75,
  },
  touchableContents: {
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    // top: SLIDER_HEIGHT * 0.069, //  58
    // left: SLIDER_WIDTH * 0.051, //  20
    height: 44,
    width: 44,
    // borderWidth: 1,
  },
  textNormal: {
    marginLeft: 40,
    fontWeight: '500',
    fontSize: 18,
  },
  textSemiBold:{
    fontWeight:'600',
    fontSize:18
  }
});
