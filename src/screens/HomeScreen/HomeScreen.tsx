import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Icons from '../../utils/constants/Icons';
import {Colors} from '../../utils/constants/colors';
import {styles} from './HomeScreen.styles';
import CommonHeader from '../../components/header/CommonHeader';
import PostSection from '../../components/postSection/PostSection';
import {posts} from '../../utils/dummyData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen: React.FC = () => {
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
