import React, {useRef, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import CommonChatHeader from '../../components/chatComponent/ChatHeader';
import { Strings } from '../../utils/constants/strings';

const GroupChatScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: '1',
      message: 'Hi there!',
      isSender: true,
      timestamp: '10:00 AM',
      profilePicture: Icons.profilePicture1,
    },
    {
      id: '2',
      message: `Hey! I hope you’re doing well. Let me know if you're free tomorrow to finalize the details.`,
      isSender: false,
      timestamp: '10:01 AM',
      profilePicture: Icons.profilePicture2,
    },
    {
      id: '3',
      message: 'I am good, thank you!',
      isSender: true,
      timestamp: '10:02 AM',
      profilePicture: Icons.profilePicture1,
    },
    {
      id: '4',
      message: 'Sure! Let’s plan for noon.',
      isSender: true,
      timestamp: '10:03 AM',
      profilePicture: Icons.profilePicture1,
    },
    {
      id: '5',
      message: `Sounds good. Don't forget the notes we discussed.`,
      isSender: false,
      timestamp: '10:05 AM',
      profilePicture: Icons.profilePicture3,
    },
    {
      id: '6',
      message: 'Got it. I’ll bring them along.',
      isSender: true,
      timestamp: '10:07 AM',
      profilePicture: Icons.profilePicture1,
    },
    {
      id: '7',
      message: `By the way, did you get a chance to check my email?`,
      isSender: false,
      timestamp: '10:08 AM',
      profilePicture: Icons.profilePicture2,
    },
    {
      id: '8',
      message: 'Not yet. I’ll check it out today.',
      isSender: true,
      timestamp: '10:10 AM',
      profilePicture: Icons.profilePicture1,
    },
    {
      id: '9',
      message: `Okay. Let’s discuss the changes when you’ve reviewed it.`,
      isSender: false,
      timestamp: '10:12 AM',
      profilePicture: Icons.profilePicture3,
    },
    {
      id: '10',
      message: `Sure. Is there anything urgent?`,
      isSender: true,
      timestamp: '10:14 AM',
      profilePicture: Icons.profilePicture1,
    },
    {
      id: '11',
      message: `Yes, there's a meeting on Friday afternoon. Can you confirm your availability?`,
      isSender: false,
      timestamp: '10:15 AM',
      profilePicture: Icons.profilePicture2,
    },
    {
      id: '12',
      message: `I’ll check my schedule and let you know.`,
      isSender: true,
      timestamp: '10:17 AM',
      profilePicture: Icons.profilePicture1,
    },
    {
      id: '13',
      message: `Thanks! Also, don’t forget to RSVP for the team event next month.`,
      isSender: false,
      timestamp: '10:18 AM',
      profilePicture: Icons.profilePicture3,
    },
    {
      id: '14',
      message: `Will do! Looking forward to it.`,
      isSender: true,
      timestamp: '10:20 AM',
      profilePicture: Icons.profilePicture1,
    },
    {
      id: '15',
      message: `Have you tried the new restaurant near the office?`,
      isSender: false,
      timestamp: '10:22 AM',
      profilePicture: Icons.profilePicture2,
    },
    {
      id: '16',
      message: `Not yet, but I’ve heard good reviews. Let’s plan a visit!`,
      isSender: true,
      timestamp: '10:24 AM',
      profilePicture: Icons.profilePicture1,
    },
    {
      id: '17',
      message: `Absolutely! I’ll check the menu and let you know.`,
      isSender: false,
      timestamp: '10:25 AM',
      profilePicture: Icons.profilePicture3,
    },
    {
      id: '18',
      message: `Thanks! Let’s catch up soon.`,
      isSender: true,
      timestamp: '10:27 AM',
      profilePicture: Icons.profilePicture1,
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

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
      profilePicture: Icons.profilePicture1,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
    setTimeout(scrollToEnd, 100);
  };

  React.useEffect(() => {
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
              Icons.profilePicture1,
              Icons.profilePicture2,
              Icons.profilePicture3,
              Icons.profilePicture1,
              Icons.profilePicture2,
              Icons.profilePicture3,
            ]}
            names={[
              'Ishika',
              'Ayushi',
              'Rahul',
              'Ankit',
              'Neha',
              'Siddharth',
              'Riya',
              'Priya',
              'Kunal',
            ]}
            onBackPress={() => console.log('Back Pressed')}
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
