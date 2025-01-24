import { StyleSheet } from "react-native";
import { Colors } from "../../utils/constants/colors";

export const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: Colors.white,
    },
    headerContainer: {
      padding: 10,
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
    userItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: Colors.gray,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profilePicture: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    userName: {
      fontSize: 16,
      color: Colors.darkBlue,
    },
    inviteButton: {
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 5,
      backgroundColor: Colors.gray,
    },
    inviteButtonText: {
      color: Colors.darkBlue,
      fontWeight: 'bold',
      fontSize: 15,
    },
    emptyText: {
      textAlign: 'center',
      color: Colors.gray,
      marginTop: 20,
    },
  });
  