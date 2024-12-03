import React from 'react';
import {View, Image, FlatList, StyleSheet} from 'react-native';
import {Colors} from '../../utils/constants/colors';
import {forYouPosts} from '../../utils/dummyData';

const ForYouPage = () => {
  const renderPost = ({item}: {item: (typeof forYouPosts)[0]}) => (
    <View style={styles.postItem}>
      <Image source={item.image} style={styles.postImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={forYouPosts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postItem: {
    flex: 1,
    margin: 5,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  overlay: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeText: {
    fontSize: 20,
    color: Colors.white,
  },
  userName: {
    fontSize: 14,
    color: Colors.white,
  },
});

export default ForYouPage;
