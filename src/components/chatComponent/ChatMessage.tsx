// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { Colors } from '../../utils/constants/colors';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// type MediaType = {
//   uri: string;
//   name: string;
//   type: string;
//   size: number;
// };

// type ChatMessageProps = {
//   message: string;
//   isSender: boolean;
//   timestamp: string;
//   isGroupChat?: boolean;
//   profilePicture?: { uri: string } | number;
//   media?: MediaType;
//   onMediaPress?: () => void;
//   status?: 'delivered' | 'seen';
// };

// const ChatMessage: React.FC<ChatMessageProps> = ({
//   message,
//   isSender,
//   timestamp,
//   isGroupChat,
//   profilePicture,
//   media,
//   onMediaPress,
//   status,
// }) => {
//   return (
//     <View
//       style={[
//         styles.messageContainer,
//         isSender ? styles.senderContainer : styles.receiverContainer,
//       ]}
//     >
//       {!isSender && isGroupChat && profilePicture && (
//         <Image source={profilePicture} style={styles.profilePicture} />
//       )}

//       <View
//         style={[
//           styles.messageBubble,
//           isSender ? styles.senderBubble : styles.receiverBubble,
//           media ? styles.mediaBubble : {},
//         ]}
//       >
//         {media ? (
//           <TouchableOpacity onPress={onMediaPress} disabled={!onMediaPress}>
//             <Image
//               source={{ uri: media.uri }}
//               style={styles.mediaPreview}
//               resizeMode="cover"
//             />
//           </TouchableOpacity>
//         ) : (
//           <Text
//             style={[
//               styles.messageText,
//               { color: isSender ? Colors.white : Colors.black },
//             ]}
//           >
//             {message}
//           </Text>
//         )}
//         <Text style={styles.timestamp}>{timestamp}</Text>

//         {isSender && status && (
//           <MaterialIcons
//             name={status === 'seen' ? 'check-circle' : 'check'}
//             size={15}
//             color={status === 'seen' ? 'yellow' : Colors.gray}
//             style={styles.statusIcon}
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   messageContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     marginVertical: 10,
//   },
//   senderContainer: {
//     justifyContent: 'flex-end',
//   },
//   receiverContainer: {
//     justifyContent: 'flex-start',
//   },
//   messageBubble: {
//     maxWidth: '95%',
//     padding: 10,
//     borderRadius: 10,
//     alignSelf: 'flex-start',
//   },
//   senderBubble: {
//     backgroundColor: '#1F509A',
//     marginRight: 10,
//     alignSelf: 'flex-end',
//   },
//   receiverBubble: {
//     backgroundColor: Colors.gray,
//     marginLeft: 10,
//     alignSelf: 'flex-start',
//   },
//   mediaBubble: {
//     padding: 0,   },
//   mediaPreview: {
//     width: 200,
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 5,
//   },
//   messageText: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   timestamp: {
//     fontSize: 10,
//     color: Colors.darkGray,
//     alignSelf: 'flex-end',
//   },
//   profilePicture: {
//     width: 30,
//     height: 30,
//     borderRadius: 20,
//     marginHorizontal: 5,
//   },
//   statusIcon: {
//     position: 'absolute',
//     right: 0,
//     left:40,
//     bottom: 5,
//   },
// });

// export default ChatMessage;

import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors} from '../../utils/constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
  profilePicture?: {uri: string} | number;
  media?: MediaType;
  onMediaPress?: () => void;
  status?: 'delivered' | 'seen';
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isSender,
  timestamp,
  isGroupChat,
  profilePicture,
  media,
  onMediaPress,
  status = 'seen',
}) => {
  return (
    <View
      style={[
        styles.messageContainer,
        isSender ? styles.senderContainer : styles.receiverContainer,
      ]}>
      {!isSender && isGroupChat && profilePicture && (
        <Image source={profilePicture} style={styles.profilePicture} />
      )}

      <View
        style={[
          styles.messageBubble,
          isSender ? styles.senderBubble : styles.receiverBubble,
          media ? styles.mediaBubble : {},
        ]}>
        {media ? (
          <TouchableOpacity onPress={onMediaPress} disabled={!onMediaPress}>
            <Image
              source={{uri: media.uri}}
              style={styles.mediaPreview}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          <Text
            style={[
              styles.messageText,
              {color: isSender ? Colors.white : Colors.black},
            ]}>
            {message}
          </Text>
        )}

        <View style={styles.timestampContainer}>
          <Text style={styles.timestamp}>{timestamp}</Text>

          {isSender && status && (
            <MaterialIcons
              name="done-all"
              size={15}
              color={status === 'seen' ? '#00FFFF' : 'white'}
              style={styles.statusIcon}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  senderContainer: {
    justifyContent: 'flex-end',
  },
  receiverContainer: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '95%',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row', // Align message and timestamp in a row
    justifyContent: 'space-between', // Space between message text and timestamp
  },
  senderBubble: {
    backgroundColor: '#1F509A',
    alignSelf: 'flex-end',
  },
  receiverBubble: {
    backgroundColor: Colors.gray,

    alignSelf: 'flex-start',
  },
  mediaBubble: {
    padding: 0,
  },
  mediaPreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  messageText: {
    fontSize: 14,
    marginRight: 5,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 4,
  },
  timestamp: {
    fontSize: 10,
    color: Colors.darkGray,
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  statusIcon: {
    marginLeft: 5,
  },
});

export default ChatMessage;
