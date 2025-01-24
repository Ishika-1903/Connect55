import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {TCText} from '../text/CustomText';
import {Colors} from '../../utils/constants/colors';

type CustomButtonProps = {
  text: string;
  onPress?: () => void;
  textStyle?: TextStyle;
  style?: ViewStyle;
  disabled?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  textStyle,
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => {
        if (!disabled) {
          console.log('Button clicked!');
          onPress && onPress();
        }
      }}
      activeOpacity={0.7}>
      <TCText style={[styles.buttonText, textStyle]}>{text}</TCText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: Colors.black,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
});

export default CustomButton;
