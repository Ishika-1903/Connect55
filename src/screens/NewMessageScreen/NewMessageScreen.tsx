import React from 'react';
import CommonHeader from '../../components/header/CommonHeader';
import {TCText} from '../../components/text/CustomText';
import {Strings} from '../../utils/constants/strings';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../utils/constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomInputField from '../../components/inputField/CustomInputField';
import {useNavigation} from '@react-navigation/native';
import {newChatData} from '../../utils/dummyData';

const NewMessageScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CommonHeader
          leftContent={
            <View style={styles.leftContent}>
              <MaterialIcons name="arrow-back" size={25} style={styles.icon} />
              <TCText style={styles.heading}>
                {Strings.NEW_MESSAGE.toUpperCase()}
              </TCText>
            </View>
          }
        />
      </View>
      <View style={styles.inputFieldContainer}>
        <CustomInputField
          lefticon="search"
          placeholder="Search"
          placeholderTextStyle={{color: Colors.darkBlue}}
          containerStyle={styles.inputField}
          textStyle={{color:Colors.darkBlue}}
        />
      </View>
      <TouchableOpacity
        style={styles.groupChat}
        onPress={() => navigation.navigate('NewGroupChat')}>
        <MaterialIcons
          name="group"
          size={20}
          color={Colors.darkBlue}
          style={styles.groupIcon}
        />
        <TCText style={styles.groupChatHeading}>
          {Strings.NEW_GROUP_CHAT}
        </TCText>
      </TouchableOpacity>

      <FlatList
        data={newChatData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.chatItem}>
            <Image source={item.profilePicture} style={styles.profilePicture} />
            <View style={styles.chatDetails}>
              <TCText style={styles.name}>{item.name}</TCText>
              <TCText style={styles.bio}>{item.bio}</TCText>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    left:5,
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
});

export default NewMessageScreen;
