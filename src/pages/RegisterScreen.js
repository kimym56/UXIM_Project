import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
export default function RegisterScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isSelected, setSelection] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>회원가입</Text>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.labelText}>이메일</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="이메일"
            value={email}
            onChangeText={text => setEmail(text)}></TextInput>
        </View>
        <Text style={styles.labelText}>비밀번호</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="비밀번호"
            value={password}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}></TextInput>
        </View>
        <Text style={styles.labelText}>비밀번호 재확인</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="비밀번호 재확인"
            value={password2}
            secureTextEntry={true}
            onChangeText={text => setPassword2(text)}></TextInput>
        </View>
        <View style={styles.serviceContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 338,
            }}>
            <CheckBox
              // onFillColor="#434343"
              onTintColor="#434343"
              tintColor="#434343"
              boxType="square"
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={styles.serviceText1}>
              서비스 정보 수신에 동의합니다.
            </Text>
            <View style={{marginLeft: 'auto'}}>
              <TouchableOpacity>
                <Text style={styles.serviceText2}>내용 보기</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.serviceText3}>
              이용약관 및 개인정보 처리방침에 동의합니다.
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            props.navigation.navigate('Register2', {
              email: email,
              password: password,
            })
          }>
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
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
  logoContainer: {
    // borderWidth:1,
    justifyContent: 'center',
    // alignSelf: 'center',
    paddingLeft: 26,
    marginTop: 40,
  },
  logo: {
    fontWeight: '600',
    fontSize: 24,
    color: 'black',
  },
  labelText: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 3,
    marginTop: 8,
    padding: 12,
    width: 338,
    height: 42,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  serviceContainer: {
    flexDirection: 'column',
    marginTop: 22,
    // borderWidth:1
  },
  checkbox: {
    alignSelf: 'center',
    // borderWidth: 1,
    width: 18,
    height: 18,
  },
  serviceText1: {
    marginLeft: 6,
    fontSize: 12,
    color: '#7E7E7E',
    fontWeight: '600',
  },
  serviceText2: {
    fontWeight: '500',
    fontSize: 12,
    textDecorationLine: 'underline',
    color: '#7E7E7E',
  },
  serviceText3: {
    marginTop: 10,
    textDecorationLine: 'underline',
    fontWeight: '500',
    fontSize: 12,
    color: '#7E7E7E',
  },
  mainContainer: {
    marginTop: 20,
    // borderWidth: 1,
    alignSelf: 'center',
    // alignItems: 'center',
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
  subLabelText: {
    fontWeight: '500',
    fontSize: 15,
    color: '#BCBCBC',
  },
});
