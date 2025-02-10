import { StyleSheet } from "react-native";
import { Colors } from "../../utils/constants/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FBFBFB',
    },
    messageList: {
      padding: 20,
    },
    inputWrapper: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: '#FBFBFB',
    },
    inputContainer: {
      borderRadius: 25,
      backgroundColor: Colors.gray,
      padding: 10,
    },
    imagePreviewContainer: {
      marginTop: 10,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: Colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeholderTextStyle: {
      color: Colors.darkBlue,
    },
    containerStyle: {
      width: '75%',
      backgroundColor: '#FBFBFB',
    },
    modalButton: {
      backgroundColor: Colors.darkBlue,
      borderRadius: 20,
      marginTop: 10,
      width: '50%',
      padding: 12,
    },
    modalButtonText: {
      color: Colors.white,
      fontSize: 16,
      textAlign: 'center',
    },
  });