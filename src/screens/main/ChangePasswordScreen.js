import React,{useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import { showCurrentEmail } from '../../firebase/AuthModel';
import { changePassword } from '../../firebase/AuthModel';

const TurquoiseHeader = ({ navigation }) => {
  return (
    <View style={{ height: 80, backgroundColor: '#0ABAB5', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('../../assets/ovalBar.png')} style = {{bottom: '50%'}}  />

      <TouchableOpacity style={{ position: 'absolute', left: 15, top:25 }} onPress={() => { navigation.goBack(); }}>
        <IconAntDesign name="arrowleft" size={30} color="#ffffff" />
      </TouchableOpacity>

      <Text style={{ fontFamily: 'ZenOldMincho-Regular', fontSize: 32, color: '#FFFFFF',bottom:'200%' }}>Your Profile</Text>
    </View>
  );
};

const SecureEmail = ({ email2 }) => {
  const securePart = email2.substring(0, email2.indexOf('@')).replace(/./g, '*');
  const visiblePart = email2.substring(email2.indexOf('@'));
  const secureEmail = securePart + visiblePart;

  return <Text style={styles.profileButtonText}>{secureEmail}</Text>;
};

export const ChangePasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [email2, setEmail2] = useState('');
  const [oldPassword, setoldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    showCurrentEmail(
      (currentEmail) => setEmail2(currentEmail),
      (error) => console.log(error)
    );
  }, []);

  const success = () => {
    console.log('Password changed successfully');
    Alert.alert('Password changed successfully');
    navigation.goBack(); 
  };

  const unsuccess = (msg) => {
    console.log(msg);
    Alert.alert(msg);
  };

  const handleEmailPress = () => {
    console.log(`reveal email: ${email2}`);
  };

  const handleChangePassword = () => {
    if (!email || !oldPassword || !newPassword) {
      Alert.alert('Please provide email, current, and new passwords.');
      return;
    }
    changePassword(email, oldPassword, newPassword, success, unsuccess);
  };

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPasswordScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TurquoiseHeader
        navigation={navigation}
      />
      {/* Profile Button */}
      <TouchableOpacity style={styles.profileButton} onPress={handleEmailPress}>
      <SecureEmail email2={email2} />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="Email *"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.inputBox}
          placeholder="Old Password *"
          secureTextEntry = {true}
          value={oldPassword}
          onChangeText={(text) => setoldPassword(text)}
        />

        <TextInput
          style={styles.inputBox}
          placeholder="New Password *"
          secureTextEntry = {true}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />

        <TouchableOpacity style={styles.forgetButton} onPress={handleForgetPassword}>
          <Text style={{color:'gray'}}>Forget Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFA',
  },
  inputContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 0,
    marginTop:'3%'
  },
  inputBox: {
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: '8%'
  },
  button: {
    height: 50,
    backgroundColor: '#0ABAB5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginHorizontal: '14%'
  },
  buttonText: {
    fontFamily: 'ZenOldMincho-Bold', 
    color: '#fffffa', 
    fontSize: 16
  },
  forgetButton: {
    alignSelf: 'flex-end',
    marginBottom: 25,
    marginRight: '9%'
  },
  profileButton: {
    height:60,
    marginTop:'5%',
    marginHorizontal: '14%',
    paddingLeft:15,
    paddingVertical: 15,
    marginBottom: 0,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.75,
    elevation: 3,
  },
  profileButtonText: {
    fontSize: 14,
    fontFamily: 'ZenOldMincho-Bold'
  },
});
