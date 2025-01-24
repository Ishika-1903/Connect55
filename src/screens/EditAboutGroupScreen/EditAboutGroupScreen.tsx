import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Modal,
  Text,
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
import CustomButton from '../../components/buttons/CustomButton';
import Toast from 'react-native-toast-message';
import { styles } from './EditAboutGroupScreen.styles';

type Participant = {
  name: string;
  profilePicture: string | null;
  userId: string;
  isAdmin?: boolean;
};

const EditAboutGroupScreen: React.FC = () => {
  const route = useRoute();
  const {chatId} = route.params as {chatId: string};
  const navigation = useNavigation();

  const [groupName, setGroupName] = useState<string>('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const [selectedMember, setSelectedMember] = useState<Participant | null>(
    null,
  );
  const [isAdminActionVisible, setAdminActionVisible] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState<{
    uri: string;
    name: string;
    type: string;
    size: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = useSelector((state: any) => state.auth.userId);
  const [isAdmin, setIsAdmin] = useState(false);

  const [initialParticipantIds, setInitialParticipantIds] = useState<string[]>(
    [],
  );
  const [isGroupUpdated, setIsGroupUpdated] = useState(false);

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
          setInitialParticipantIds(participants.map(p => p.userId));
          if (groupIcon) {
            console.log(groupIcon);
            setProfilePicture({
              uri: `${baseURLPhoto}${groupIcon}`,
              name: 'group_icon.jpg',
              type: 'image/jpeg',
              size: 0,
            });
          } else {
            setProfilePicture(null);
          }
        }
      } catch (error) {
        console.error('Error fetching chat details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatDetails();
  }, [chatId, userId]);

  const handleCameraLaunch = () => {
    if (!isAdmin) return;
    const options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorCode);
      } else {
        const imageUri = response.assets?.[0]?.uri;
        const imageName =
          response.assets?.[0]?.fileName || 'profile_picture.jpg';
        const imageType = response.assets?.[0]?.type || 'image/jpeg';
        const imageSize = response.assets?.[0]?.fileSize || 0;

        if (imageUri) {
          setProfilePicture({
            uri: imageUri,
            name: imageName,
            type: imageType,
            size: imageSize,
          });
        }
      }
      setModalVisible(false);
    });
  };

  const handleGalleryLaunch = () => {
    if (!isAdmin) return;
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled gallery');
      } else if (response.errorCode) {
        console.log('Gallery Error: ', response.errorCode);
      } else {
        const imageUri = response.assets?.[0]?.uri;
        const imageName =
          response.assets?.[0]?.fileName || 'profile_picture.jpg';
        const imageType = response.assets?.[0]?.type || 'image/jpeg';
        const imageSize = response.assets?.[0]?.fileSize || 0;

        if (imageUri) {
          setProfilePicture({
            uri: imageUri,
            name: imageName,
            type: imageType,
            size: imageSize,
          });
        }
      }
      setModalVisible(false);
    });
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleLongPress = (member: Participant) => {
    setSelectedMember(member);
    setAdminActionVisible(true);
  };

  const handleSaveGroupName = async () => {
    if (!isAdmin) return;
    try {
      const groupAdminIds = participants
        .filter(participant => participant.isAdmin)
        .map(participant => participant.userId);

      const currentUserIds = participants.map(p => p.userId);
      const addedMembers = currentUserIds.filter(
        id => !initialParticipantIds.includes(id),
      );
      const removedMembers = initialParticipantIds.filter(
        id => !currentUserIds.includes(id),
      );

      const response = await updateGroup(
        chatId,
        userId,
        groupName,
        profilePicture,
        addedMembers,
        removedMembers,
        groupAdminIds,
      );

      if (response) {
        console.log('Group name updated successfully:', response);
        setIsGroupUpdated(true);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const toggleAdminRights = async (targetUserId: string) => {
    const updatedParticipants = participants.map(participant =>
      participant.userId === targetUserId
        ? {...participant, isAdmin: !participant.isAdmin}
        : participant,
    );
    setParticipants(updatedParticipants);

    try {
      const groupAdminIds = updatedParticipants
        .filter(participant => participant.isAdmin)
        .map(participant => participant.userId);

      await updateGroup(chatId, userId, groupName, null, [], [], groupAdminIds);
    } catch (error) {
      console.error('Error updating admin rights:', error);
      setParticipants(participants);
    }
  };

  const handleAddMember = (newMember: Participant) => {
    setParticipants([...participants, newMember]);
  };

  const handleRemoveMember = (userId: string) => {
    setParticipants(participants.filter(p => p.userId !== userId));
  };

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
            />
          </View>

          <View style={styles.profilePhotoContainer}>
            <View style={styles.profilePhotoWrapper}>
              <Image
                source={
                  profilePicture
                    ? {uri: profilePicture.uri}
                    : Icons.dummyProfile
                }
                style={styles.profilePhoto}
              />
              {isAdmin && (
                <TouchableOpacity style={styles.editIcon} onPress={openModal}>
                  <MaterialIcons
                    name="camera-alt"
                    size={17}
                    style={styles.editIconText}
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.editGroupNameContainer}>
              <TextInput
                style={styles.editGroupNameInput}
                value={groupName}
                onChangeText={setGroupName}
                autoFocus
              />
            </View>
          </View>

          <View style={styles.sectionHeaderContainer}>
            <TCText style={styles.sectionHeading}>
              {Strings.GROUP_MEMBERS}
            </TCText>
            {isAdmin && (
              <TouchableOpacity
                style={styles.addMemberButtonIcon}
                onPress={() => {
                  navigation.navigate('AddGroupMembers', {
                    onMembersSelected: (newMembers: Participant[]) => {
                      const updatedParticipants = [
                        ...participants,
                        ...newMembers.filter(
                          newMember =>
                            !participants.some(
                              p => p.userId === newMember.userId,
                            ),
                        ),
                      ];
                      setParticipants(updatedParticipants);
                    },
                  });
                }}>
                <TCText style={styles.addButtonText}>+</TCText>
              </TouchableOpacity>
            )}
          </View>

          {/* <FlatList
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
                {isAdmin && (
                  <TouchableOpacity
                    onPress={() => toggleAdminRights(item.userId)}
                    style={[
                      styles.adminToggleButton,
                      {
                        backgroundColor: item.isAdmin
                          ? Colors.darkBlue
                          : Colors.darkBlue,
                      },
                    ]}>
                    <Text style={styles.adminToggleText}>
                      {item.isAdmin ? 'Revoke from Admin' : 'Make Admin'}
                    </Text>
                  </TouchableOpacity>
                )}
                {!item.isAdmin && (
                  <TCText
                    style={styles.minusSymbol}
                    onPress={() => handleRemoveMember(item.userId)}>
                    -
                  </TCText>
                )}
              </View>
            )}
            ListEmptyComponent={
              <TCText style={styles.emptyText}>No members found</TCText>
            }
          /> */}

          <FlatList
            data={participants}
            keyExtractor={item => item.userId}
            renderItem={({item}) => (
              <View
                style={styles.memberItem}
                onLongPress={() => handleLongPress(item)} // Long press handler
              >
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
                {isAdmin && (
                  <TouchableOpacity
                    onPress={() => toggleAdminRights(item.userId)}
                    style={[
                      styles.adminToggleButton,
                      {
                        backgroundColor: item.isAdmin
                          ? Colors.darkBlue
                          : Colors.darkBlue,
                      },
                    ]}>
                    <Text style={styles.adminToggleText}>
                      {item.isAdmin ? 'Revoke from Admin' : 'Make Admin'}
                    </Text>
                  </TouchableOpacity>
                )}
                {!item.isAdmin && (
                  <TCText
                    style={styles.minusSymbol}
                    onPress={() => handleRemoveMember(item.userId)} // Handle member removal
                  >
                    -
                  </TCText>
                )}
              </View>
            )}
            ListEmptyComponent={
              <TCText style={styles.emptyText}>No members found</TCText>
            }
          />

          <CustomModal
            title="Upload Profile Picture"
            visible={isModalVisible}
            onClose={closeModal}
            containerStyle={styles.containerStyle}
            buttons={[
              {
                text: 'Camera',
                onPress: handleCameraLaunch,
                buttonStyle: styles.modalButton,
                textStyle: styles.modalButtonText,
              },
              {
                text: 'Gallery',
                onPress: handleGalleryLaunch,
                buttonStyle: styles.modalButton,
                textStyle: styles.modalButtonText,
              },
            ]}
          />

          <View style={styles.contentContainer}>
            {loading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.darkBlue} />
              </View>
            ) : (
              <View style={styles.contentContainer}>
                <CustomButton
                  text={Strings.SAVE.toUpperCase()}
                  onPress={handleSaveGroupName}
                  textStyle={styles.saveText}
                  style={styles.saveButtonStyle}
                />
              </View>
            )}
          </View>
          {isGroupUpdated && (
            <Modal
              visible={isGroupUpdated}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setIsGroupUpdated(false)}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalMessage}>
                    Group updated successfully!
                  </Text>
                </View>
              </View>
            </Modal>
          )}
        </View>
      )}
    </View>
  );
};

export default EditAboutGroupScreen;
