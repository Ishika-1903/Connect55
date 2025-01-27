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
    doneButton: {
      width: '90%',
      height: 50,
      backgroundColor: Colors.darkBlue,
      borderRadius: 30,
      alignSelf: 'center',
      bottom: 20,
      position: 'absolute',
    },
  });
  