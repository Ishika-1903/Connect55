import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import {TCText} from '../../components/text/CustomText';
import Icons from '../../utils/constants/Icons';
import {styles} from './LoginScreen.styles';
import {Colors} from '../../utils/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../routes/navigation/navigators';
import CustomInputField from '../../components/inputField/CustomInputField';
import {Strings} from '../../utils/constants/strings';
import CustomButton from '../../components/buttons/CustomButton';
import { validateEmail } from '../../utils/utils';

type PublicNavigationProps =
  NativeStackNavigationProp<AppStackParamList>;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation<PublicNavigationProps>();

  const handleSignIn = () => {
    if (!validateEmail(email)) {
      setEmailError('* Please enter a valid work email.');
      return;
    }
  
    if (!password) {
      setPasswordError('* Please enter your password.');
      return;
    }
  
    setEmailError(''); 
    setPasswordError('');
    navigation.navigate('Private');
    console.log('Email and Password are valid!', {email, password});
  };

  const handleForgotPassword = () => {
    navigation.navigate('Email');
  };

  const handleSignUp = () => {
    navigation.navigate('CreateAccount');
  };
  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <Image source={Icons.logo} style={styles.heading} />
        <View style={styles.inputContainer}>
          <CustomInputField
            lefticon="email"
            lefticonStyle={{fontSize: 20}}
            placeholder="Enter email"
            placeholderTextStyle={{color: '#888'}}
            textStyle={{fontSize: 16, marginVertical:10, color:Colors.darkBlue}}
            containerStyle={{backgroundColor: '#EFEFEF'}}
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (emailError && (validateEmail(text) || text.trim() === '')) {
                setEmailError('');
              }
            }}
          />
        {emailError ? (
            <TCText style={styles.errorText}>
              {emailError}
            </TCText>
          ) : <View style={{height:20}}/>}
          <CustomInputField
            lefticon="lock"
            rightIcon={showPassword ? 'visibility-off' : 'visibility'}
            lefticonStyle={{fontSize: 20}}
            onRightIconPress={() => setShowPassword(!showPassword)}
            placeholder="Enter your password"
            placeholderTextStyle={{color: '#888'}}
            secureTextEntry={!showPassword}
            textStyle={{fontSize: 16, marginVertical:10, color:Colors.darkBlue}}
            containerStyle={{backgroundColor: '#EFEFEF'}}
            value={password}
            onChangeText={text => setPassword(text)}
          />
           {passwordError ? (
            <TCText style={styles.errorText}>
              {passwordError}
            </TCText>
          ) : null}
        </View>

        
    

        <CustomButton
          text={Strings.SIGN_IN.toUpperCase()}
          onPress={handleSignIn}
          style={styles.signInButton}
          textStyle={styles.signInText}
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <TCText style={styles.forgotPasswordText}>
            {Strings.FORGOT_PASSWORD}?
          </TCText>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <TCText style={styles.noAccountText}>
            {Strings.DONT_HAVE_ACCOUNT}?
          </TCText>
          <TouchableOpacity onPress={handleSignUp}>
            <TCText style={styles.signUpText}>{Strings.SIGN_UP}</TCText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
