import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomInputField from '../../components/inputField/CustomInputField';
import Icons from '../../utils/constants/Icons';
import {Colors} from '../../utils/constants/colors';
import {TCText} from '../../components/text/CustomText';
import CustomButton from '../../components/buttons/CustomButton';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
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

  const route = useRoute();
  const {userId, userEmail} = route.params;
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
      }
    };

    fetchOrganisationData();
  }, []);

  const saveProfile = async () => {
    console.log('Name:', name);
    console.log('Bio:', bio);
    console.log('Selected Department:', selectedDepartment);
    console.log('Skills:', selectedSkills);
    console.log('Profile Picture:', profilePicture);
    console.log('Work Location:', location);
    console.log('Selected Designation:', selectedDesignation);
    try {
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
      console.log('Profile updated successfully:', updatedProfile);
      navigation.navigate('Private', {screen: 'Profile',  params: { userId: userId },});
    } catch (error) {
      console.error(error);
    }
    // navigation.navigate('Private', {screen: 'Home'});
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} style={styles.backIcon} />
        </TouchableOpacity>

        <View style={styles.profilePhotoContainer}>
          <View style={styles.profilePhotoWrapper}>
            {/* <Image source={Icons.profilePicture2} style={styles.profilePhoto} /> */}
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

              {/* <TCText style={styles.label}>Password</TCText>
              <CustomInputField
                //rightIcon={showPassword ? 'visibility-off' : 'visibility'}
                lefticonStyle={{fontSize: 20}}
                //onRightIconPress={() => setShowPassword(!showPassword)}
                placeholder="•••••••"
                placeholderTextStyle={{color: '#888'}}
                secureTextEntry={!showPassword}
                textStyle={styles.placeholderTextStyle}
                containerStyle={styles.input}
                value={userPassword}
                editable={false}
                onChangeText={text => setPassword(text)}
              /> */}

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
                // renderLeftIcon={() => (
                //   <MaterialIcons color="black" name="computer" size={20} />
                // )}
                renderItem={item => {
                  const isSelected = selectedDepartment === item.value;
                  return (
                    <View
                      style={[
                        styles.itemContainer,
                        isSelected && {backgroundColor: 'transparent'}, // Override background
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
              {/* <View style={styles.dropdownWrapper}> */}
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
                  console.log('Selected Skills:', item);
                  setSelectedSkills(item);
                }}
                alwaysRenderSelectedItem={true}
                // renderLeftIcon={() => (
                //   <MaterialIcons color="black" name="domain" size={20} />
                // )}
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

              {/* </View> */}

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

              <CustomButton
                text="SAVE"
                onPress={saveProfile}
                textStyle={styles.buttonText}
                style={styles.button}
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
    </ScrollView>
  );
};

export default CreateProfileScreen;
