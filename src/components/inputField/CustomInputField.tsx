import React, { forwardRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../utils/constants/colors';

type CustomInputFieldProps = {
  lefticon?: string;
  lefticonStyle?: TextStyle;
  rightIcon?: string;
  rightIconStyle?: TextStyle;
  textStyle?: TextStyle;
  placeholder?: string;
  placeholderTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  onRightIconPress?: () => void;
  onLeftconPress?: () => void;
  onFocus?: () => void;
  editable?:boolean; 
  returnKeyType?: 'next' | 'done' | 'go' | 'search' | 'send';
  onSubmitEditing?: () => void;
};

const CustomInputField = forwardRef<TextInput, CustomInputFieldProps>(({
  lefticon,
  lefticonStyle,
  rightIcon,
  rightIconStyle,
  textStyle,
  placeholder,
  placeholderTextStyle,
  containerStyle,
  value,
  onChangeText,
  secureTextEntry,
  onRightIconPress,
  onLeftconPress,
  onFocus,
  editable,
  returnKeyType,
  onSubmitEditing
}, ref) => {
  return (
    <View style={[styles.inputRow, containerStyle]}>
      {lefticon && (
        <MaterialIcons
          name={lefticon}
          size={24}
          style={[styles.icon, lefticonStyle]}
          onPress={onLeftconPress}
        />
      )}
      <TextInput
         ref={ref} 
        style={[styles.input, textStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextStyle?.color}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={editable}
        onFocus={onFocus}
        returnKeyType={returnKeyType} 
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false} 
      />
      {rightIcon && (
        <MaterialIcons
          name={rightIcon}
          size={24}
          style={[styles.icon, rightIconStyle]}
          onPress={onRightIconPress}
        />
      )}
    </View>
  );
});

export default CustomInputField;

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  icon: {
    //color: '#071952',
    color: Colors.darkBlue,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
});
