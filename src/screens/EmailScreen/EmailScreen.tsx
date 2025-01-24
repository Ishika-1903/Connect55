import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomInputField from '../../components/inputField/CustomInputField';
import CustomButton from '../../components/buttons/CustomButton';
import Icons from '../../utils/constants/Icons';
import {Strings} from '../../utils/constants/strings';
import {Colors} from '../../utils/constants/colors';
import {TCText} from '../../components/text/CustomText';
import {validateEmail} from '../../utils/utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EmailScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    if (validateEmail(email)) {
      setError('');
      navigation.navigate('OTP');
      console.log('Email is valid. Proceed to next screen!', email);
    } else {
      setError('* Please enter a valid work email.');
    }
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
        <View>
          <CustomInputField
            lefticon="email"
            lefticonStyle={{fontSize: 20}}
            placeholder="Enter your work email"
            placeholderTextStyle={{color: '#888'}}
            textStyle={{
              fontSize: 14,
              marginVertical: 10,
              color: Colors.darkBlue,
            }}
            containerStyle={{backgroundColor: '#EFEFEF'}}
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (error && (validateEmail(text) || text.trim() === '')) {
                setError('');
              }
            }}
          />
          {error ? (
            <TCText style={styles.errorText}>{error}</TCText>
          ) : (
            <View style={{height: 20}} />
          )}
        </View>
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
    marginTop: -110,
    width: '70%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  nextButton: {
    backgroundColor: Colors.darkBlue,
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
});

export default EmailScreen;
