import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
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
  const [groupName, setGroupName] = useState<string | null>(null);

  const {chatId} = route.params;

  // const chatId: any = route.params;

  console.log('chatIdddd', chatId);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({animated: true});
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    const newMessage = {
      id: Date.now().toString(),
      message: inputText,
      isSender: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      profilePicture: Icons.dummyProfile,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
    setTimeout(scrollToEnd, 100);
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

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const response = await getChatByChatId(chatId);
        if (response?.data) {
          const {messages, participants, groupName} = response.data;

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

          setMessages(
            messages.map((msg: { messageId: any; content: any; senderId: string | null; timestamp: string | number | Date; profilePicture: any; }) => ({
              id: msg.messageId,
              message: msg.content,
              isSender: msg.senderId === userId,
              timestamp: new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
              profilePicture: msg.profilePicture
                ? {uri: `${baseURLPhoto}${msg.profilePicture}`}
                : Icons.profilePicture1,
            })),
          );
        }
      } catch (error) {
        console.error('Error fetching chat details:', error);
      }
    };

    fetchChatDetails();
  }, [chatId, userId]);

  useEffect(() => {
    if (groupName) {
      console.log('Group Name:', groupName);
    }
  }, [groupName]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <CommonChatHeader
            groupName={groupName}
            profilePictures={headerProfilePictures}
            names={participantNames}
            onBackPress={() => navigation.goBack()}
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
                isGroupChat={true}
                profilePicture={item.profilePicture}
              />
            )}
            contentContainerStyle={styles.messageList}
            //onContentSizeChange={scrollToEnd}
            //onLayout={scrollToEnd}
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
