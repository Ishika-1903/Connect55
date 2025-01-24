import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Tags from 'react-native-tags';
import { styles } from './CreatePostScreen.styles';

const CreatePostScreen = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState([]);
  const handleCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      response => {
        if (
          !response.didCancel &&
          !response.error &&
          response.assets &&
          response.assets[0]
        ) {
          setImage(response.assets[0].uri);
        }
      },
    );
  };

  const handleGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (
          !response.didCancel &&
          !response.error &&
          response.assets &&
          response.assets[0]
        ) {
          setImage(response.assets[0].uri);
        }
      },
    );
  };

  const handlePost = () => {
    if (!image || !caption.trim()) {
      Alert.alert('Please add an image and a caption');
      return;
    }

    const postData = {
      image,
      caption,
      tags,
    };

    console.log('Post Data:', postData);
    Alert.alert('Post Created Successfully!');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create Post</Text>
      <View style={styles.imagePicker}>
        {image ? (
          <Image source={{uri: image}} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imagePlaceholder}>No Image Selected</Text>
        )}
        <View style={styles.imageButtons}>
          <Button title="Camera" onPress={handleCamera} />
          <Button title="Gallery" onPress={handleGallery} />
        </View>
      </View>
      <TextInput
        style={styles.captionInput}
        placeholder="Write a caption..."
        value={caption}
        onChangeText={setCaption}
        multiline
      />

      <Tags
        initialTags={tags}
        onChangeTags={setTags}
        placeholder="Tag people"
        inputStyle={styles.tagInput}
        renderTag={({tag, index, onPress}) => (
          <TouchableOpacity
            key={`${tag}-${index}`}
            onPress={onPress}
            style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreatePostScreen;

