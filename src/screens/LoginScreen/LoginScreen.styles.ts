import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/constants/colors';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    borderRadius: 15,
  },
  heading: {
    marginBottom: 50,
    width: 300,
    height: 90,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  signInButton: {
    backgroundColor: "#071952",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  signInText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {

    color:Colors.darkBlue,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '500',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  noAccountText: {
    color: Colors.darkGray,
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: 'flex-start', 
    marginBottom:20,
  },
  signUpText: {
    color:Colors.darkBlue,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
