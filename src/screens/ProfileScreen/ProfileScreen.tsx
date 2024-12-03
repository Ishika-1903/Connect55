import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from '../../utils/constants/Icons';
import {Colors} from '../../utils/constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CustomModal} from '../../components/CustomModal/CustomModal';
import {TCText} from '../../components/text/CustomText';
import {useNavigation} from '@react-navigation/native';
import CustomBottomTab from '../../components/bottomTab/CustomBottomTab';
import {data, skills} from '../../utils/dummyData';
import {PrivateNavigatorParamList} from '../../routes/navigation/navigators';
import {StackNavigationProp} from '@react-navigation/stack';
import { Strings } from '../../utils/constants/strings';

type ProfileScreenNavigationProp =
  StackNavigationProp<PrivateNavigatorParamList>;
const ProfilePage: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [visible, setVisible] = React.useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [unreadCount, setUnreadCount] = useState(5);

  const showModal = () => {
    console.log('Show modal called');
    setVisible(true);
  };

  const hideModal = () => {
    console.log('Hide modal called');
    setVisible(false);
  };

  const containerStyle = {backgroundColor: 'yellow', padding: 20};

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

  const tabs = [
    {icon: 'home', onPress: () => console.log('Home pressed')},
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
            <Image source={Icons.profilePicture1} style={styles.profileImage} />
          </View>
        </LinearGradient>
        <View style={styles.editIcon}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateProfile')}>
            <MaterialIcons name="edit" size={28} color={Colors.darkBlue} />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <TCText style={styles.name}>Ishika Shahaney</TCText>
          <TCText style={styles.bio}>
            Innovator, Passionate, Solution Driven
          </TCText>

          <TCText style={styles.designation}>
            Software Engineer, Mobile & Apps
          </TCText>

          <TCText style={styles.location}>📍 Indore</TCText>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('IndividualChatScreen')}>
              <MaterialIcons
                name="message"
                size={24}
                color={Colors.darkBlue}
                style={styles.icon}
              />
              <TCText style={styles.actionButtonText}>{Strings.MESSAGE}</TCText>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="linkedin" size={28} color={Colors.darkBlue} />
            </TouchableOpacity> */}
          </View>

          <View style={styles.skillsBox}>
            <TCText style={styles.sectionTitle}>SKILLS</TCText>
            <View style={styles.skillsContainer}>
              {shuffledSkills
                .slice(0, showAllSkills ? shuffledSkills.length : 4)
                .map((skill, index) => (
                  <View key={index} style={styles.skillTab}>
                    <TCText style={styles.skillText}>{skill}</TCText>
                  </View>
                ))}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    position: 'relative',
    height: 200,
  },
  profileImageContainer: {
    position: 'absolute',
    bottom: -50,
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  editIcon: {
    marginHorizontal: 20,
    marginVertical: 20,
    marginLeft: 'auto',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.darkBlue,
    marginBottom: 8,
  },
  designation: {
    fontSize: 16,
    color: Colors.darkGray,
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: Colors.darkGray,
    marginBottom: 8,
    maxWidth: '80%',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#CCC',
    textAlign: 'center',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: Colors.darkGray,
    marginBottom: 30,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#FBFBFB',
    shadowColor: '#000',
    shadowOffset: {width: 30, height: 30},
    shadowOpacity: 2,
    shadowRadius: 10,
    elevation: 10,
    width: '45%',
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  actionButtonText: {
    fontSize: 18,
    color: Colors.darkBlue,
    fontWeight: '600',
    textAlign: 'center',
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
  iconButton: {
    backgroundColor: '#FBFBFB',
    shadowColor: '#000',
    shadowOffset: {width: 30, height: 30},
    shadowOpacity: 2,
    shadowRadius: 10,
    elevation: 10,
    padding: 15,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkBlue,
    letterSpacing: 1,
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  skillsBox: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#FBFBFB',
    shadowColor: '#000',
    shadowOffset: {width: 30, height: 30},
    shadowOpacity: 2,
    shadowRadius: 10,
    elevation: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '100%',
  },

  skillTab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
    minWidth: 80,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBFBFB',
    borderWidth: 1,
    borderColor: Colors.darkBlue,
  },
  skillText: {
    fontSize: 14,
    color: '#004080',
  },
  toggleButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkBlue,
  },
});

export default ProfilePage;
