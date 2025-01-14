import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomInputField from '../../components/inputField/CustomInputField';
import Icons from '../../utils/constants/Icons';
import {Colors} from '../../utils/constants/colors';
import {TCText} from '../../components/text/CustomText';
import CustomButton from '../../components/buttons/CustomButton';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PrivateNavigatorParamList} from '../../routes/navigation/navigators';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  getOrganisationData,
  getUserData,
  updateUserProfile,
} from '../../apis/auth/auth';
import {CustomModal} from '../../components/CustomModal/CustomModal';
import {styles} from './CreateProfileScreen.styles';
import {RootState} from '../../controller/store';
import {useSelector} from 'react-redux';
import {baseURLPhoto} from '../../apis/apiConfig';

type CreateProfileScreenNavigationProp = StackNavigationProp<
  PrivateNavigatorParamList,
  'Home'
>;

type DropDownItem = {
  label: string;
  value: string;
};

const CreateProfileScreen = () => {
  const navigation = useNavigation<CreateProfileScreenNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [profilePicture, setProfilePicture] = useState<{
    uri: string;
    name: string;
    type: string;
    size: number;
  } | null>(null);

  const [skillsData, setSkillsData] = useState<DropDownItem[]>([]);
  const [departmentsData, setDepartmentsData] = useState<DropDownItem[]>([]);
  const [designationsData, setDesignationsData] = useState<DropDownItem[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const userId = useSelector((state: RootState) => state.auth.userId);
  console.log('userrrrId in profile', userId);

  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      console.log('Fetching user data on first load...');

      if (!userId) {
        console.error('User ID is missing in Profile Screen');
        return;
      }

      try {
        setLoading(true);
        const response = await getUserData(userId);

        if (response?.data?.name) {
          console.log('Returning user, fetching full data...');
          setName(response.data.name || '');
          setBio(response.data.bio || '');
          setUserEmail(response.data.email || '');
          setLocation(response.data.location || '');
          setSelectedDepartment(response.data.department || '');
          setSelectedSkills(response.data.skills || []);
          setSelectedDesignation(response.data.designation || '');
          setLocation(response.data.workLocation || '');
          const profilePictureURL = response.data.profilePicture
            ? `${baseURLPhoto}${response.data.profilePicture}`
            : null;
          setProfilePicture(
            profilePictureURL ? {uri: profilePictureURL} : null,
          );
        } else {
          if (response?.data?.email) {
            setUserEmail(response.data.email);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

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

  useEffect(() => {
    const fetchOrganisationData = async () => {
      try {
        setLoading(true);
        const response = await getOrganisationData();
        const {skills, departments, designations} = response.data;
        setSkillsData(
          skills.map((skill: any) => ({
            label: skill,
            value: skill,
          })),
        );

        setDepartmentsData(
          departments.map((dept: any) => ({
            label: dept,
            value: dept,
          })),
        );

        setDesignationsData(
          designations.map((dept: any) => ({
            label: dept,
            value: dept,
          })),
        );
      } catch (error) {
        console.error('Error fetching organisation data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganisationData();
  }, []);

  const saveProfile = async () => {

    if (!userId) {
      console.error('User ID is missing in create profile screen');
      return;
    }

    if (
      !name ||
      !bio ||
      !location ||
      !selectedDepartment ||
      !selectedSkills.length ||
      !selectedDesignation ||
      !profilePicture
    ) {
      console.error('Please fill in all the required fields!');
      setLoading(true);
    }

    setLoading(true);
    console.log('1');
    try {
      console.log('2');
      const updatedProfile = await updateUserProfile(
        userId,
        name,
        bio,
        selectedDepartment || '',
        selectedSkills,
        profilePicture,
        location,
        selectedDesignation,
      );
      console.log('userId after api,', userId)
      console.log('3');
      console.log('Profile updated successfully:', updatedProfile);
      console.log('4');
      navigation.navigate('Private', {screen: 'Home'});
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    console.log('Changing password:', {
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
    if (newPassword !== confirmNewPassword) {
      console.error("Passwords don't match!");
      return;
    }
    console.log('Password changed successfully.');
    setIsChangePasswordVisible(false);
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>

        <View style={styles.profilePhotoContainer}>
          <View style={styles.profilePhotoWrapper}>
            <Image
              source={
                profilePicture
                  ? {uri: profilePicture.uri}
                  : Icons.profilePicture1
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
        </View>

        <View style={styles.formCard}>
          <ScrollView
            contentContainerStyle={styles.scrollFormContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <TCText style={styles.label}>Name</TCText>
              <CustomInputField
                containerStyle={styles.input}
                textStyle={styles.placeholderTextStyle}
                placeholder="Ishika Shahaney"
                placeholderTextStyle={styles.placeholderColor}
                value={name}
                onChangeText={text => setName(text)}
              />

              <TCText style={styles.label}>Bio</TCText>
              <CustomInputField
                containerStyle={styles.input}
                textStyle={styles.placeholderTextStyle}
                placeholder="Tell us about yourself"
                placeholderTextStyle={styles.placeholderColor}
                value={bio}
                onChangeText={text => setBio(text)}
              />

              <TCText style={styles.label}>Email Address</TCText>
              <CustomInputField
                containerStyle={styles.input}
                textStyle={styles.placeholderTextStyle}
                placeholder="shahaney.ishika@fiftyfivetech.io"
                value={userEmail}
                editable={false}
                placeholderTextStyle={styles.placeholderColor}
              />

              <TCText style={styles.label}>Designation</TCText>
              <Dropdown
                style={styles.input}
                containerStyle={styles.dropdownList}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                data={designationsData}
                labelField="label"
                valueField="value"
                placeholder="Select Designation"
                searchPlaceholder="Search"
                value={selectedDesignation}
                mode="auto"
                onChange={item => {
                  setSelectedDesignation(item.value);
                }}
                renderItem={item => {
                  const isSelected = selectedDesignation === item.value;
                  return (
                    <View
                      style={[
                        styles.itemContainer,
                        isSelected && {backgroundColor: 'transparent'},
                      ]}>
                      <Text style={styles.itemText}>{item.label}</Text>
                      {isSelected && (
                        <MaterialIcons
                          name="check"
                          size={20}
                          color={Colors.darkBlue}
                          style={styles.checkIcon}
                        />
                      )}
                    </View>
                  );
                }}
              />

              <TCText style={styles.label}>Department</TCText>
              <Dropdown
                style={styles.input}
                containerStyle={styles.dropdownList}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                data={departmentsData}
                labelField="label"
                valueField="value"
                placeholder=" Select Department"
                searchPlaceholder="Search"
                value={selectedDepartment}
                mode="auto"
                onChange={item => {
                  setSelectedDepartment(item.value);
                }}
                renderItem={item => {
                  const isSelected = selectedDepartment === item.value;
                  return (
                    <View
                      style={[
                        styles.itemContainer,
                        isSelected && {backgroundColor: 'transparent'},
                      ]}>
                      <Text style={styles.itemText}>{item.label}</Text>
                      {isSelected && (
                        <MaterialIcons
                          name="check"
                          size={20}
                          color={Colors.darkBlue}
                          style={styles.checkIcon}
                        />
                      )}
                    </View>
                  );
                }}
              />
              <TCText style={styles.label}>Skills</TCText>
              <MultiSelect
                style={styles.input}
                mode="auto"
                dropdownPosition="bottom"
                placeholderStyle={styles.placeholderStyle}
                containerStyle={styles.multiSelectdropdownList}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                data={skillsData}
                labelField="label"
                valueField="value"
                placeholder=" Select Skills"
                searchPlaceholder="Search..."
                value={selectedSkills}
                onChange={item => {
                  setSelectedSkills(item);
                }}
                alwaysRenderSelectedItem={true}
                renderItem={item => {
                  const isSelected = selectedSkills.includes(item.value);
                  return (
                    <View
                      style={[
                        styles.itemContainer,
                        isSelected && {backgroundColor: '#fff'},
                      ]}>
                      <Text style={styles.itemText}>{item.label}</Text>
                      {isSelected && (
                        <MaterialIcons
                          name="check"
                          size={20}
                          color={Colors.darkBlue}
                          style={styles.tickIcon}
                        />
                      )}
                    </View>
                  );
                }}
                selectedStyle={styles.selectedStyle}
              />

              <TCText style={styles.label}>Work Location</TCText>
              <CustomInputField
                containerStyle={styles.input}
                textStyle={styles.placeholderTextStyle}
                placeholder="Indore"
                value={location}
                onChangeText={text => {
                  console.log('Work Location changed:', text);
                  setLocation(text);
                }}
                placeholderTextStyle={styles.placeholderColor}
              />
              {isChangePasswordVisible && (
                <>
                  <View style={styles.passwordSectionContainer}>
                    <TCText style={styles.label}>Current Password</TCText>
                    <CustomInputField
                      rightIcon={
                        showCurrentPassword ? 'visibility-off' : 'visibility'
                      }
                      onRightIconPress={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      placeholder="Enter current password"
                      placeholderTextStyle={{color: '#888'}}
                      secureTextEntry={!showCurrentPassword}
                      textStyle={{fontSize: 16, color: Colors.darkBlue}}
                      containerStyle={styles.input}
                      value={currentPassword}
                      onChangeText={setCurrentPassword}
                    />

                    <TCText style={styles.label}>New Password</TCText>
                    <CustomInputField
                      rightIcon={
                        showNewPassword ? 'visibility-off' : 'visibility'
                      }
                      onRightIconPress={() =>
                        setShowNewPassword(!showNewPassword)
                      }
                      placeholder="Enter new password"
                      placeholderTextStyle={{color: '#888'}}
                      secureTextEntry={!showNewPassword}
                      textStyle={{fontSize: 16, color: Colors.darkBlue}}
                      containerStyle={styles.input}
                      value={newPassword}
                      onChangeText={setNewPassword}
                    />

                    <TCText style={styles.label}>Confirm New Password</TCText>
                    <CustomInputField
                      rightIcon={
                        showConfirmNewPassword ? 'visibility-off' : 'visibility'
                      }
                      onRightIconPress={() =>
                        setShowConfirmNewPassword(!showConfirmNewPassword)
                      }
                      placeholder="Confirm new password"
                      placeholderTextStyle={{color: '#888'}}
                      secureTextEntry={!showConfirmNewPassword}
                      textStyle={{fontSize: 16, color: Colors.darkBlue}}
                      containerStyle={styles.input}
                      value={confirmNewPassword}
                      onChangeText={setConfirmNewPassword}
                    />
                  </View>
                </>
              )}

              {/* <CustomButton
                text="CHANGE PASSWORD"
                onPress={() =>
                  setIsChangePasswordVisible(!isChangePasswordVisible)
                }
                textStyle={styles.buttonText}
                style={styles.button}
              /> */}

              <CustomButton
                text="SAVE"
                onPress={saveProfile}
                textStyle={
                  isChangePasswordVisible
                    ? styles.disabledText
                    : styles.buttonText
                }
                style={
                  isChangePasswordVisible
                    ? styles.disabledButton
                    : styles.button
                }
                disabled={isChangePasswordVisible}
              />
            </View>
          </ScrollView>
        </View>
      </View>
      <View></View>
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
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.darkBlue} />
        </View>
      )}
    </ScrollView>
  );
};

export default CreateProfileScreen;
