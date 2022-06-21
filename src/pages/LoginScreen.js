import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {authentication} from '../../firebase/firebase-config';
export default function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const LoginUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then(userCredential => {
        // Signed in
        // const user = userCredential.user;
        // ...
        props.navigation.goBack();
      })
      .catch(error => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <SafeAreaView>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>LOGO</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.labelContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}></TextInput>
        </View>
        <View style={styles.labelContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}></TextInput>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={LoginUser}>
          <Text style={styles.buttonText}>Login</Text>
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
  logo: {
    fontWeight: '600',
    fontSize: 70,
    color: '#7AB970',
  },
  labelContainer: {
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 3,
    marginTop: 10,
    padding: 12,
    width: 240,
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
    backgroundColor: '#D5D5D5',
    width: 240,
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
    color: '#BCBCBC',
  },
});
