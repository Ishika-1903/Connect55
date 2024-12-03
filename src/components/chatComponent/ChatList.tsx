import React, {useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import ChatItem from './ChatItem';
import {useNavigation} from '@react-navigation/native';
import {chatData, groupData} from '../../utils/dummyData';
import CommonHeader from '../header/CommonHeader';
import {TCText} from '../text/CustomText';
import {Colors} from '../../utils/constants/colors';
import CustomInputField from '../inputField/CustomInputField';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GroupChatItem from './GroupChatItem';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CustomModal} from '../CustomModal/CustomModal';
import { Strings } from '../../utils/constants/strings';

const ChatList: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('DirectMessages'); // Change 'Personal' to 'DirectMessages'
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  
  const dataToShow = activeTab === 'DirectMessages' ? chatData : groupData; // Change 'Personal' to 'DirectMessages'
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleLongPress = chat => {
    setSelectedChat(chat);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const pinChat = () => {
    console.log('Chat pinned:', selectedChat);
    closeModal();
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CommonHeader
          leftContent={
            <View style={styles.leftContent}>
              <MaterialIcons name="arrow-back" size={25} style={styles.icon} onPress={()=>navigation.goBack()}/>
              <TCText style={styles.heading}>{Strings.CHATS}</TCText>
            </View>
          }
          rightContent={
            <View style={styles.rightContent}>
              <FontAwesome
                name="search"
                size={22}
                style={styles.searchIcon}
                onPress={() => setShowSearchBar(!showSearchBar)}
              />
              <FontAwesome
                name="edit"
                size={25}
                style={styles.icon}
                onPress={() => navigation.navigate('NewMessage')}
              />
            </View>
          }
        />
      </View>
      {showSearchBar && (
        <View style={styles.inputFieldContainer}>
          <CustomInputField
            lefticon="search"
            placeholder="Search"
            placeholderTextStyle={{color: Colors.darkBlue}}
            containerStyle={styles.inputField}
            textStyle={{color:Colors.darkBlue}}
          />
        </View>
      )}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'DirectMessages' && styles.activeTab]} // Change 'Personal' to 'DirectMessages'
          onPress={() => setActiveTab('DirectMessages')}> 
          <Text
            style={[
              styles.tabText,
              activeTab === 'DirectMessages' && styles.activeTabText, // Change 'Personal' to 'DirectMessages'
            ]}>
           {Strings.DIRECT_MESSAGES}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Groups' && styles.activeTab]} // Change 'Work' to 'Groups'
          onPress={() => setActiveTab('Groups')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Groups' && styles.activeTabText, // Change 'Work' to 'Groups'
            ]}>
            {Strings.GROUPS}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Groups' && styles.activeTab]} // Change 'Work' to 'Groups'
          onPress={() => setActiveTab('Groups')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Groups' && styles.activeTabText, // Change 'Work' to 'Groups'
            ]}>
         Pinned
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dataToShow}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) =>
          activeTab === 'DirectMessages' ? ( // Change 'Personal' to 'DirectMessages'
            <ChatItem
              profilePicture={item.profilePicture}
              name={item.name}
              lastMessage={item.lastMessage}
              time={item.time}
              unreadCount={item.unreadCount}
              onPress={() => navigation.navigate('IndividualChatScreen')}
              onLongPress={() => handleLongPress(item)}
            />
          ) : (
            <GroupChatItem
              members={item.members}
              groupName={item.groupName}
              lastMessage={item.lastMessage}
              time={item.time}
              unreadCount={item.unreadCount}
              onPress={() => navigation.navigate('GroupChatScreen')}
            />
          )
        }
        contentContainerStyle={styles.listContainer}
      />

      <CustomModal
        visible={isModalVisible}
        title="Chat Options"
        onClose={closeModal}
        buttons={[
          {
            text: 'Pin Chat',
            onPress: pinChat,
            buttonStyle: {backgroundColor: Colors.black},
            textStyle: {color: Colors.white},
          },
          {
            text: 'Cancel',
            onPress: closeModal,
            buttonStyle: {backgroundColor: Colors.gray},
            textStyle: {color: Colors.black},
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    padding: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    padding: 10,
  },
  rightContent: {
    flexDirection: 'row', 
  },
  heading: {
    color: Colors.darkBlue,
    fontSize: 20,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    left:5
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
  icon: {
    color: Colors.darkBlue,
  },
  searchIcon:{
    color: Colors.darkBlue,
marginRight:20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.darkBlue,
  },
  optionButton: {
    padding: 15,
    backgroundColor: Colors.gray,
    borderRadius: 5,
    marginVertical: 5,
  },
  optionText: {
    textAlign: 'center',
    color: Colors.darkBlue,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,

  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: Colors.darkBlue,
  },
  tabText: {
    color: Colors.darkBlue,
    fontSize: 16,
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatList;
