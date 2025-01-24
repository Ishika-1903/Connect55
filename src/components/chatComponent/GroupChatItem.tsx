import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../utils/constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icons from '../../utils/constants/Icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type GroupChatItemProps = {
  members?: {id: number; name: string; profilePicture?: {uri: string}}[];
  groupName?: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  onPress: () => void;
  onLongPress?: () => void;
  isPinned?: boolean;
  groupIcon?: {uri: string};
  rightContent?: React.ReactNode;
};

const GroupChatItem: React.FC<GroupChatItemProps> = ({
  members,
  groupName,
  lastMessage,
  time,
  unreadCount = 2,
  onPress,
  onLongPress,
  isPinned = true,
  groupIcon,
  rightContent,
}) => {
  const displayedMembers = members?.slice(-4) || [];

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <View style={styles.dpContainer}>
        {groupIcon ? (
          <Image source={groupIcon} style={styles.groupIcon} />
        ) : (
          <View style={styles.profileImagesContainer}>
            {displayedMembers.map((member, index) => (
              <Image
                key={index}
                source={member.profilePicture || Icons.dummyProfile}
                style={[styles.gridImage, {marginLeft: index > 0 ? -10 : 0}]}
              />
            ))}
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.groupName}>
            {groupName || members?.map(member => member.name).join(', ')}
          </Text>
          <Text style={styles.time}>{time}</Text>
          {/* {isPinned && (
            <FontAwesome
              name="thumbtack"
              size={20}
              color={Colors.darkBlue}
              style={styles.pinIcon}
            />
          )} */}
        </View>
        <View style={styles.footer}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {lastMessage}
          </Text>
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
    backgroundColor: Colors.white,
  },
  dpContainer: {
    width: 40,
    height: 40,
    position: 'relative',
  },
  profileImagesContainer: {
    flexDirection: 'row',
  },
  gridImage: {
    width: 25,
    height: 25,
    borderRadius: 25,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 25,
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
    marginLeft: 2,
    marginTop: 2,
    right: 2,
  },
  rightContent: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GroupChatItem;
