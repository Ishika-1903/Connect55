import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../../utils/constants/colors';

type ChatMessageProps = {
  message: string;
  isSender: boolean;
  timestamp: string;
  isGroupChat?: boolean; 
  profilePicture?: { uri: string } | number;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isSender,
  timestamp,
  isGroupChat,
  profilePicture,
}) => {
  return (
    <View
      style={[
        styles.messageContainer,
        isSender ? styles.senderContainer : styles.receiverContainer,
      ]}
    >
      {!isSender && isGroupChat && profilePicture && (
        <Image source={profilePicture} style={styles.profilePicture} />
      )}


      <View
        style={[
          styles.messageBubble,
          isSender ? styles.senderBubble : styles.receiverBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: isSender ? Colors.white : 'black' },
          ]}
        >
          {message}
        </Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  senderContainer: {
    justifyContent: 'flex-end',
  },
  receiverContainer: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 5,
    borderRadius: 15,
  },
  senderBubble: {
    backgroundColor: '#1F509A',
    marginRight: 10,
  },
  receiverBubble: {
    backgroundColor: Colors.gray,
    marginLeft: 10,
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    color: 'gray',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  
  },
});

export default ChatMessage;
