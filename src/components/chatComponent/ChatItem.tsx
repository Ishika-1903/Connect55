import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../utils/constants/colors';
import {getInitials} from '../../utils/utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ChatItemProps = {
  profilePicture?: {uri: string};
  name: string;
  lastMessage?: string;
  time?: string;
  unreadCount?: number;
  pinned?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  isPinned?: boolean;
  rightContent?: React.ReactNode;
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
  rightContent,
}) => {
  const renderProfilePicture = () => {
    if (profilePicture) {
      return <Image source={profilePicture} style={styles.profilePicture} />;
    } else {
      const initials = getInitials(name);
      return (
        <View style={styles.intialsProfile}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      {renderProfilePicture()}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <View style={styles.footer}>
  <Text style={styles.lastMessage}>{lastMessage}</Text>
  <View style={styles.footerRight}>
    {isPinned && <MaterialIcons name="push-pin" size={16} color={Colors.darkBlue} />}
    {unreadCount > 0 && (
      <View style={styles.unreadBadge}>
        <Text style={styles.unreadCount}>{unreadCount}</Text>
      </View>
    )}
  </View>
</View>

      </View>
      {rightContent ? (
        <View style={styles.rightContent}>{rightContent}</View>
      ) : (
        isPinned && <Text style={styles.pinIcon}>📌</Text>
      )}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  intialsProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 18,
    color: Colors.darkBlue,
    marginLeft: 10,
  },
  rightContent: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ChatItem;
