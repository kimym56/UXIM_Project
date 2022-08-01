import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {authentication} from '../../firebase/firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const LoginUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then(userCredential => {
        // Signed in
        // const user = userCredential.user;
        // ...
        AsyncStorage.setItem('session', email);
      })
      .then(() => props.navigation.navigate('Stack'))
      .catch(error => {
        console.log('error in LoginScreen:', error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
      <View style={styles.logoContainer}>
        <Text style={styles.subLogo}>"세계를 내 품에"</Text>
        <Text style={styles.logo}>HuG</Text>
        <Image
          style={{width: 144, height: 144}}
          source={require('../assets/UXIM_icon-05.png')}
        />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.labelContainer}>
          <TextInput
            placeholder="이메일"
            value={email}
            onChangeText={text => setEmail(text)}></TextInput>
        </View>
        <View style={styles.labelContainer}>
          <TextInput
            placeholder="비밀번호"
            value={password}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}></TextInput>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={LoginUser}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 14}}>
          <TouchableOpacity>
            <Text style={styles.subLabelText}>비밀번호 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.subLabelText}>
            {'  '}|{'  '}
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Register')}>
            <Text style={styles.subLabelText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 180,
  },
  subLogo : {
    fontWeight: '600',
    fontSize: 20,

    color: 'rgba(123, 81, 0, 0.5)',
  },
  logo: {
    fontWeight: '600',
    fontSize: 70,
    color: '#D29A46',
  },
  labelContainer: {
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 3,
    marginTop: 10,
    padding: 12,
    width: 338,
    height: 42,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    marginTop: 40,
    // borderWidth: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#434343',
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
  subLabelText: {
    fontWeight: '500',
    fontSize: 15,
    color: '#434343',
  },
});
