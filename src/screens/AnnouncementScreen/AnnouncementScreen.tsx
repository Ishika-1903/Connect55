import React, {useState} from 'react';
import {Image, View} from 'react-native';
import Icons from '../../utils/constants/Icons';
import {styles} from './AnnouncementScreen.styles';
import PostSection from '../../components/postSection/PostSection';
import CommonHeader from '../../components/header/CommonHeader';

const posts = [
  {
    id: '1',
    userName: 'Admin',
    profilePicture: Icons.adminProfile,
    postImage: Icons.instaPost1,
    caption: 'Great things are coming! 🚀 Stay tuned for more updates. 💡',
  },
  {
    id: '2',
    userName: 'Admin',
    profilePicture: Icons.adminProfile,
    postImage: Icons.instaPost2,
    caption: 'Exciting new features are here! 🔥 Check them out now! 🎉',
  },
  {
    id: '3',
    userName: 'Admin',
    profilePicture: Icons.adminProfile,
    postImage: Icons.instaPost3,
    caption:
      'We’ve got something special in the works... 🎁 Can’t wait to share it! 😊',
  },
  {
    id: '4',
    userName: 'Admin',
    profilePicture: Icons.adminProfile,
    postImage: Icons.instaPost4,
    caption: 'Big news coming soon! 🌟 Stay tuned! 📱',
  },
];

const AnnouncementScreen: React.FC = ({navigation}: any) => {
  const [unreadCount, setUnreadCount] = useState(5);

  return (
    <View style={styles.container}>
      <CommonHeader
        leftContent={<Image source={Icons.logo} style={styles.logo} />}
      />

      <PostSection posts={posts} />
    </View>
  );
};

export default AnnouncementScreen;
