import React from 'react';
import {
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {TCText} from '../text/CustomText';
import {Colors} from '../../utils/constants/colors';

type ButtonProps = {
  text?: string;
  onPress?: () => void;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
};

type CustomModalProps = {
  title?: string;
  visible: boolean; 
  titleStyle?: TextStyle;
  subTitle?: string;
  subTitleStyle?: TextStyle;
  buttons?: ButtonProps[];
  onClose?: () => void; 
  containerStyle?: ViewStyle; 
  children?: React.ReactNode;
};

export const CustomModal: React.FC<CustomModalProps> = ({
  title,
  visible,
  titleStyle,
  subTitle,
  subTitleStyle,
  buttons = [],
  onClose,
  containerStyle,
  children,
}) => {
  if (!visible) return null; 

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>

          <View style={[styles.modalContainer, containerStyle]}>
            {title && (
              <TCText style={[styles.title, titleStyle]}>{title}</TCText>
            )}
       
            {subTitle && (
              <TCText style={[styles.subTitle, subTitleStyle]}>
                {subTitle}
              </TCText>
            )}
            <View style={styles.buttonContainer}>
              {buttons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.button, button.buttonStyle]}
                  onPress={button.onPress}>
                  <TCText style={[styles.buttonText, button.textStyle]}>
                    {button.text}
                  </TCText>
                </TouchableOpacity>
              ))}
            </View>
            {children}
            {onClose && (
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <TCText style={styles.closeButtonText}>x</TCText>
              </TouchableOpacity>
            )}
          </View>
     
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 1000,
  },
  modalContainer: {
    width: '80%',
    // height: '20%',
    height:'auto',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: Colors.black,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
});
