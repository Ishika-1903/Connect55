import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomInputField from '../inputField/CustomInputField';
import CommonHeader from '../header/CommonHeader';
import ChatItem from './ChatItem';
import {getChatByUserId, pinChat} from '../../apis/chat/chat';
import {RootState} from '../../controller/store';
import {Colors} from '../../utils/constants/colors';
import {baseURLPhoto} from '../../apis/apiConfig';
import Icons from '../../utils/constants/Icons';
import {Strings} from '../../utils/constants/strings';
import {setChatUserId} from '../../controller/authSlice';
import GroupChatItem from './GroupChatItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatList: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [chatData, setChatData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('DirectMessages');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);

  const userId = useSelector((state: RootState) => state.auth.userId);

  const handleLongPress = (chat: any) => {
    setSelectedChat(chat);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePinChat = async () => {
    if (selectedChat && selectedChat._id) {
      try {
        const isPinned = selectedChat.pinned;
        const response = await pinChat({
          chatId: selectedChat._id,
          pinned: !isPinned,
        });
        if (response?.success) {
          console.log(isPinned ? 'Chat unpinned!' : 'Chat pinned!');

          setChatData(prevChatData =>
            prevChatData.map(chat =>
              chat._id === selectedChat._id
                ? {...chat, pinned: !isPinned}
                : chat,
            ),
          );
        } else {
          console.log('Failed to pin/unpin chat');
        }
      } catch (error) {
        console.error('Error pinning/unpinning chat:', error);
      }
      setIsModalVisible(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const handleGetChatByUserId = async () => {
        try {
          let storedUserId = await AsyncStorage.getItem('userId');
          console.log('Stored User ID:', storedUserId);

          if (!storedUserId) {
            storedUserId = userId;
            console.log('Fallback to Passed User ID:', userId);
          }

          if (storedUserId) {
            setLoading(true);
            const response = await getChatByUserId(storedUserId);
            console.log('API Response:', response);

            if (response?.success) {
              const chats = response.data.filter(
                (chat: any) =>
                  chat.type === 'one-to-one' || chat.type === 'group',
              );
              console.log('Filtered Chats:', chats);

              const filteredChats = chats.map((chat: any) => {
                if (chat.type === 'one-to-one') {
                  const otherParticipant = chat.participants.find(
                    (participant: any) => participant.userId !== storedUserId,
                  );

                  const lastMessageId =
                    chat.messages && chat.messages.length > 0
                      ? chat.messages[chat.messages.length - 1].messageId
                      : null;

                  console.log('One-to-One Chat:', {
                    ...chat,
                    otherParticipant,
                    lastMessageId,
                  });

                  return {...chat, otherParticipant, lastMessageId};
                }

                const lastMessageId =
                  chat.messages && chat.messages.length > 0
                    ? chat.messages[chat.messages.length - 1].messageId
                    : null;

                console.log('Group Chat:', lastMessageId);

                return {...chat, lastMessageId};
              });

              console.log('Final Filtered Chats:', filteredChats);
              setChatData(filteredChats);
              setError(null);
            } else {
              console.log('API Error:', response?.message || 'Unknown error');
            }
          }
        } catch (error: any) {
          console.log('Error fetching chats:', error.message);
        } finally {
          setLoading(false);
        }
      };

      handleGetChatByUserId();

      return () => {};
    }, [userId]),
  );

  const filteredData = useMemo(() => {
    console.log('Active Tab:', activeTab);
    if (activeTab === 'Pinned') {
      return chatData.filter(chat => chat.pinned);
    }
    if (activeTab === 'DirectMessages') {
      return chatData.filter(
        chat =>
          chat.type === 'one-to-one' &&
          chat.messages &&
          chat.messages.length > 0 &&
          chat.otherParticipant?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    if (activeTab === 'Groups') {
      return chatData.filter(
        chat =>
          chat.type === 'group' &&
          chat.messages &&
          (chat.groupName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.participants.some((participant: any) =>
              participant.name
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()),
            )),
      );
    }
    return chatData.filter(chat => chat.messages && chat.messages.length > 0);
  }, [chatData, searchQuery, activeTab]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const formatMessageTime = (timestamp: string) => {
    const messageDate = new Date(timestamp);
    const today = new Date();

    if (messageDate.toDateString() === today.toDateString()) {
      const hours = messageDate.getHours();
      const minutes = messageDate.getMinutes();
      return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    } else {
      return `${
        messageDate.getMonth() + 1
      }/${messageDate.getDate()}/${messageDate.getFullYear()}`;
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
              <Text style={styles.heading}>{Strings.CHATS}</Text>
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
            rightIcon="close"
            rightIconStyle={{color: Colors.darkBlue, fontSize: 15}}
            onRightIconPress={handleClearSearch}
            placeholderTextStyle={{color: Colors.darkBlue}}
            containerStyle={styles.inputField}
            textStyle={{color: Colors.darkBlue}}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </View>
      )}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'DirectMessages' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('DirectMessages')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'DirectMessages' && styles.activeTabText,
            ]}>
            {Strings.DIRECT_MESSAGES}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Groups' && styles.activeTab]}
          onPress={() => setActiveTab('Groups')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Groups' && styles.activeTabText,
            ]}>
            {Strings.GROUPS}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Pinned' && styles.activeTab]}
          onPress={() => setActiveTab('Pinned')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Pinned' && styles.activeTabText,
            ]}>
            Pinned
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chatListContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.darkBlue} />
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={item => item._id}
            renderItem={({item}) => {
              const profilePicture =
                item.type === 'one-to-one'
                  ? item.otherParticipant?.profilePicture
                  : null;

              if (item.type === 'one-to-one') {
                return (
                  <ChatItem
                    profilePicture={
                      item.otherParticipant?.profilePicture
                        ? {
                            uri: `${baseURLPhoto}${item.otherParticipant.profilePicture}`,
                          }
                        : undefined
                    }
                    name={item.otherParticipant?.name || 'Unknown User'}
                    lastMessage={
                      item.messages && item.messages.length > 0 ? (
                        item.messages[item.messages.length - 1].media ? (
                          <View style={styles.mediaMessageContainer}>
                            <MaterialIcons
                              name="photo"
                              size={20}
                              color={Colors.darkBlue}
                            />
                            <Text style={styles.mediaText}>Photo</Text>
                          </View>
                        ) : (
                          item.messages[item.messages.length - 1].content
                        )
                      ) : (
                        'No messages yet'
                      )
                    }
                    time={
                      item.messages && item.messages.length > 0
                        ? formatMessageTime(
                            item.messages[item.messages.length - 1].timestamp,
                          )
                        : undefined
                    }
                    unreadCount={item.unreadCount}
                    isPinned={item.pinned}
                    onPress={() => {
                      if (item.otherParticipant?.userId) {
                        dispatch(setChatUserId(item.otherParticipant.userId));
                      }
                      console.log('Last Message ID:', item.lastMessageId);
                      console.log('chatIddddd in chatlistt', item._id);
                      navigation.navigate('IndividualChatScreen', {
                        chatId: item._id,
                        lastMessageId: item.lastMessageId,
                      });
                      
                    }}
                    onLongPress={() => handleLongPress(item)}
                    // rightContent={
                    //   activeTab !== 'Pinned' &&
                    //   item.pinned && (
                    //     <View style={styles.pinContainer}>
                    //       <MaterialIcons
                    //         name="push-pin"
                    //         size={20}
                    //         color={Colors.darkBlue}
                    //         style={styles.pinIcon}
                    //       />
                    //     </View>
                    //   )
                    // }
                  />
                );
              } else if (item.type === 'group') {
                return (
                  <GroupChatItem
                    members={item.participants
                      ?.slice(-4)
                      .map((participant: any) => ({
                        id: participant.userId,
                        name: participant.name,
                        profilePicture: participant.profilePicture
                          ? {
                              uri: `${baseURLPhoto}${participant.profilePicture}`,
                            }
                          : Icons.dummyProfile,
                      }))}
                    groupName={item.groupName}
                    isPinned={item.pinned}
                    groupIcon={
                      item.groupIcon
                        ? {uri: `${baseURLPhoto}${item.groupIcon}`}
                        : undefined
                    }
                    lastMessage={
                      item.messages && item.messages.length > 0 ? (
                        item.messages[item.messages.length - 1].media ? (
                          <View style={styles.mediaMessageContainer}>
                            <MaterialIcons
                              name="photo"
                              size={20}
                              color={Colors.darkBlue}
                            />
                            <Text style={styles.mediaText}>Photo</Text>
                          </View>
                        ) : (
                          item.messages[item.messages.length - 1].content
                        )
                      ) : (
                        'No messages yet'
                      )
                    }
                    time={
                      item.messages && item.messages.length > 0
                        ? formatMessageTime(
                            item.messages[item.messages.length - 1].timestamp,
                          )
                        : null
                    }
                    unreadCount={item.unreadCount}
                    onLongPress={() => {
                      handleLongPress(item);
                    }}
                    onPress={() => {
                      navigation.navigate('GroupChatScreen', {
                        chatId: item._id,
                      });
                    }}
                    // rightContent={
                    //   activeTab !== 'Pinned' &&
                    //   item.pinned && (
                    //     <MaterialIcons
                    //       name="push-pin"
                    //       size={20}
                    //       color={Colors.darkBlue}
                    //       style={styles.pinIcon}
                    //     />
                    //   )
                    // }
                  />
                );
              }
              return null;
            }}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              error ? (
                <View style={styles.noChatsContainer}>
                  <Text style={styles.noChatsText}>{error}</Text>
                  <Text style={[styles.noChatsText, {fontStyle: 'italic'}]}>
                    Be the first to start the conversation
                  </Text>
                </View>
              ) : null
            }
          />
        )}
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel}>
        <TouchableWithoutFeedback onPress={handleCancel}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handlePinChat}>
                <Text style={styles.modalButtonText}>
                  {selectedChat?.pinned ? 'Unpin Chat' : 'Pin Chat'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCancel}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    left: 5,
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
  searchIcon: {
    color: Colors.darkBlue,
    marginRight: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
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
  noChatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChatsText: {
    fontSize: 18,
    color: Colors.darkBlue,
    textAlign: 'center',
    marginTop: 20,
  },
  mediaMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaText: {
    color: Colors.darkBlue,
    marginLeft: 5,
  },
  chatListContainer: {
    flex: 1,
  },
  pinContainer: {
    marginTop: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinIcon: {
    marginTop: 7,
    alignSelf: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalButton: {
    padding: 15,
    backgroundColor: Colors.darkBlue,
    marginVertical: 10,
    borderRadius: 20,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ChatList;
