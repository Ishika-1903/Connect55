import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  ImageSourcePropType,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TCText} from '../../components/text/CustomText';
import CommonHeader from '../../components/header/CommonHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors} from '../../utils/constants/colors';
import Icons from '../../utils/constants/Icons';
import {getChatByChatId} from '../../apis/chat/chat';
import {baseURLPhoto} from '../../apis/apiConfig';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {CustomModal} from '../../components/CustomModal/CustomModal';
import {Strings} from '../../utils/constants/strings';
import {updateGroup} from '../../apis/chat/chat';
import {useSelector} from 'react-redux';
import { styles } from './AboutGroupScreen.styles';

type Participant = {
  name: string;
  profilePicture: string | null;
  userId: string;
  isAdmin?: boolean;
};

const AboutGroupScreen: React.FC = () => {
  const route = useRoute();
  const {chatId} = route.params as {chatId: string};
  const navigation = useNavigation();

  const [groupName, setGroupName] = useState<string>('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [groupIcon, setGroupIcon] = useState<ImageSourcePropType | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState<{
    uri: string;
    name: string;
    type: string;
    size: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = useSelector((state: any) => state.auth.userId);
  const [isAdmin, setIsAdmin] = useState(false); // Add this state to track if the user is an admin

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const response = await getChatByChatId(chatId);
        if (response?.data) {
          const {groupName, participants, groupAdmin, groupIcon} =
            response.data;
          if (groupAdmin.includes(userId)) {
            setIsAdmin(true);
            console.log('Current user is an admin');
          } else {
            setIsAdmin(false);
          }

          const updatedParticipants = participants.map(
            (participant: Participant) => {
              return {
                ...participant,
                profilePicture: participant.profilePicture
                  ? {uri: `${baseURLPhoto}${participant.profilePicture}`}
                  : Icons.dummyProfile,
                isAdmin: groupAdmin.includes(participant.userId),
              };
            },
          );

          setGroupName(groupName);
          setParticipants(updatedParticipants);
          setGroupIcon(
            groupIcon
              ? {uri: `${baseURLPhoto}${groupIcon}`}
              : Icons.defaultGroupIcon,
          );
        }
      } catch (error) {
        console.error('Error fetching chat details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatDetails();
  }, [chatId, userId]);

  const closeModal = () => setModalVisible(false);

  const displayGroupName =
    groupName || participants.map(p => p.name).join(', ');

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.darkBlue} />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <CommonHeader
              leftContent={
                <View style={styles.leftContent}>
                  <MaterialIcons
                    name="arrow-back"
                    size={25}
                    style={styles.icon}
                    onPress={() => navigation.goBack()}
                  />
                </View>
              }
              rightContent={
                isAdmin && (
                  <View
                    style={styles.leftContent}
                    onStartShouldSetResponder={() => true}
                    onResponderRelease={() => setIsEditing(true)}>
                    <MaterialIcons
                      name="edit"
                      size={25}
                      color={Colors.darkBlue}
                      onPress={() =>
                        navigation.navigate('EditAboutGroup', {chatId})
                      }
                    />
                  </View>
                )
              }
            />
          </View>

          <View style={styles.profilePhotoContainer}>
            <View style={styles.profilePhotoWrapper}>
              {groupIcon ? (
                <Image source={groupIcon} style={styles.profilePhoto} />
              ) : (
                <Image
                  source={
                    profilePicture
                      ? {uri: profilePicture.uri}
                      : Icons.dummyProfile
                  }
                  style={styles.profilePhoto}
                />
              )}
            </View>

            <TCText style={styles.groupName}>{displayGroupName}</TCText>
          </View>

          <TCText style={styles.sectionHeading}>{Strings.GROUP_MEMBERS}</TCText>
          <FlatList
            data={participants}
            keyExtractor={item => item.userId}
            renderItem={({item}) => (
              <View style={styles.memberItem}>
                <View style={styles.memberInfo}>
                  <Image
                    source={item.profilePicture as any}
                    style={styles.memberPhoto}
                    resizeMode="cover"
                  />
                  <View>
                    <TCText style={styles.memberName}>{item.name}</TCText>
                    {item.isAdmin && (
                      <TCText style={styles.adminTag}>{Strings.ADMIN}</TCText>
                    )}
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <TCText style={styles.emptyText}>No members found</TCText>
            }
          />
        </View>
      )}
    </View>
  );
};


export default AboutGroupScreen;
