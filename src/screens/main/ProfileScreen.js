import React,{useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import { showCurrentEmail } from '../../firebase/AuthModel';
import { signOut } from '../../firebase/AuthModel';

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

const SecureEmail = ({ email }) => {
  const securePart = email.substring(0, email.indexOf('@')).replace(/./g, '*');
  const visiblePart = email.substring(email.indexOf('@'));
  const secureEmail = securePart + visiblePart;

  return <Text style={styles.buttonText}>{secureEmail}</Text>;
};

export const ProfileScreen = ({ navigation }) => {
  const [email,setEmail] = useState('');

  useEffect(() => {
    showCurrentEmail(
      (currentEmail) => setEmail(currentEmail),
      (error) => console.log(error)
    );
  }, []);

  const handleEmailPress = () => {
    console.log(`reveal email: ${email}`);
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  const handleLogOut = () => {
    signOut();
    navigation.navigate('SplashScreen');
  };

  const handleChatBot = () => {

  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFA' }}>
      <TurquoiseHeader
        navigation={navigation}
      />
      {/* Profile Button */}
      <TouchableOpacity style={styles.button} onPress={handleEmailPress}>
      <SecureEmail email={email} />
      </TouchableOpacity>

      {/* Chat-Bot Button */}
      <TouchableOpacity style={styles.button} onPress={handleChatBot}>
        <Text style={styles.chatbotText}>CHAT-BOT AI (BETA)</Text>
      </TouchableOpacity>

      {/* Account Button */}
      <Text style={{marginLeft:'15%', fontFamily: 'ZenOldMincho-Bold',fontWeight:'bold'}}>Account</Text>

      {/* Change Password Button */}
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logOutButton} onPress={handleLogOut}>
        <Text style={styles.logOutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  button: {
    height:60,
    marginTop:'5%',
    marginHorizontal: '14%',
    paddingLeft:15,
    paddingVertical: 15,
    marginBottom: 15,
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
  buttonText: {
    fontSize: 14,
    fontFamily: 'ZenOldMincho-Bold',
    paddingTop:'2%'
  },
  logOutButton: {
    alignItems: 'center',
  },
  logOutText: {
    color: 'lightgray',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16, 
    fontWeight: 'bold', 
    borderBottomColor: 'lightgray', 
    borderBottomWidth: 1, 
  },
  chatbotText: {
    fontSize: 12,
    fontFamily: 'ZenOldMincho-Bold',
    color:'#0ABAB5',
    marginTop:7
  }
};
