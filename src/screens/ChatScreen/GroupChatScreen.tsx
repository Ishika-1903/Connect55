import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import ChatMessage from '../../components/chatComponent/ChatMessage';
import {Colors} from '../../utils/constants/colors';
import CustomInputField from '../../components/inputField/CustomInputField';
import Icons from '../../utils/constants/Icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import CommonChatHeader from '../../components/chatComponent/ChatHeader';
import {Strings} from '../../utils/constants/strings';
import {getChatByChatId} from '../../apis/chat/chat';
import {RootState} from '../../controller/store';
import {useSelector} from 'react-redux';
import {baseURLPhoto} from '../../apis/apiConfig';
import {getMqttClient} from '../../utils/mqttClient';

type Participant = {
  userId: string;
  name: string;
  profilePicture?: string;
};

const GroupChatScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList<any>>(null);
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [participantNames, setParticipantNames] = useState<string[]>([]);
  const [headerProfilePictures, setHeaderProfilePictures] = useState<string[]>(
    [],
  );
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);
  const [groupName, setGroupName] = useState<string | null>(null);
  const [groupIcon, setGroupIcon] = useState<string | null>(null);
  const [photo, setPhoto] = useState<{
    uri: string;
    name: string;
    type: string;
    size: number;
  } | null>(null);
  const [isFetchingOlderMessages, setIsFetchingOlderMessages] = useState(false);

  const [participants, setParticipants] = useState<Participant[]>([]);

  const {chatId} = route.params;
  // const CHAT_TOPIC = 'chat/6756cbb47b19daf3ef9e7048/messages';
  const CHAT_TOPIC = 'chat/+/messages';
  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    const mqttClient = getMqttClient();
    if (!mqttClient) {
      console.warn('MQTT client is not connected yet!');
      return;
    }

    const handleMessage = (topic: string, payload: Buffer) => {
      if (topic.startsWith('chat/') && topic.endsWith('/messages')) {
        const parsedMessage = JSON.parse(payload.toString());

        if (parsedMessage.origin === 'server') return;
        console.log('Message received:', parsedMessage);

        const sender = participants.find(
          (participant: {userId: string}) =>
            participant.userId === parsedMessage.senderId,
        );



        const profilePicture = sender?.profilePicture
          ? {uri: `${baseURLPhoto}${sender.profilePicture}`}
          : Icons.dummyProfile;
        const newMessage = {
          id: parsedMessage.messageId || Date.now().toString(),
          message: parsedMessage.content || '',
          isSender: parsedMessage.senderId === userId,
          timestamp: new Date(
            parsedMessage.timestamp || Date.now(),
          ).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          media: parsedMessage.media
            ? {
                uri: parsedMessage.media.startsWith('/')
                  ? `${baseURLPhoto}${parsedMessage.media}`
                  : parsedMessage.media,
              }
            : null,
          profilePicture,
        };

        setMessages(prevMessages => [...prevMessages, newMessage]);
        flatListRef.current?.scrollToEnd({animated: true});
      }
    };

    mqttClient.on('message', handleMessage);
    mqttClient.subscribe(CHAT_TOPIC, err => {
      if (err) {
        console.error('Subscription error:', err);
      } else {
        console.log(`Subscribed to topic in Group Chat: ${CHAT_TOPIC}`);
      }
    });

    return () => {
      mqttClient.unsubscribe(CHAT_TOPIC, (err: Error | null) => {
        if (err) {
          console.error('Unsubscribe error:', err);
        }
      });
      mqttClient.removeListener('message', handleMessage);
    };
  }, [userId]);

  // const fetchOlderMessages = async () => {
  //   if (isFetchingOlderMessages || !messages.length) return;
  //   try {
  //     setIsFetchingOlderMessages(true);
  //     const response = await getChatByChatId(chatId, messages[0]?.id, 5);
  //     console.log('response in group chat', response.data);
  //     if (response?.data?.messages?.length) {
  //       const {messages} = response.data;

  //       const processedMessages = messages.map(
  //         (msg: {
  //           messageId: any;
  //           content: any;
  //           senderId: string | null;
  //           timestamp: string | number | Date;
  //           media: string;
  //         }) => ({
  //           id: msg.messageId,
  //           message: msg.content,
  //           isSender: msg.senderId === userId,
  //           timestamp: new Date(msg.timestamp).toLocaleTimeString([], {
  //             hour: '2-digit',
  //             minute: '2-digit',
  //           }),
  //           media: msg.media
  //             ? {
  //                 uri: msg.media.startsWith('/')
  //                   ? `${baseURLPhoto}${msg.media}`
  //                   : msg.media,
  //               }
  //             : null,
  //         }),
  //       );

  //       console.log(
  //         'Fetched Messages (First 5):',
  //         processedMessages.slice(0, 5),
  //       );

  //       setMessages(prevMessages => {
  //         return [...processedMessages, ...prevMessages];
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching chat details in individual:', error);
  //   } finally {
  //     setIsFetchingOlderMessages(false);
  //   }
  // };

  const fetchOlderMessages = async () => {
    if (isFetchingOlderMessages || !messages.length) return;
  
    try {
      setIsFetchingOlderMessages(true);
      const response = await getChatByChatId(chatId, messages[0]?.id, 5);
  
      if (response?.data?.messages?.length) {
        const processedMessages = response.data.messages.map(msg => ({
          id: msg.messageId,
          message: msg.content,
          isSender: msg.senderId === userId,
          timestamp: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }));
  
        setMessages(prevMessages => [...processedMessages, ...prevMessages]);
      }
    } catch (error) {
      console.error('Error fetching chat details:', error);
    } finally {
      setIsFetchingOlderMessages(false);
    }
  };
  

  const handleSendMessage = async () => {
    if (!userId || (inputText.trim() === '' && !photo)) return;

    try {
      const mqttClient = getMqttClient();
      if (mqttClient) {
        const messagePayload = JSON.stringify({
          //messageId: response.data.messageId,
          chatId: chatId,
          content: inputText,
          senderId: userId,
          timestamp: new Date().toISOString(),
          media: photo || null,
          origin: 'client',
        });
        mqttClient.publish(`chat/${chatId}/messages`, messagePayload);
      }

      setInputText('');
      setPhoto(null);
      flatListRef.current?.scrollToEnd({animated: true});
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchChatDetails = async () => {
      try {
        if (!isMounted) return;
        const response = await getChatByChatId(chatId);
        if (response?.data) {
          const {messages, participants, groupName, groupIcon} = response.data;

          setParticipants(participants);

          const names = participants.map(
            (participant: {name: string}) => participant.name,
          );
          const profilePictures = participants.map(
            (participant: {profilePicture: string}) =>
              participant.profilePicture
                ? {uri: `${baseURLPhoto}${participant.profilePicture}`}
                : Icons.profilePicture1,
          );

          setParticipantNames(names);
          setHeaderProfilePictures(profilePictures);
          setGroupName(groupName || null);
          setGroupIcon(groupIcon ? {uri: `${baseURLPhoto}${groupIcon}`} : null);

          const messagesWithProfilePictures = messages.map(msg => {
            const sender = participants.find(
              (participant: {userId: string}) =>
                participant.userId === msg.senderId,
            );
            const profilePicture = sender?.profilePicture
              ? {uri: `${baseURLPhoto}${sender.profilePicture}`}
              : Icons.profilePicture1;

            return {
              id: msg.messageId,
              message: msg.content,
              isSender: msg.senderId === userId,
              timestamp: new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
              profilePicture,
            };
          });

          setMessages(messagesWithProfilePictures);
        }
      } catch (error) {
        console.error('Error fetching chat details:', error);
      }
    };
    fetchChatDetails();

    return () => {
      isMounted = false;
    };
  }, [chatId]);

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleFlatlist = debounce(() => {
    if (!isFirstLoaded) {
      fetchOlderMessages();
      setIsFirstLoaded(true);
    }
  }, 500);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardOpen(true),
    );
    const hideListener = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardOpen(false),
    );
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({animated: true});
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <CommonChatHeader
            groupName={groupName}
            groupIcon={groupIcon}
            profilePictures={headerProfilePictures}
            names={participantNames}
            onBackPress={() => navigation.goBack()}
            onNamePress={() => navigation.navigate('AboutGroup', {chatId})}
          />
          <FlatList
            ref={flatListRef}
            data={messages}
            // keyExtractor={item => item.id}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReached={handleFlatlist}
            renderItem={({item}) => (
              <ChatMessage
                message={item.message}
                isSender={item.isSender}
                timestamp={item.timestamp}
                isGroupChat={true}
                profilePicture={item.profilePicture}
              />
            )}
            contentContainerStyle={styles.messageList}
            onScroll={({nativeEvent}) => {
              if (
                nativeEvent.contentOffset.y <= 0 &&
                !isFetchingOlderMessages
              ) {
                fetchOlderMessages();
              }
            }}
            ListHeaderComponent={
              isFetchingOlderMessages ? (
                <ActivityIndicator
                  size="small"
                  color="#0000ff"
                  style={{marginVertical: 10}}
                />
              ) : null
            }
            keyboardShouldPersistTaps="handled"
          />
          <View
            style={[
              styles.inputWrapper,
              {paddingBottom: isKeyboardOpen ? 20 : 0},
            ]}>
            <CustomInputField
              lefticon="camera-alt"
              rightIcon="send"
              placeholder={Strings.TYPE_A_MESSAGE}
              placeholderTextStyle={styles.placeholderTextStyle}
              containerStyle={styles.inputContainer}
              value={inputText}
              onChangeText={setInputText}
              onFocus={scrollToEnd}
              textStyle={{color: Colors.darkBlue, letterSpacing: 1}}
              onRightIconPress={handleSendMessage}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  messageList: {
    padding: 20,
  },
  inputWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#FBFBFB',
  },
  inputContainer: {
    borderRadius: 25,
    backgroundColor: Colors.gray,
    padding: 10,
  },
  placeholderTextStyle: {
    color: Colors.darkBlue,
  },
});

export default GroupChatScreen;
