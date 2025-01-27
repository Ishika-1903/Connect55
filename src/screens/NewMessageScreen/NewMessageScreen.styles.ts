import { StyleSheet } from "react-native";
import { Colors } from "../../utils/constants/colors";

export const styles = StyleSheet.create({
    icon: {
      color: Colors.darkBlue,
    },
    leftContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    heading: {
      color: Colors.darkBlue,
      fontSize: 20,
      letterSpacing: 1.5,
      fontWeight: 'bold',
      left: 5,
    },
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
    chatItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: Colors.gray,
    },
    profilePicture: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
    },
    chatDetails: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.darkBlue,
    },
    bio: {
      fontSize: 14,
      color: 'gray',
      marginTop: 5,
    },
    listContainer: {
      paddingHorizontal: 10,
    },
    noResultsText: {
      textAlign: 'center',
      fontSize: 16,
      color: 'gray',
      marginTop: 20,
    },
    groupChat: {
      flexDirection: 'row',
      marginHorizontal: 5,
      marginBottom: 20,
    },
    groupIcon: {
      marginHorizontal: 20,
    },
    groupChatHeading: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.darkBlue,
    },
  });
  