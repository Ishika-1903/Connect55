import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../utils/constants/colors';

type ChatHeaderProps = {
  profilePictures: ImageSourcePropType[];
  names: string[];
  onBackPress: () => void;
};

const CommonChatHeader: React.FC<ChatHeaderProps> = ({
  profilePictures,
  names,
  onBackPress,
}) => {
  const renderProfilePictures = () => {
    const picturesToShow = profilePictures.slice(0, 4);

    const getPositionStyles = (index: number) => {
      if (picturesToShow.length === 1) return styles.singlePicture;
      if (picturesToShow.length === 2) {
        return index === 0 ? styles.leftHalf : styles.rightHalf;
      }
      if (picturesToShow.length === 3) {
        return index === 0
          ? styles.topCenter
          : index === 1
          ? styles.bottomLeft
          : styles.bottomRight;
      }
      return index === 0
        ? styles.topLeft
        : index === 1
        ? styles.topRight
        : index === 2
        ? styles.bottomLeft
        : styles.bottomRight;
    };

    return (
      <View style={styles.profilePictureWrapper}>
        {picturesToShow.map((picture, index) => (
          <Image
            key={index}
            source={picture}
            style={[styles.profileBubble, getPositionStyles(index)]}
          />
        ))}
      </View>
    );
  };

  const renderNames = () => {
    if (names.length <= 3) {
      return names.join(', ');
    }
    const displayedNames = names.slice(0, 3).join(', ');
    const remainingCount = names.length - 3;
    return `${displayedNames} +${remainingCount} others`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} style={styles.backIcon} />
      </TouchableOpacity>
      {renderProfilePictures()}
      <Text style={styles.name} numberOfLines={1}>
        {renderNames()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    color: Colors.darkBlue,
  },
  profilePictureWrapper: {
    width: 50,
    height: 50,
    position: 'relative',
    marginRight: 10,
  },
  profileBubble: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  singlePicture: {
    top: 5,
    left: 5,
    width: 44,
    height: 44,
    borderRadius: 30,
  },
  leftHalf: {
    left: 5,
    top: 13,
  },
  rightHalf: {
    right: 5,
    top: 13,
  },
  topCenter: {
    top: 5,
    left: 13,
  },
  topLeft: {
    top: 5,
    left: 5,
  },
  topRight: {
    top: 5,
    right: 5,
  },
  bottomLeft: {
    bottom: 5,
    left: 5,
  },
  bottomRight: {
    bottom: 5,
    right: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkBlue,
    flex: 1,
  },
});

export default CommonChatHeader;
