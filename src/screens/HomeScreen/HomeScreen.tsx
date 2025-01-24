import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Icons from '../../utils/constants/Icons';
import {Colors} from '../../utils/constants/colors';
import CustomBottomTab from '../../components/bottomTab/CustomBottomTab';
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
  return (
    <View style={styles.container}>
      <CommonHeader
        leftContent={<Image source={Icons.logo} style={styles.logo} />}
        rightContent={
          <TouchableOpacity>
            <MaterialIcons name="add-box" size={30} color={Colors.darkBlue} />
          </TouchableOpacity>
        }
      />

      <PostSection posts={posts} />
    </View>
  );
};

export default HomeScreen;
