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
  unreadCount = 2,
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
        </View>
        <View style={styles.footer}>
          <Text style={styles.lastMessage}>{lastMessage}</Text>
        </View>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.time}>{time}</Text>
        <View style={styles.rightIcons}>
          {isPinned && (
            <MaterialIcons
              name="push-pin"
              size={20}
              color={Colors.darkBlue}
              style={styles.pinIcon}
            />
          )}
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
    marginBottom: 5,
    textAlign: 'right',
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
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  unreadCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pinIcon: {
    marginLeft: 2,
    marginTop: 2,
    right: 2,
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
});

export default ChatItem;
