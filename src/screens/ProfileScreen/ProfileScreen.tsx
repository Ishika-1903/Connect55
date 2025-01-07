import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from '../../utils/constants/Icons';
import {Colors} from '../../utils/constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CustomModal} from '../../components/CustomModal/CustomModal';
import {TCText} from '../../components/text/CustomText';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomBottomTab from '../../components/bottomTab/CustomBottomTab';
import {skills} from '../../utils/dummyData';
import {PrivateNavigatorParamList} from '../../routes/navigation/navigators';
import {StackNavigationProp} from '@react-navigation/stack';
import {Strings} from '../../utils/constants/strings';
import {getUserData} from '../../apis/auth/auth';
import {useSelector} from 'react-redux';
import {RootState} from '../../controller/store';
import {baseURLPhoto} from '../../apis/apiConfig';
import { styles } from './ProfileScreen.styles';

type ProfileScreenNavigationProp =
  StackNavigationProp<PrivateNavigatorParamList>;

const ProfilePage: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const route = useRoute();
  const {chatUserId} = route.params || {};
  const {searchUserId} = route.params || {};
  console.log('hiii from profile', chatUserId)
  console.log('chatuserid in profile', chatUserId);
  console.log('searchUserId in profile', searchUserId);
  const idToFetch =  searchUserId || chatUserId || userId;

  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [visible, setVisible] = React.useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [unreadCount, setUnreadCount] = useState(5);

  const [loading, setLoading] = useState(true);

  const showModal = () => {
    console.log('Show modal called');
    setVisible(true);
  };

  const hideModal = () => {
    console.log('Hide modal called');
    setVisible(false);
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
    const fetchUserData = async () => {
      if (!idToFetch) {
        console.error('User ID is missing in Profile Screen');
        setLoading(false);
        return;
      }

      try {
        const response = await getUserData(idToFetch);
        console.log('helloooo', response);
        if (response.success) {
          setUserData(response.data);
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
  }, [userId]);

  const shuffleArray = (array: string[]) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const [shuffledSkills, setShuffledSkills] = useState<string[]>([]);

  useEffect(() => {
    setShuffledSkills(shuffleArray(skills));
  }, []);

  const profilePictureURL = userData?.profilePicture
    ? `${baseURLPhoto}${userData.profilePicture}`
    : null;

  const tabs = [
    {icon: 'home', onPress: () => navigation.navigate('Home')},
    {icon: 'search', onPress: () => navigation.navigate('Search')},
    // {icon: 'add-box', onPress: () => console.log('Home pressed')},
    {
      icon: 'email',
      onPress: () => navigation.navigate('ChatList'),
      unreadCount: unreadCount,
    },
    {icon: 'campaign', onPress: () => navigation.navigate('Announcement')},
    {icon: 'person', onPress: () => navigation.navigate('Profile')},
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <LinearGradient colors={['#004080', '#232343']} style={styles.header}>
          <View style={styles.editIcon}>
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
              <Image source={Icons.dummyProfile} style={styles.profileImage} />
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

          <View style={styles.actionButtons}>
            {idToFetch !== userId && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>  navigation.navigate('IndividualChatScreen', { chatUserId: idToFetch })}>
                <MaterialIcons
                  name="message"
                  size={24}
                  color={Colors.darkBlue}
                  style={styles.icon}
                />
                <TCText style={styles.actionButtonText}>
                  {Strings.MESSAGE}
                </TCText>
              </TouchableOpacity>
            )}
          </View>

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
            onPress: () => console.log('Confirmed!'),
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

      <CustomBottomTab
        tabs={tabs}
        style={{
          color: 'white',
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
};


export default ProfilePage;
