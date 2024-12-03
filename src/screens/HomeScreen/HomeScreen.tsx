import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Icons from '../../utils/constants/Icons';
import {Colors} from '../../utils/constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomBottomTab from '../../components/bottomTab/CustomBottomTab';
import {TCText} from '../../components/text/CustomText';
import {styles} from './HomeScreen.styles';
import CommonHeader from '../../components/header/CommonHeader';
import PostSection from '../../components/postSection/PostSection';
import {posts} from '../../utils/dummyData';
import {StackNavigationProp} from '@react-navigation/stack';
import {PrivateNavigatorParamList} from '../../routes/navigation/navigators';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type HomeScreenNavigationProp = StackNavigationProp<PrivateNavigatorParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [unreadCount, setUnreadCount] = useState(5);
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
      <CommonHeader
        leftContent={<Image source={Icons.logo} style={styles.logo} />}
        rightContent={
          <TouchableOpacity>
            <MaterialIcons name="add-box" size={30} color={Colors.darkBlue} />
            {/* <View style={styles.unreadCount}>
              <TCText style={styles.unreadText}>5</TCText>
            </View> */}
          </TouchableOpacity>
        }
      />

      <PostSection posts={posts} />

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

export default HomeScreen;
