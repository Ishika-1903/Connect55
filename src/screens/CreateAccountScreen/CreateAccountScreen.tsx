import React, { useState, useRef } from 'react';
import { View, Image, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { TCText } from '../../components/text/CustomText';
import Icons from '../../utils/constants/Icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../routes/navigation/navigators';
import CustomInputField from '../../components/inputField/CustomInputField';
import CustomButton from '../../components/buttons/CustomButton';
import { validateEmail } from '../../utils/utils';
import { styles } from './CreateAccountScreen.styles';
import { Colors } from '../../utils/constants/colors';
import { useDispatch } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { registerUser } from '../../apis/auth/auth';
import { setToken, setUserId } from '../../controller/authSlice';
import { saveToken } from '../../apis/apiConfig';

type PublicNavigationProps = NativeStackNavigationProp<AppStackParamList>;

const CreateAccountScreen: React.FC = () => {
  const navigation = useNavigation<PublicNavigationProps>();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSignIn = async () => {
    if (loading) return;
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
      const userId = response?.data?.userId;
      const token = response?.data?.token;

      dispatch(setUserId(userId));
      dispatch(setToken(token));

      await saveToken(token);

      navigation.navigate('CreateProfile');
    } catch (error: any) {
      setPasswordError(error.message);
    } finally {
      setLoading(false);
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

        <View style={styles.inputContainer}>
          <CustomInputField
            lefticon="email"
            lefticonStyle={{ fontSize: 20 }}
            placeholder="Enter email"
            placeholderTextStyle={{ color: '#888' }}
            textStyle={{
              fontSize: 16,
              marginVertical: 10,
              color: Colors.darkBlue,
            }}
            containerStyle={{ backgroundColor: '#EFEFEF' }}
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (emailError && (validateEmail(text) || text.trim() === '')) {
                setEmailError('');
              }
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />
          {emailError ? (
            <TCText style={styles.errorText}>{emailError}</TCText>
          ) : (
            <View style={{ height: 20 }} />
          )}
          <CustomInputField
            ref={passwordInputRef}
            lefticon="lock"
            rightIcon={showPassword ? 'visibility-off' : 'visibility'}
            lefticonStyle={{ fontSize: 20 }}
            onRightIconPress={() => setShowPassword(!showPassword)}
            placeholder="Create your password"
            placeholderTextStyle={{ color: '#888' }}
            secureTextEntry={!showPassword}
            textStyle={{
              fontSize: 16,
              color: Colors.darkBlue,
              marginVertical: 10,
            }}
            containerStyle={{ backgroundColor: '#EFEFEF' }}
            value={password}
            onChangeText={text => setPassword(text)}
            returnKeyType="next"
            onSubmitEditing={() => {
              confirmPasswordInputRef.current?.focus();
            }}
          />

          {passwordError ? (
            <TCText style={styles.errorText}>{passwordError}</TCText>
          ) : null}
        </View>

        <CustomInputField
          ref={confirmPasswordInputRef}
          lefticon="lock"
          rightIcon={showConfirmPassword ? 'visibility-off' : 'visibility'}
          lefticonStyle={{ fontSize: 20 }}
          onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          placeholder="Confirm your password"
          placeholderTextStyle={{ color: '#888' }}
          secureTextEntry={!showConfirmPassword}
          textStyle={{ fontSize: 16, color: Colors.darkBlue, marginVertical: 10 }}
          containerStyle={{ backgroundColor: '#EFEFEF' }}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          returnKeyType="done"
          onSubmitEditing={handleSignIn}
        />
        {confirmPasswordError ? (
          <TCText style={styles.errorText}>{confirmPasswordError}</TCText>
        ) : null}

        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.darkBlue}
            style={{ marginVertical: 20 }}
          />
        ) : (
          <CustomButton
            text="PROCEED"
            onPress={handleSignIn}
            style={styles.signInButton}
            textStyle={styles.signInText}
          />
        )}
      </View>
    </View>
  );
};

export default CreateAccountScreen;
