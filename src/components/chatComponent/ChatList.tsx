import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomInputField from '../inputField/CustomInputField';
import CommonHeader from '../header/CommonHeader';
import ChatItem from './ChatItem';
import {getChatByUserId} from '../../apis/chat/chat';
import {RootState} from '../../controller/store';
import {Colors} from '../../utils/constants/colors';
import {baseURLPhoto} from '../../apis/apiConfig';
import Icons from '../../utils/constants/Icons';
import {Strings} from '../../utils/constants/strings';
import {setChatUserId} from '../../controller/authSlice';
import GroupChatItem from './GroupChatItem';

const ChatList: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [chatData, setChatData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('DirectMessages');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const userId = useSelector((state: RootState) => state.auth.userId);

  useFocusEffect(
    useCallback(() => {
      const handleGetChatByUserId = async () => {
        try {
          if (userId) {
            setLoading(true);
            const response = await getChatByUserId(userId);

            if (response?.success) {
              const chats = response.data.filter(
                (chat: any) =>
                  chat.type === 'one-to-one' || chat.type === 'group',
              );
              const filteredChats = chats.map((chat: any) => {
                if (chat.type === 'one-to-one') {
                  const otherParticipant = chat.participants.find(
                    (participant: any) => participant.userId !== userId,
                  );
                  return {...chat, otherParticipant};
                }

                return chat;
              });

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
    if (activeTab === 'DirectMessages') {
      // Filter for one-to-one messages
      return chatData.filter(
        chat =>
          chat.type === 'one-to-one' &&
          chat.otherParticipant?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    } else if (activeTab === 'Groups') {
      return chatData.filter(
        chat =>
          chat.type === 'group' &&
          (chat.groupName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.participants.some((participant: any) =>
              participant.name
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()),
            )),
      );
    }
    return chatData;
  }, [chatData, searchQuery, activeTab]);

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
            keyExtractor={item => item.chatId}
            renderItem={({item}) => {
              if (item.type === 'one-to-one') {
                // For one-to-one chats, render ChatItem
                return (
                  <ChatItem
                    profilePicture={
                      item.otherParticipant?.profilePicture
                        ? {
                            uri: `${baseURLPhoto}${item.otherParticipant.profilePicture}`,
                          }
                        : Icons.dummyProfile
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
                        : null
                    }
                    unreadCount={item.unreadCount}
                    onPress={() => {
                      if (item.otherParticipant?.userId) {
                        dispatch(setChatUserId(item.otherParticipant.userId));
                      }
                      navigation.navigate('IndividualChatScreen', {
                        chatId: item.chatId,
                      });
                    }}
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
                    onPress={() => {
                      navigation.navigate('GroupChatScreen', {
                        chatId: item.chatId,
                      });
                    }}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  chatListContainer: {
    flex: 1,
  },
});

export default ChatList;
