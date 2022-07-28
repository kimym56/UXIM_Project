import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {authentication} from '../../firebase/firebase-config';
export default function RegisterScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const RegisterUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then(re => {
        console.log('RegisterUser re : ', re);
        props.navigation.goBack()
      })
      .catch(re => {
        console.log('error in RegisterScreen:',re);
      });
  };
  return (
    <SafeAreaView>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>회원가입</Text>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.labelText}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}></TextInput>
        </View>
        <Text style={styles.labelText}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}></TextInput>
        </View>
        <Text style={styles.labelText}>Repeat Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Repeat Password"
            value={password2}
            secureTextEntry={true}
            onChangeText={text => setPassword2(text)}></TextInput>
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={RegisterUser}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        {/* <View style={{flexDirection: 'row', marginTop: 14}}>
          <TouchableOpacity>
            <Text style={styles.subLabelText}>비밀번호 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.subLabelText}>
            {'  '}|{'  '}
          </Text>
          <TouchableOpacity>
            <Text style={styles.subLabelText}>회원가입</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    // alignSelf: 'center',
    marginLeft: 72,
    marginTop: 64,
  },
  logo: {
    fontWeight: '600',
    fontSize: 24,
    color: 'black',
  },
  labelText: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 3,
    marginTop: 8,
    padding: 12,
    width: 240,
    height: 42,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    marginTop: 20,
    // borderWidth: 1,
    alignSelf: 'center',
    // alignItems: 'center',
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
