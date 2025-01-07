import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    imagePicker: {
      alignItems: 'center',
      marginBottom: 20,
    },
    imagePreview: {
      width: 200,
      height: 200,
      borderRadius: 10,
      marginBottom: 10,
    },
    imagePlaceholder: {
      fontSize: 16,
      color: '#888',
      marginBottom: 10,
    },
    imageButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '60%',
    },
    captionInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 10,
      fontSize: 16,
      marginBottom: 20,
    },
    tagInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 10,
      fontSize: 16,
    },
    tag: {
      backgroundColor: '#007BFF',
      borderRadius: 10,
      padding: 5,
      margin: 5,
    },
    tagText: {
      color: '#fff',
    },
    postButton: {
      backgroundColor: '#007BFF',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    postButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  