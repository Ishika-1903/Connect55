import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TCText } from '../../components/text/CustomText';
import CommonHeader from '../../components/header/CommonHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../../utils/constants/colors';
import Icons from '../../utils/constants/Icons';
import { getChatByChatId } from '../../apis/chat/chat';
import { baseURLPhoto } from '../../apis/apiConfig';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { CustomModal } from '../../components/CustomModal/CustomModal';
import { Strings } from '../../utils/constants/strings';
import { updateGroup } from '../../apis/chat/chat'; 
import { useSelector } from 'react-redux';

type Participant = {
  name: string;
  profilePicture: string | null;
  userId: string;
  isAdmin?: boolean;
};

const AboutGroupScreen: React.FC = () => {
  const route = useRoute();
  const { chatId } = route.params as { chatId: string };
  const navigation = useNavigation();

  const [groupName, setGroupName] = useState<string>('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isEditing, setIsEditing] = useState(false); 

  const [isModalVisible, setModalVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState<{
    uri: string;
    name: string;
    type: string;
    size: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = useSelector((state: any) => state.auth.userId);

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const response = await getChatByChatId(chatId);
        if (response?.data) {
          const { groupName, participants, groupAdmin } = response.data;
          console.log('groupAdmin', groupAdmin)
          const updatedParticipants = participants.map(
            (participant: Participant) => {
              return {
                ...participant,
                profilePicture: participant.profilePicture
                  ? { uri: `${baseURLPhoto}${participant.profilePicture}` }
                  : Icons.dummyProfile,
                isAdmin: groupAdmin.includes(participant.userId),
              };
            },
          );

          setGroupName(groupName);
          setParticipants(updatedParticipants);

        }
      } catch (error) {
        console.error('Error fetching chat details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatDetails();
  }, [chatId]);

  const handleCameraLaunch = () => {
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

  const displayGroupName =
    groupName || participants.map(p => p.name).join(', ');

  const handleSaveGroupName = async () => {
    try {
      const groupAdminIds = participants
      .filter((participant) => participant.isAdmin)
      .map((participant) => participant.userId);

      const response = await updateGroup(
        chatId,
        userId,
        groupName,
        [], 
        [],
        groupAdminIds 
      );

      if (response) {
        console.log('Group name updated successfully:', response);
        setIsEditing(false); 
      }
    } catch (error) {
      console.error('Error updating group name:', error);
    }
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
                    ? { uri: profilePicture.uri }
                    : Icons.dummyProfile
                }
                style={styles.profilePhoto}
              />
              <TouchableOpacity style={styles.editIcon} onPress={openModal}>
                <MaterialIcons
                  name="camera-alt"
                  size={17}
                  style={styles.editIconText}
                />
              </TouchableOpacity>
            </View>

            {isEditing ? (
              <View style={styles.editGroupNameContainer}>
                <TextInput
                  style={styles.editGroupNameInput}
                  value={groupName}
                  onChangeText={setGroupName}
                  autoFocus
                />
                <TouchableOpacity onPress={handleSaveGroupName}>
                  <TCText style={styles.saveButton}>Save</TCText>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <TCText style={styles.groupName}>{displayGroupName}</TCText>
              </TouchableOpacity>
            )}
          </View>

          <TCText style={styles.sectionHeading}>{Strings.GROUP_MEMBERS}</TCText>
          <FlatList
            data={participants}
            keyExtractor={item => item.userId}
            renderItem={({ item }) => (
              <View style={styles.memberItem}>
                <View style={styles.memberInfo}>
                  <Image
                    source={item.profilePicture as any}
                    style={styles.memberPhoto}
                    resizeMode="cover"
                  />
                  <View>
                    <TCText style={styles.memberName}>{item.name}</TCText>
                    {item.isAdmin && <TCText style={styles.adminTag}>Admin</TCText>}
                  </View>
                </View>
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
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    padding: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    color: Colors.darkBlue,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    color: Colors.darkBlue,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.darkBlue,
    marginVertical: 10,
    marginLeft: 15,
  },
  profilePhotoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 10,
  },
  profilePhotoWrapper: {
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    backgroundColor: Colors.darkBlue,
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconText: {
    color: '#fff',
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkBlue,
    marginTop: 20,
  },
  editGroupNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 20,
  },
  editGroupNameInput: {
    fontSize: 18,
    color: Colors.darkBlue,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkBlue,
    marginRight: 10,
    flex: 1,
    paddingLeft: 10,
    marginLeft: 10,
  },
  saveButton: {
    fontSize: 16,
    color: Colors.darkBlue,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  memberItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  memberName: {
    fontSize: 16,
    color: Colors.darkBlue,
    marginLeft: 10,
  },
  adminTag: {
    fontSize: 12,
    color: Colors.darkBlue,
    fontWeight:'100',
    marginLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.darkGray,
  },
  modalButton: {
    backgroundColor: Colors.darkBlue,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  modalButtonText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
  containerStyle: {
    width: 300,
    padding: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AboutGroupScreen;
