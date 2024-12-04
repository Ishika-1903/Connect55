import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {TCText} from '../../components/text/CustomText';
import Icons from '../../utils/constants/Icons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../routes/navigation/navigators';
import CustomInputField from '../../components/inputField/CustomInputField';
import CustomButton from '../../components/buttons/CustomButton';
import {validateEmail} from '../../utils/utils';
import {styles} from './CreateAccountScreen.styles';
import {Colors} from '../../utils/constants/colors';
import {registerUser} from '../../apis/auth/auth';

type PublicNavigationProps = NativeStackNavigationProp<AppStackParamList>;

const CreateAccountScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<PublicNavigationProps>();

  const handleSignIn = async () => {
    if (!validateEmail(email)) {
      setEmailError('* Please enter a valid work email.');
      return;
    }

    if (!password) {
      setPasswordError('* Please enter your password.');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('* Passwords do not match.');
      return;
    }

    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setLoading(true);

    try {
      const response = await registerUser(email, password);
      console.log();

      if (response?.data?._id) {
        const {_id, email} = response.data;
        console.log('Registration successful, User ID:', _id);
        console.log('Registration successful, Email:', email);
        console.log('Registration successful, Password:', password);
        navigation.navigate('CreateProfile', { userId: _id, userEmail: email});
      } else {
        throw new Error('User ID not found in the response.');
      }
    } catch (error: any) {
      console.error('Registration failed:', error.message);
      setPasswordError(error.message);
    } finally {
      setLoading(false);
    }
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
            textStyle={{
              fontSize: 16,
              marginVertical: 10,
              color: Colors.darkBlue,
            }}
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
            <TCText style={styles.errorText}>{emailError}</TCText>
          ) : (
            <View style={{height: 20}} />
          )}
          <CustomInputField
            lefticon="lock"
            rightIcon={showPassword ? 'visibility-off' : 'visibility'}
            lefticonStyle={{fontSize: 20}}
            onRightIconPress={() => setShowPassword(!showPassword)}
            placeholder="Create your password"
            placeholderTextStyle={{color: '#888'}}
            secureTextEntry={!showPassword}
            textStyle={{
              fontSize: 16,
              color: Colors.darkBlue,
              marginVertical: 10,
            }}
            containerStyle={{backgroundColor: '#EFEFEF'}}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          {passwordError ? (
            <TCText style={styles.errorText}>{passwordError}</TCText>
          ) : null}
        </View>

        <CustomInputField
          lefticon="lock"
          rightIcon={showConfirmPassword ? 'visibility-off' : 'visibility'}
          lefticonStyle={{fontSize: 20}}
          onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          placeholder="Confirm your password"
          placeholderTextStyle={{color: '#888'}}
          secureTextEntry={!showConfirmPassword}
          textStyle={{fontSize: 16, color: Colors.darkBlue, marginVertical: 10}}
          containerStyle={{backgroundColor: '#EFEFEF'}}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        {confirmPasswordError ? (
          <TCText style={styles.errorText}>{confirmPasswordError}</TCText>
        ) : null}

        <CustomButton
          text={loading ? 'PROCEEDING...' : 'PROCEED'}
          onPress={handleSignIn}
          style={styles.signInButton}
          textStyle={styles.signInText}
          //disabled={loading}
        />
      </View>
    </View>
  );
};

export default CreateAccountScreen;
