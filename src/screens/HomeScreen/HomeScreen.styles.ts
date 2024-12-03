import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  messageIconContainer: {
    position: 'relative',
  },
  unreadCount: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 3,
    paddingHorizontal: 7,
    
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  postSection: {
    marginTop: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    color: Colors.darkBlue,
    fontSize: 16,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 300,
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  actionIcon: {
    marginRight: 20,
  },
  captionSection: {
    flexDirection: 'row',  
    marginTop: 5,
    marginHorizontal: 10,
  },
  userNameInCaption: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.darkBlue,
  },
  caption: {
    fontSize: 14,
    color: Colors.darkBlue,
    marginLeft: 5, 
    fontStyle: 'italic',
  },
});
