import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import ChatMessage from '../../components/chatComponent/ChatMessage';
import {Colors} from '../../utils/constants/colors';
import CustomInputField from '../../components/inputField/CustomInputField';
import {useNavigation} from '@react-navigation/native';
import {Strings} from '../../utils/constants/strings';
import {getChatByChatId, sendMessage} from '../../apis/chat/chat';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../controller/store';
import {CustomModal} from '../../components/CustomModal/CustomModal';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {baseURLPhoto} from '../../apis/apiConfig';
import {getMqttClient} from '../../utils/mqttClient';
import {getUserData} from '../../apis/auth/auth';
import Icons from '../../utils/constants/Icons';
import CommonChatHeader from '../../components/chatComponent/ChatHeader';

const IndividualChatScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList<any>>(null);
  const route = useRoute();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const {chatId} = route.params;

  const chatUserId = useSelector((state: RootState) => state.auth.chatUserId);
  console.log('chatuserIdddd', chatUserId);
  const [userData, setUserData] = useState<{
    data: {
      name: string;
      profilePicture: string | null;
    };
  } | null>(null);

  useEffect(() => {
    if (chatUserId) {
      const fetchUserData = async () => {
        try {
          const response = await getUserData(chatUserId);
          console.log('Fetched user data:', response.data);
          setUserData(response);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [chatUserId]);

  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState<{
    uri: string;
    name: string;
    type: string;
    size: number;
  } | null>(null);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const CHAT_TOPIC = 'chat/6756cbb47b19daf3ef9e7048/messages';

  const onBackPress = () => {
    navigation.goBack();
  };

  const handleCameraLaunch = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorCode);
      } else {
        const imageUri = response.assets?.[0]?.uri;
        const imageName =
          response.assets?.[0]?.fileName || 'profile_picture.jpg';
        const imageType = response.assets?.[0]?.type || 'image/jpeg';
        const imageSize = response.assets?.[0]?.fileSize || 0;

        if (imageUri) {
          setPhoto({
            uri: imageUri,
            name: imageName,
            type: imageType,
            size: imageSize,
          });
        }
      }

      setModalVisible(false);
    });
  };

  const handleGalleryLaunch = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled gallery');
      } else if (response.errorCode) {
        console.log('Gallery Error: ', response.errorCode);
      } else {
        const imageUri = response.assets?.[0]?.uri;
        const imageName =
          response.assets?.[0]?.fileName || 'profile_picture.jpg';
        const imageType = response.assets?.[0]?.type || 'image/jpeg';
        const imageSize = response.assets?.[0]?.fileSize || 0;

        if (imageUri) {
          setPhoto({
            uri: imageUri,
            name: imageName,
            type: imageType,
            size: imageSize,
          });
        }
      }
      setModalVisible(false);
    });
  };

  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({animated: true});
  };

  useEffect(() => {
    console.log('hey in individualllll');
    const mqttClient = getMqttClient();

    if (!mqttClient) {
      console.warn('MQTT client is not connected yet!');
      return;
    }

    const handleMessage = (topic: string, payload: Buffer) => {
      if (topic === CHAT_TOPIC) {
        const parsedMessage = JSON.parse(payload.toString());
        console.log('Message received:', parsedMessage);

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
        };

        setMessages(prevMessages => {
          return [...prevMessages, newMessage];
        });

        flatListRef.current?.scrollToEnd({animated: true});
      }
    };

    mqttClient.on('message', handleMessage);
    mqttClient.subscribe(CHAT_TOPIC, err => {
      if (err) {
        console.error('Subscription error:', err);
      } else {
        console.log(`Subscribeddddddd to topic: ${CHAT_TOPIC}`);
      }
    });

    return () => {
      mqttClient.unsubscribe(CHAT_TOPIC, (err: Error | null) => {
        if (err) {
          console.error('Unsubscribe error:', err);
        } else {
          console.log(`Unsubscribed from topic: ${CHAT_TOPIC}`);
        }
      });
      mqttClient.removeListener('message', handleMessage);
    };
  }, [userId]);

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const response = await getChatByChatId(chatId);
        if (response?.data) {
          const {messages} = response.data;
          setMessages(
            messages.map(
              (msg: {
                messageId: any;
                content: any;
                senderId: string | null;
                timestamp: string | number | Date;
                media: string;
              }) => ({
                id: msg.messageId,
                message: msg.content,
                isSender: msg.senderId === userId,
                timestamp: new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
                media: msg.media
                  ? {
                      uri: msg.media.startsWith('/')
                        ? `${baseURLPhoto}${msg.media}`
                        : msg.media,
                    }
                  : null,
              }),
            ),
          );
        }
      } catch (error) {
        console.error('Error fetching chat details:', error);
      }
    };

    fetchChatDetails();
  }, [chatId, userId]);

  const handleSendMessage = async () => {
    if (!userId) {
      console.error('Error: userId is null or undefined');
      return;
    }

    if (inputText.trim() === '' && !photo) return;
    try {
      const response = await sendMessage(chatId, userId, inputText, photo);

      const newMessage = {
        id: response.data.messageId,
        message: inputText,
        isSender: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        media: photo ? {...photo} : null,
      };
      console.log('response in individual', response);

      const mqttClient = getMqttClient();
      if (mqttClient) {
        const messagePayload = JSON.stringify({
          messageId: response.data.messageId,
          content: inputText,
          senderId: userId,
          timestamp: new Date().toISOString(),
          media: photo || null,
        });
        mqttClient.publish(CHAT_TOPIC, messagePayload);
      }
      setInputText('');
      setPhoto(null);
      flatListRef.current?.scrollToEnd({animated: true});
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <CommonChatHeader
            profilePictures={[
              userData?.data.profilePicture
                ? {uri: `${baseURLPhoto}${userData?.data.profilePicture}`}
                : Icons.dummyProfile,
            ]}
            names={[userData?.data.name || 'Unknown']}
            onBackPress={onBackPress}
            groupName={null}
            onNamePress={() => navigation.navigate('Profile', { chatUserId })}
          />
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ChatMessage
                message={item.message}
                isSender={item.isSender}
                timestamp={item.timestamp}
                media={item.media}
              />
            )}
            contentContainerStyle={styles.messageList}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({animated: true})
            }
            onLayout={() => flatListRef.current?.scrollToEnd({animated: true})}
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
              lefticonStyle={{marginHorizontal: 10}}
              rightIconStyle={{marginHorizontal: 10}}
              placeholder={Strings.TYPE_A_MESSAGE}
              placeholderTextStyle={styles.placeholderTextStyle}
              containerStyle={styles.inputContainer}
              value={inputText}
              onChangeText={setInputText}
              onFocus={scrollToEnd}
              textStyle={{color: Colors.darkBlue, letterSpacing: 1}}
              onRightIconPress={handleSendMessage}
              onLeftconPress={openModal}
            />
            {photo && (
              <View style={styles.imagePreviewContainer}>
                <Image source={{uri: photo.uri}} resizeMode="cover" />
              </View>
            )}
          </View>

          <CustomModal
            title="Send Photo"
            visible={isModalVisible}
            onClose={closeModal}
            containerStyle={styles.containerStyle}
            buttons={[
              {
                text: 'Camera',
                onPress: handleCameraLaunch,
                buttonStyle: styles.modalButton,
                textStyle: styles.modalButtonText,
              },
              {
                text: 'Gallery',
                onPress: handleGalleryLaunch,
                buttonStyle: styles.modalButton,
                textStyle: styles.modalButtonText,
              },
            ]}
          />
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
  imagePreviewContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderTextStyle: {
    color: Colors.darkBlue,
  },
  containerStyle: {
    width: '75%',
    backgroundColor: '#FBFBFB',
  },
  modalButton: {
    backgroundColor: Colors.darkBlue,
    borderRadius: 20,
    marginTop: 10,
    width: '50%',
    padding: 12,
  },
  modalButtonText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default IndividualChatScreen;
