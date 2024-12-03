import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../utils/constants/colors';
import { State, TapGestureHandler } from 'react-native-gesture-handler';  


export const DoubleTap = ({ children }: any) => {
  const doubleTapRef = useRef(null);

  const onSingleTapEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log("single tap 1");
    }
  };

  const onDoubleTapEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
       console.log("double tap 1");
    }
  };

  return (
    <TapGestureHandler
      onHandlerStateChange={onSingleTapEvent}
      waitFor={doubleTapRef}>
      <TapGestureHandler
        ref={doubleTapRef}
        onHandlerStateChange={onDoubleTapEvent}
        numberOfTaps={2}>
        {children}
      </TapGestureHandler>
    </TapGestureHandler>
  );
};

type Post = {
  id: string;
  userName: string;
  profilePicture: any;
  postImage: any;
  caption: string;
};

type PostSectionProps = {
  posts: Post[];
};

const PostSection: React.FC<PostSectionProps> = ({ posts }) => {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [showLikeIcon, setShowLikeIcon] = useState<string | null>(null); 

  const handleDoubleTap = (postId: string) => {
    setLikedPosts((prevLikedPosts) => {
      const updatedLikedPosts = new Set(prevLikedPosts);
      if (updatedLikedPosts.has(postId)) {
        updatedLikedPosts.delete(postId); 
      } else {
        updatedLikedPosts.add(postId);
        setShowLikeIcon(postId);
      }
      return updatedLikedPosts;
    });
  };


  useEffect(() => {
    if (showLikeIcon) {
      const timer = setTimeout(() => {
        setShowLikeIcon(null); 
      }, 200); 

      return () => clearTimeout(timer);
    }
  }, [showLikeIcon]);

  const renderPost = ({ item }: { item: Post }) => {
    const firstName = item.userName.split(' ')[0];
    const isLiked = likedPosts.has(item.id);

    return (
      <View style={styles.postSection}>
        <View style={styles.postHeader}>
          <Image source={item.profilePicture} style={styles.profilePicture} />
          <Text style={styles.userName}>{item.userName}</Text>
        </View>

        
        <DoubleTap>
          <TouchableOpacity
            style={styles.postImageContainer}
            onPress={() => handleDoubleTap(item.id)} 
          >
            <Image source={item.postImage} style={styles.postImage} />
            {showLikeIcon === item.id && ( 
              <Icon
                name="favorite"
                size={50}
                color={Colors.darkBlue}
                style={styles.likeIcon}
              />
            )}
          </TouchableOpacity>
        </DoubleTap>

        <View style={styles.captionSection}>
          <Text style={styles.userNameInCaption}>{firstName} </Text>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>

        <View style={styles.actions}>
     
          <TouchableOpacity onPress={() => handleDoubleTap(item.id)}>
            <Icon
              name={isLiked ? "favorite" : "favorite-border"} 
              size={25}
              color={isLiked ? Colors.darkBlue : '#333'} 
              style={styles.actionIcon}
            />
          </TouchableOpacity>

   
          <TouchableOpacity>
            <Icon
              name="chat-bubble-outline"
              size={25}
              color={Colors.darkBlue}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="send"
              size={25}
              color={Colors.darkBlue}
              style={[styles.actionIcon, styles.sendIcon]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  postSection: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginHorizontal: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postImageContainer: {
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
  likeIcon: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    transform: [{ scale: 1.5 }],
  },
  captionSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  userNameInCaption: {
    fontWeight: 'bold',
    color: '#333',
    fontStyle: 'italic',
    marginHorizontal: 10,
  },
  caption: {
    color: Colors.darkBlue,
    maxWidth: '80%',
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  actionIcon: {
    marginHorizontal: 10,
   
  },
  sendIcon:{
    transform: [{ rotate: '-20deg' }],
    marginTop:-4
  }
});

export default PostSection;
