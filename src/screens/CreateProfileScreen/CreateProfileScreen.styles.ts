import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  dropdownList: {
    backgroundColor: '#fff',
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 5,
  },
  multiSelectdropdownList: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 5,
    maxHeight: 250,
  },

  backButton: {
    margin: 20,
    alignSelf: 'flex-start',
  },
  backIcon: {
    color: Colors.darkBlue,
  },
  card: {
    marginVertical: 30,
  },
  profilePhotoContainer: {
    alignItems: 'center',
    marginBottom: -80,
    zIndex: 10,
  },
  profilePhotoWrapper: {
    position: 'relative',
  },
  outerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#ddd',
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
  saveButton: {
    position: 'absolute',
    top: -10,
    right: 30,
  },
  saveText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkBlue,
  },
  formCard: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 20,
    marginTop: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 2,
    shadowRadius: 6,
    elevation: 20,
    overflow: 'hidden',
  },
  arrowButton: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  scrollFormContainer: {
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkBlue,
    letterSpacing: 1,
  },
  skillsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkBlue,
    letterSpacing: 1,
  },
  input: {
    height: 40,
    borderColor: Colors.darkBlue,
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 0, 
    backgroundColor: '#fff',
    marginBottom: 30,
  },

  placeholderColor: {
    color: '#aaa',
  },
  containerStyle:{
    width:'80%',
    height:'20%',
    backgroundColor:'#FBFBFB',
  },
  placeholderTextStyle: {
    fontSize: 16,
    letterSpacing: 0.5,
    textAlign: 'left',
    color: Colors.darkBlue,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
  button: {
    backgroundColor: Colors.darkBlue,
    borderRadius: 15,
    height: 50,
    marginVertical: 20,
  },
  dropdownWrapper: {
    marginVertical: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#aaa',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Colors.darkBlue,
    backgroundColor: Colors.gray,
    borderRadius: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  selectedStyle: {
    borderRadius: 20,
    borderWidth: 2,
    marginVertical: 2,
  },
  tickIcon: {
    marginLeft: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color: Colors.darkBlue,
  },
  checkIcon: {
    marginLeft: 10,
  },
  modalButton: {
    backgroundColor: Colors.darkBlue,
    borderRadius: 20,
    marginTop: 10,
    width:'50%',
    padding:12,
  },
  modalButtonText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
});