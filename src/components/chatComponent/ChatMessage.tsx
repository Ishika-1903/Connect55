import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../utils/constants/colors';

type MediaType = {
  uri: string;
  name: string;
  type: string;
  size: number;
};

type ChatMessageProps = {
  message: string;
  isSender: boolean;
  timestamp: string;
  isGroupChat?: boolean;
  profilePicture?: { uri: string } | number;
  media?: MediaType;
  onMediaPress?: () => void;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isSender,
  timestamp,
  isGroupChat,
  profilePicture,
  media,
  onMediaPress,
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
          media ? styles.mediaBubble : {}, 
        ]}
      >
        {media ? (
          <TouchableOpacity onPress={onMediaPress} disabled={!onMediaPress}>
            <Image
              source={{ uri: media.uri }}
              style={styles.mediaPreview}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          <Text
            style={[
              styles.messageText,
              { color: isSender ? Colors.white : Colors.black },
            ]}
          >
            {message}
          </Text>
        )}
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
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  senderBubble: {
    backgroundColor: '#1F509A',
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  receiverBubble: {
    backgroundColor: Colors.gray,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  mediaBubble: {
    padding: 0, // Remove padding to avoid distortion around the image
  },
  mediaPreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  messageText: {
    fontSize: 14,
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 10,
    color: Colors.darkGray,
    alignSelf: 'flex-end',
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  },
});

export default ChatMessage;
