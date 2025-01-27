import { StyleSheet } from "react-native";
import { Colors } from "../../utils/constants/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    contentContainer: {
      flex: 1,
    },
    headerContainer: {
      padding: 10,
    },
    leftContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    heading: {
      fontSize: 20,
      color: Colors.darkBlue,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    icon: {
      color: Colors.darkBlue,
    },
    sectionHeading: {
      fontSize: 17,
      fontWeight: 'bold',
      color: Colors.darkBlue,
      marginVertical: 10,
      marginLeft: 15,
    },
    profilePhotoContainer: {
      alignItems: 'center',
      marginBottom: 20,
      zIndex: 10,
    },
    profilePhotoWrapper: {
      position: 'relative',
    },
    editIcon: {
      position: 'absolute',
      bottom: 5,
      right: 10,
      backgroundColor: Colors.darkBlue,
      borderRadius: 20,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    editIconText: {
      color: '#fff',
    },
    profilePhoto: {
      width: 140,
      height: 140,
      borderRadius: 70,
      borderWidth: 2,
      borderColor: '#ddd',
    },
    groupName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.darkBlue,
      marginTop: 20,
    },
    editGroupNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      paddingLeft: 20,
    },
    editGroupNameInput: {
      fontSize: 18,
      color: Colors.darkBlue,
      borderBottomWidth: 1,
      borderBottomColor: Colors.darkBlue,
      marginRight: 10,
      flex: 1,
      paddingLeft: 10,
      marginLeft: 10,
    },
    saveButton: {
      fontSize: 16,
      color: Colors.darkBlue,
      fontWeight: 'bold',
      marginHorizontal: 20,
    },
    memberItem: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: Colors.gray,
    },
    memberInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    memberPhoto: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    memberName: {
      fontSize: 16,
      color: Colors.darkBlue,
      marginLeft: 10,
    },
    adminTag: {
      fontSize: 12,
      color: Colors.darkBlue,
      fontWeight: '100',
      marginLeft: 10,
    },
    emptyText: {
      textAlign: 'center',
      fontSize: 16,
      color: Colors.darkGray,
    },
    modalButton: {
      backgroundColor: Colors.darkBlue,
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    modalButtonText: {
      color: Colors.white,
      fontSize: 16,
      textAlign: 'center',
    },
    containerStyle: {
      width: 300,
      padding: 15,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    editIconWrapper: {
      top: 10,
      marginRight: 0,
    },
  });
  