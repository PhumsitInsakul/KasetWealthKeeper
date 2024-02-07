import React,{useState} from 'react';
import {View, Text, Alert,TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthInput } from './AuthInput';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import { resetPassword } from '../../firebase/AuthModel';

const TurquoiseHeader = ({ navigation }) => {
  return (
    <View style={{ height: 80, backgroundColor: '#0ABAB5', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('../../assets/ovalBar.png')} style = {{bottom: '50%'}}  />

      <TouchableOpacity style={{ position: 'absolute', left: 15, top:'40%' }} onPress={() => { navigation.goBack(); }}>
        <IconAntDesign name="arrowleft" size={30} color="#ffffff" />
      </TouchableOpacity>
      
      <Text style={{ fontFamily: 'ZenOldMincho-Regular', fontSize: 32, color: '#FFFFFF',bottom:'200%' }}>Forget Password</Text>
    </View>
  );
};

export const ForgetPasswordScreen = ({navigation}) => {
  const [email,setEmail] = useState('')

  const success = (msg) => {
    Alert.alert(msg)
    navigation.goBack(); 
  }

  const unsuccess = (msg) => {
    console.log(msg)
    Alert.alert(msg)
  }

  function onSendPress() {
    console.log(`Send email to ${email}`)
    success(`Send email to ${email}`)
    resetPassword(email, success, unsuccess)
  }

  return (
    <SafeAreaView style={styles.container}>
      <TurquoiseHeader 
      navigation={navigation} 
      />
        <View style={{ flex: 1, marginTop:'22%' }}>
          <Text style={{ fontFamily: 'ZenOldMincho-Bold', color: '#666666', fontSize: 14, marginLeft: 35 }}>
            Enter the email address associated with{'\n'}
            your account and we'll send you a link to{'\n'}
            reset your password.
          </Text>

          <AuthInput placeholder='Email *' secureTextEntry={false} value={email} onChangeText={(text) => setEmail(text)} />

          <TouchableOpacity style={{ height: 50, borderRadius: 16, backgroundColor: '#0ABAB5', 
          justifyContent: 'center', alignItems: 'center', marginHorizontal: '14%'}}
            onPress={onSendPress}
          >

            <Text style={{ fontFamily: 'ZenOldMincho-Bold', color: '#fffffa', fontSize: 16 }}>SUBMIT</Text>
          </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFA',
  },
});