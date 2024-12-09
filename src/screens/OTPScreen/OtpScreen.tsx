import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInputField from '../../components/inputField/CustomInputField';
import Icons from '../../utils/constants/Icons';
import { Strings } from '../../utils/constants/strings';
import { Colors } from '../../utils/constants/colors';
import CustomButton from '../../components/buttons/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OTPScreen: React.FC = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('Password');
  };

  return (
    <View style={styles.screenContainer}>
       <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color={Colors.darkBlue} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Image source={Icons.logo} style={styles.heading} />
        <CustomInputField
          placeholder="Enter OTP"
          placeholderTextStyle={{ color: '#888' }}
          textStyle={{ fontSize: 14, marginVertical:10, color:Colors.darkBlue }}
          containerStyle={{ backgroundColor: '#EFEFEF' }}
          value={otp}
          onChangeText={text => setOtp(text)}
        />
        <CustomButton
          text={Strings.NEXT.toUpperCase()}
          style={styles.nextButton}
          textStyle={styles.nextText}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: Colors.white,
      justifyContent: 'center',
    },
    backArrow: {
      position: 'absolute',
      top: 40,
      left: 20,
      zIndex: 10,
    },
    container: {
      padding: 20,
      borderRadius: 15,
    },
    heading: {
        marginBottom: 50,
  marginTop:-110,
        width: '70%',
        resizeMode: 'contain',
        alignSelf: 'center',
  
      },
    inputContainer: {
      marginBottom: 30,
    },

    nextButton: {
      backgroundColor: Colors.darkBlue,
      borderRadius: 10,
      paddingVertical: 15,
      marginTop:50,
      alignItems: 'center',
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
    },

    nextText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
      },
      errorText: {
        color: "red",
        fontSize: 14,
        marginTop: 10, 
        alignSelf: 'flex-start', 
      },
  });
export default OTPScreen;
