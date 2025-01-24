import { StyleSheet } from "react-native";
import { Colors } from "../../utils/constants/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    headerContainer: {
      padding: 10,
    },
    inputFieldContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    inputField: {
      width: '90%',
      backgroundColor: Colors.gray,
    },
    leftContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    heading: {
      color: Colors.darkBlue,
      fontSize: 20,
      letterSpacing: 1,
      fontWeight: 'bold',
    },
    icon: {
      color: Colors.darkBlue,
    },
    createGroupButton: {
      width: '90%',
      height: 50,
      backgroundColor: Colors.darkBlue,
      borderRadius: 30,
      alignSelf: 'center',
      bottom: 20,
      position: 'absolute',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      backgroundColor: Colors.white,
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: Colors.darkBlue,
      textAlign: 'center',
    },
    modalInput: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 20,
      color: 'black',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButton: {
      width: '48%',
      paddingVertical: 10,
      borderRadius: 10,
    },
    modalButtonCreate: {
      backgroundColor: Colors.darkBlue,
    },
    modalButtonCancel: {
      backgroundColor: Colors.gray,
    },
  });