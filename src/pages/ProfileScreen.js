import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = Dimensions.get('window').height;

const assets = require('../assets/assets.js');
const DATA = [];
for (let i = 0; i < 13; i++) {
  DATA.push({
    index: i,
    uri: '/Users/kimyoungmin/UXIM_Project/src/assets/IMG_' + i + '.jpeg',
    name: i,
    item: assets.assetsObject[i],
  });
}

export default function ProfileScreen(props) {
  console.log('Profile rendering');
  console.log('props:',props)
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={styles.topBarcontainer}>
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
        {/* <Image source={require('../assets/LOGO.png')} /> */}
        <TouchableOpacity onPress={() => {props.navigation.navigate('Setting')}}>
          <Image
            source={require('../assets/Horizontal_More.png')}
            style={{width: 44, height: 44}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.topContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{
              width: 96,
              height: 96,
              borderRadius: 96 / 2,
              left: 48,
              marginTop: 28,
            }}
            source={require('../assets/IMG_0638.jpeg')}
          />
          <View style={styles.textContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.textSemiBold}>김용민</Text>
                <Text style={styles.textNormal}>@kimym56</Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <Text style={styles.textSemiBold}>5</Text>
                <Text style={styles.textNormal}>여행</Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <Text style={styles.textSemiBold}>26</Text>
                <Text style={styles.textNormal}>구독자</Text>
              </View>
            </View>
            <View style={{top: 20}}>
              <Text style={{fontWeight: '500', fontSize: 10, lineHeight: 12}}>
                안녕하세요
                {'\n'}
                Yonsei Univ Computer Science 18
                {'\n'}
                UXIM 7th
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: 64,
            height: 24,
            borderRadius: 5,
            left: 64,
            top: 22,
            backgroundColor: '#EBEBEB',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <View>
              <Text style={{fontWeight: '600', fontSize: 10, lineHeight: 12}}>
                구독하기
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{height: '68%'}}>
        <FlatList
          data={DATA}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                // margin: 1,
              }}>
              <ContextMenu
                actions={[
                  {title: '나만보기'},
                  {title: '편집하기'},
                  {title: '삭제하기'},
                ]}
                onPress={e => {
                  console.warn(
                    `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`,
                  );
                }}>
                <Image
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: SLIDER_WIDTH / 3,
                    width: SLIDER_WIDTH / 3,
                  }}
                  source={DATA[index].item}
                />
              </ContextMenu>
            </View>
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  topBarcontainer: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  topContainer: {
    backgroundColor: 'white',
    height: 200,
    flexDirection: 'column',
    // borderWidth: 1,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 178 - 96,
    top: 46,
    width: 180,
    height: 90,
    // justifyContent: 'space-between',
    // borderWidth: 1,
  },
  textSemiBold: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 18,
  },
  textNormal: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
    color: '#7E7E7E',
  },
});
