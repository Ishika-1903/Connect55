import React, { useState } from 'react';
import CommonHeader from '../../components/header/CommonHeader';
import { TCText } from '../../components/text/CustomText';
import { Strings } from '../../utils/constants/strings';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Colors } from '../../utils/constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomInputField from '../../components/inputField/CustomInputField';
import { useNavigation } from '@react-navigation/native';
import { searchUsers } from '../../apis/auth/auth';
import Icons from '../../utils/constants/Icons';
import { baseURLPhoto } from '../../apis/apiConfig';
import { useSelector } from 'react-redux';
import { createChat } from '../../apis/chat/chat'; 

const NewMessageScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null); 
  const [error, setError] = useState<string | null>(null);
  const userId = useSelector((state: any) => state.auth.userId); 

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      try {
        const response = await searchUsers(query);
        setSearchResults(response.data.data); 
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]); 
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleChatPress = async (userIdToChat: string) => {
    setSelectedUser(userIdToChat); 

    if (userIdToChat) {
     
      const chatData = {
        type: 'one-to-one',
        participants: [userId, userIdToChat], 
      };

      try {
        const response = await createChat(chatData);
        if (response) {
          Alert.alert('Chat Created', 'A new one-to-one chat has been created.');
          navigation.navigate('IndividualChatScreen', { chatId: response.chatId }); // Assuming `chatId` is returned
        }
      } catch (error) {
        console.error('Error creating chat:', error);
        Alert.alert('Error', 'Something went wrong while creating the chat.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CommonHeader
          leftContent={
            <View style={styles.leftContent}>
              <MaterialIcons
                name="arrow-back"
                size={25}
                style={styles.icon}
                onPress={() => navigation.goBack()}
              />
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
          placeholderTextStyle={{ color: Colors.darkBlue }}
          containerStyle={styles.inputField}
          textStyle={{ color: Colors.darkBlue }}
          value={searchQuery}
          onChangeText={handleSearch}
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
        data={searchResults}
        keyExtractor={item => item.userId}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleChatPress(item.userId)} 
            style={styles.chatItem}>
            <Image
              source={
                item.profilePicture
                  ? { uri: `${baseURLPhoto}${item.profilePicture}` }
                  : Icons.dummyProfile
              }
              style={styles.profilePicture}
            />
            <View style={styles.chatDetails}>
              <TCText style={styles.name}>{item.name || 'Unnamed'}</TCText>
              <TCText style={styles.bio}>{item.bio || 'No bio available'}</TCText>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <TCText style={styles.noResultsText}>
            {searchQuery ? 'No results found.' : 'Search for users.'}
          </TCText>
        }
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

export default NewMessageScreen;
