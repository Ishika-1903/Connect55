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
import IndividualChatHeader from '../../components/chatComponent/ChatHeader';
import { Strings } from '../../utils/constants/strings';

const IndividualChatScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [messages, setMessages] = useState([
    {id: '1', message: 'Hi there!', isSender: true, timestamp: '10:00 AM'},
    {
      id: '2',
      message: 'Hello! How are you?',
      isSender: false,
      timestamp: '10:01 AM',
    },
    {
      id: '3',
      message: 'I am good, thank you!',
      isSender: true,
      timestamp: '10:02 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const onBackPress = () => {
    navigation.goBack();
  };

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
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
    scrollToEnd();
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
          <IndividualChatHeader
            profilePictures={[Icons.profilePicture1]} 
            names={['Ishika']} 
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
              />
            )}
            contentContainerStyle={styles.messageList}
            onContentSizeChange={scrollToEnd}
            onLayout={scrollToEnd}
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
              lefticonStyle={{marginHorizontal:10,}}
              rightIconStyle={{marginHorizontal:10,}}
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

export default IndividualChatScreen;
