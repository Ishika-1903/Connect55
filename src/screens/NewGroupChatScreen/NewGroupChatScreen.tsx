import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  TextInput,
  StyleSheet,
  View,
} from 'react-native';
import {TCText} from '../../components/text/CustomText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommonHeader from '../../components/header/CommonHeader';
import {Colors} from '../../utils/constants/colors';
import CustomCheckboxItem from '../../components/checkbox/CustomCheckBoxItem';
import CustomButton from '../../components/buttons/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {searchUsers} from '../../apis/auth/auth';
import {baseURLPhoto} from '../../apis/apiConfig';
import Icons from '../../utils/constants/Icons';
import {RootState} from '../../controller/store';
import {useSelector} from 'react-redux';
import CustomInputField from '../../components/inputField/CustomInputField';
import {Strings} from '../../utils/constants/strings';
import {createChat} from '../../apis/chat/chat';
import {styles} from './NewGroupChatScreen.styles';

type SearchResultItem = {
  userId: string;
  name: string;
  bio?: string;
  profilePicture?: string;
};

const NewGroupChatScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [groupName, setGroupName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const handleSelectionChange = (id: string, isSelected: boolean) => {
    setSelectedUsers(prevSelected => {
      const updated = isSelected
        ? [...prevSelected, id]
        : prevSelected.filter(userId => userId !== id);
      return updated;
    });
  };

  const handleClearSearch = () => {
    setSearchText('');
    setSearchResults([]);
  };

  const handleSearch = async (query: string) => {
    setSearchText(query);
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

  const handleCreateGroupChat = async () => {
    if (!userId) {
      Alert.alert('Error', 'User is not logged in. Please log in again.');
      return;
    }

    if (!groupName.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }

    try {
      const participants = [userId, ...selectedUsers];

      // const groupIconData = groupIcon
      // ? {
      //     uri: groupIcon.uri,
      //     name: groupIcon.fileName || 'group_icon.jpg',
      //     type: groupIcon.type || 'image/jpeg',
      //     size: groupIcon.size || 0,
      //   }
      // : null;
      console.log('adminIddddd', userId);
      const response = await createChat(
        'group',
        groupName,
        participants,
        userId,
        // groupIconData,
      );

      if (response) {
        Alert.alert('Success', 'Group Chat Created Successfully');
        setModalVisible(false);
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error creating group chat:', error);
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
                {Strings.NEW_GROUP_CHAT.toUpperCase()}
              </TCText>
            </View>
          }
        />
      </View>
      <View style={styles.inputFieldContainer}>
        <CustomInputField
          lefticon="search"
          placeholder="Search"
          rightIcon="close"
          rightIconStyle={{color: Colors.darkBlue, fontSize: 15}}
          onRightIconPress={handleClearSearch}
          placeholderTextStyle={{color: Colors.darkBlue}}
          containerStyle={styles.inputField}
          textStyle={{color: Colors.darkBlue}}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={item => item.userId}
        renderItem={({item}) => (
          <CustomCheckboxItem
            profilePicture={
              item.profilePicture
                ? {uri: `${baseURLPhoto}${item.profilePicture}`}
                : Icons.dummyProfile
            }
            name={item.name || 'Unnamed'}
            bio={item.bio || 'No bio available'}
            isSelected={selectedUsers.includes(item.userId)}
            onSelectionChange={isSelected =>
              handleSelectionChange(item.userId, isSelected)
            }
          />
        )}
        ListEmptyComponent={
          searchText.length > 0 && searchResults.length === 0 ? (
            <TCText style={{textAlign: 'center', marginTop: 20}}>
              No results found
            </TCText>
          ) : null
        }
      />
      {selectedUsers.length > 1 && (
        <CustomButton
          text={Strings.CREATE_GROUP_CHAT}
          textStyle={{color: Colors.white}}
          onPress={() => setModalVisible(true)}
          style={styles.createGroupButton}
        />
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TCText style={styles.modalTitle}>Enter Group Name</TCText>
            <TextInput
              style={styles.modalInput}
              placeholder="Group Name"
              value={groupName}
              onChangeText={setGroupName}
            />
            <View style={styles.buttonContainer}>
              <CustomButton
                text="Create Group"
                textStyle={{color: Colors.white}}
                onPress={handleCreateGroupChat}
                style={{...styles.modalButton, ...styles.modalButtonCreate}}
              />
              <CustomButton
                text="Cancel"
                textStyle={{color: Colors.darkBlue}}
                onPress={() => setModalVisible(false)}
                style={{...styles.modalButton, ...styles.modalButtonCancel}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewGroupChatScreen;
