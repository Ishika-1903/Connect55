import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from '../../utils/constants/Icons';
import {Colors} from '../../utils/constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CustomModal} from '../../components/CustomModal/CustomModal';
import {TCText} from '../../components/text/CustomText';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {skills} from '../../utils/dummyData';
import {PrivateNavigatorParamList} from '../../routes/navigation/navigators';
import {StackNavigationProp} from '@react-navigation/stack';
import {getUserData} from '../../apis/auth/auth';
import {baseURLPhoto} from '../../apis/apiConfig';
import {styles} from './ProfileScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getInitials, shuffleArray} from '../../utils/utils';

import TokenService from '../../utils/database/Token/TokenService';

type ProfileScreenNavigationProp =
  StackNavigationProp<PrivateNavigatorParamList>;
 
const ProfilePage: React.FC = () => {

  const route = useRoute();
  const {chatUserId} = route.params || {};
  const {searchUserId} = route.params || {};

  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [visible, setVisible] = React.useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  const [loading, setLoading] = useState(true);
  const [idToFetch, setIdToFetch] = useState<string | null>(null);
  const [shuffledSkills, setShuffledSkills] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);
    };
  
    fetchUserId();
  }, []); 

  const showModal = () => {
    setVisible(true);
  };

  const [userData, setUserData] = useState<{
    profilePicture: string;
    name: string;
    bio: string;
    designation: string;
    department: string;
    workLocation: string;
    skills: string[];
  } | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        setIdToFetch(
          searchUserId || chatUserId || userId || storedUserId || null,
        );
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    fetchUserId();
  }, [userId, chatUserId, searchUserId]);

  useFocusEffect(
    React.useCallback(() => {
      setIdToFetch(userId);
    }, [userId]),
  );

  useEffect(() => {
    const fetchUserData = async () => {
      if (!idToFetch) {
        setLoading(false);
        return;
      }
      try {
        const response = await getUserData(idToFetch);
        if (response.success) {
          setUserData(response.data);
          const saveResult = TokenService.addUser(
            response.data.name,
            response.data.bio,
            response.data.designation,
            response.data.department,
            response.data.workLocation,
            response.data.skills,
          );
        } else {
          console.error('Failed to fetch user data:', response.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [idToFetch]);

  useEffect(() => {
    setShuffledSkills(shuffleArray(skills));
  }, []);

  const profilePictureURL = userData?.profilePicture
    ? `${baseURLPhoto}${userData.profilePicture}`
    : null;
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <LinearGradient colors={['#004080', '#232343']} style={styles.header}>
          <View
            style={[
              styles.editIcon,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.backButton, {position: 'absolute', right: 350}]}>
              <MaterialIcons
                name="arrow-back"
                size={24}
                style={styles.backIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={showModal}>
              <MaterialIcons name="logout" size={28} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileImageContainer}>
            {profilePictureURL ? (
              <Image
                source={{uri: profilePictureURL}}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.intialsProfile}>
                <Text style={styles.initials}>
                  {getInitials(userData?.name || 'Unknown')}
                </Text>
              </View>
            )}
          </View>
        </LinearGradient>
        <View style={styles.editIcon}>
          {idToFetch === userId && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Public', {
                  screen: 'CreateProfile',
                })
              }>
              <MaterialIcons name="edit" size={28} color={Colors.darkBlue} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.detailsContainer}>
          <TCText style={styles.name}>{userData?.name || 'N/A'}</TCText>
          <TCText style={styles.bio}>
            {userData?.bio || 'No bio available'}
          </TCText>

          <TCText style={styles.designation}>
            {`${userData?.designation || 'N/A'}, ${
              userData?.department || 'N/A'
            }`}
          </TCText>

          <TCText style={styles.location}>
            📍 {userData?.workLocation || 'N/A'}
          </TCText>

          <View style={styles.skillsBox}>
            <TCText style={styles.sectionTitle}>SKILLS</TCText>
            <View style={styles.skillsContainer}>
              {(showAllSkills
                ? userData?.skills
                : userData?.skills?.slice(0, 4)
              )?.map((skill, index) => (
                <View key={index} style={styles.skillTab}>
                  <TCText style={styles.skillText}>{skill}</TCText>
                </View>
              )) || <TCText style={styles.bio}>No skills available</TCText>}
            </View>
            {shuffledSkills.length > 4 && (
              <TouchableOpacity
                onPress={() => setShowAllSkills(!showAllSkills)}
                style={styles.toggleButton}>
                <TCText style={styles.toggleButtonText}>
                  {showAllSkills ? 'Show Less' : 'Show More'}
                </TCText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.darkBlue} />
        </View>
      )}

      <CustomModal
        visible={visible}
        subTitle="Are you sure you want to logout ? "
        subTitleStyle={{color: Colors.darkBlue, fontSize: 18}}
        onClose={() => setVisible(false)}
        buttons={[
          {
            text: 'Cancel',
            onPress: () => setVisible(false),
            buttonStyle: {
              backgroundColor: Colors.darkBlue,
              borderRadius: 10,
              paddingHorizontal: 25,
              paddingVertical: 10,
            },
            textStyle: {
              color: Colors.white,
              fontSize: 16,
            },
          },
          {
            text: 'Confirm',
            onPress: async () => {
              try {
                await AsyncStorage.removeItem('userToken');
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Public', params: {screen: 'Login'}}],
                });
                setVisible(false);
              } catch (error) {
                console.error('Error removing token:', error);
              }
            },
            buttonStyle: {
              backgroundColor: Colors.darkBlue,
              borderRadius: 10,
              paddingHorizontal: 25,
              paddingVertical: 10,
            },
            textStyle: {
              color: Colors.white,
              fontSize: 16,
            },
          },
        ]}
      />
    </View>
  );
};

export default ProfilePage;
