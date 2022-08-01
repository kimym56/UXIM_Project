import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {authentication} from '../../firebase/firebase-config';
import {db} from '../../firebase/firebase-config';
import {collection, addDoc} from 'firebase/firestore/lite';
export default function RegisterProfileScreen(props) {
  const [email, setEmail] = useState(props.route.params.email);
  const [password, setPassword] = useState(props.route.params.password);
  const [nickname, setNickname] = useState();
  const collectionRef = collection(db, 'Users');

  const RegisterUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then(re => {
        addDoc(collectionRef, {
          id: re.user.email,
          profile: '',
          nickname: nickname,
        });
        console.log('RegisterUser re : ', re.user.email);
      })
      .then(ret => {
        props.navigation.navigate('Stack');
      })
      .catch(re => {
        console.log('error in RegisterScreen:', re);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={{width: 30, height: 30}}
          onPress={() => props.navigation.goBack()}>
          <Image
            source={require('../assets/Icon_Undo_black.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <TouchableOpacity>
          <Image
            style={{width: 164, height: 164, alignSelf: 'center'}}
            source={require('../assets/defaultProfile.png')}></Image>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="프로필 닉네임을 입력해주세요"
            value={nickname}
            onChangeText={text => setNickname(text)}></TextInput>
          <TouchableOpacity onPress={()=>setNickname()}>
            <Image
              source={require('../assets/Icon_delete.png')}
              style={{width: 44, height: 44}}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={RegisterUser}>
          <Text style={styles.buttonText}>가입 완료</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    marginTop: 12, //  58
    paddingHorizontal: 25,
    // borderWidth:1,
    flexDirection: 'row',
    // backgroundColor: 'rgba(100,100,100,0.15)',
    // justifyContent: 'center',
    // alignItems:'center',
    // position: 'absolute',
    // height: 44,
    width: 390,
    // margin: 14,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // // borderWidth:1,
    // // backgroundColor:'black'
  },
  mainContainer: {
    marginTop: 60,
    alignSelf: 'center',
    // borderWidth:1
  },
  inputContainer: {
    justifyContent:'space-between',
    flexDirection: 'row',
    marginTop: 56,
    borderBottomWidth: 1,
    // paddingVertical: 11,
    paddingLeft:11,
    borderColor: '#7E7E7E',
    
  },

  buttonContainer: {
    backgroundColor: '#D5D5D5',
    width: 338,
    height: 42,
    marginTop: 24,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 15,
    color: 'white',
  },
});
