// import React from 'react';
// import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import {Colors} from '../../utils/constants/colors';

// type GroupChatItemProps = {
//   members?: {id: number; name: string; profilePicture?: {uri: string}}[];
//   groupName?: string;
//   lastMessage: string;
//   time: string;
//   unreadCount: number;
//   onPress: () => void;
  
// };

// const GroupChatItem: React.FC<GroupChatItemProps> = ({
//   members,
//   groupName,
//   lastMessage,
//   time,
//   unreadCount,
//   onPress,
// }) => {
//   const latestMembers = members.slice(-4);

//   return (
//     <TouchableOpacity onPress={onPress} style={styles.container}>
//       <View style={styles.dpContainer}>
//         {latestMembers.map((member, index) => (
//           <Image
//             key={member.id}
//             source={member.profilePicture}
//             style={[
//               styles.gridImage,
//               index === latestMembers.length - 1 && styles.lastImage,
//               index === 0
//                 ? styles.topLeft
//                 : index === 1
//                 ? styles.topRight
//                 : index === 2
//                 ? styles.bottomLeft
//                 : styles.bottomRight,
//             ]}
//           />
//         ))}
//       </View>

//       <View style={styles.content}>
//         <View style={styles.header}>
//           <Text style={styles.groupName}>
//             {groupName || members.map(member => member.name).join(', ')}
//           </Text>
//           <Text style={styles.time}>{time}</Text>
//         </View>
//         <View style={styles.footer}>
//           <Text style={styles.lastMessage} numberOfLines={1}>
//             {lastMessage}
//           </Text>
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
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   dpContainer: {
//     width: 50,
//     height: 50,
//     position: 'relative',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   gridImage: {
//     width: 23,
//     height: 23,
//     borderRadius: 10,
//     position: 'absolute',
//   },
//   lastImage: {
//     width: 28,
//     height: 28,
//     borderRadius: 12,
//   },
//   topLeft: {
//     top: 0,
//     left: 0,
//   },
//   topRight: {
//     top: 0,
//     right: 0,
//   },
//   bottomLeft: {
//     bottom: 0,
//     left: 0,
//   },
//   bottomRight: {
//     bottom: 0,
//     right: 0,
//   },
//   content: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   groupName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: Colors.darkBlue,
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
//     color: Colors.white,
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
// });

// export default GroupChatItem;



import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../utils/constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type GroupChatItemProps = {
  members?: {id: number; name: string; profilePicture?: {uri: string}}[];
  groupName?: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  onPress: () => void;
  isPinned?: boolean;
};

const GroupChatItem: React.FC<GroupChatItemProps> = ({
  members,
  groupName,
  lastMessage,
  time,
  unreadCount,
  onPress,
  isPinned,
}) => {
  const latestMembers = members.slice(-4);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.dpContainer}>
        {latestMembers.map((member, index) => (
          <Image
            key={member.id}
            source={member.profilePicture}
            style={[
              styles.gridImage,
              index === latestMembers.length - 1 && styles.lastImage,
              index === 0
                ? styles.topLeft
                : index === 1
                ? styles.topRight
                : index === 2
                ? styles.bottomLeft
                : styles.bottomRight,
            ]}
          />
        ))}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.groupName}>
            {groupName || members.map(member => member.name).join(', ')}
          </Text>
          <Text style={styles.time}>{time}</Text>
          {isPinned && (
            <FontAwesome name="thumbtack" size={20} color={Colors.darkBlue} style={styles.pinIcon} />
          )}
        </View>
        <View style={styles.footer}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {lastMessage}
          </Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dpContainer: {
    width: 50,
    height: 50,
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridImage: {
    width: 23,
    height: 23,
    borderRadius: 10,
    position: 'absolute',
  },
  lastImage: {
    width: 28,
    height: 28,
    borderRadius: 12,
  },
  topLeft: {
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkBlue,
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
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  pinIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default GroupChatItem;
