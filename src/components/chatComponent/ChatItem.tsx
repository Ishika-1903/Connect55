// import React from 'react';
// import {View, Text, Image, StyleSheet} from 'react-native';
// import {Colors} from '../../utils/constants/colors';
// import {TouchableOpacity} from 'react-native-gesture-handler';

// type ChatItemProps = {
//   profilePicture?: {uri: string} | number;
//   name: string;
//   lastMessage?: string;
//   time?: string;
//   unreadCount?: number;
//   onPress?: () => void;
//   onLongPress?: () => void;
//   isPinned?: boolean;
// };

// const ChatItem: React.FC<ChatItemProps> = ({
//   profilePicture,
//   name,
//   lastMessage,
//   time,
//   unreadCount,
//   onPress,
//   onLongPress 

// }) => {
//   return (
//     <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={styles.container}>
//       <Image source={profilePicture} style={styles.profilePicture} />
//       <View style={styles.content}>
//         <View style={styles.header}>
//           <Text style={styles.name}>{name}</Text>
//           <Text style={styles.time}>{time}</Text>
//         </View>
//         <View style={styles.footer}>
//           <Text style={styles.lastMessage}>{lastMessage}</Text>
//           {unreadCount > 0 && (
//             <View style={styles.unreadBadge}>
//               <Text style={styles.unreadCount}>{unreadCount}</Text>
//             </View>
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     padding: 15,
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   profilePicture: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     resizeMode: 'cover',
//   },
//   content: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'darkblue',
//   },
//   time: {
//     fontSize: 12,
//     color: 'gray',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   lastMessage: {
//     fontSize: 14,
//     color: 'gray',
//     flex: 1,
//   },
//   unreadBadge: {
//     backgroundColor: Colors.darkBlue,
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//   },
//   unreadCount: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
// });

// export default ChatItem;





import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors} from '../../utils/constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ChatItemProps = {
  profilePicture?: {uri: string} | number;
  name: string;
  lastMessage?: string;
  time?: string;
  unreadCount?: number;
  onPress?: () => void;
  onLongPress?: () => void;
  isPinned?: boolean;
};

const ChatItem: React.FC<ChatItemProps> = ({
  profilePicture,
  name,
  lastMessage,
  time,
  unreadCount,
  onPress,
  onLongPress,
  isPinned,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Image source={profilePicture} style={styles.profilePicture} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
          {isPinned && (
            <MaterialIcons
              name="push-pin"
              size={20}
              color={Colors.darkBlue}
              style={styles.pinIcon}
            />
          )}
        </View>
        <View style={styles.footer}>
          <Text style={styles.lastMessage}>{lastMessage}</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'darkblue',
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: 'gray',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: Colors.darkBlue,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  unreadCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pinIcon: {
    position: 'absolute',
    right: -20,
  },
});

export default ChatItem;
