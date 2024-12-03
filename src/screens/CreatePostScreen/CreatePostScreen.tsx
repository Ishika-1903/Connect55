import React, { useState } from 'react';
import { View, TextInput, Image, Button, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Tags from 'react-native-tags';
 
const CreatePostScreen = ({ navigation }) => {
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
        if (!response.didCancel && !response.error && response.assets && response.assets[0]) {
          setImage(response.assets[0].uri);
        }
      }
    );
  };
 

  const handleGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (!response.didCancel && !response.error && response.assets && response.assets[0]) {
          setImage(response.assets[0].uri);
        }
      }
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
      {/* Header Section */}
      <Text style={styles.header}>Create Post</Text>
 
      {/* Image Section */}
      <View style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imagePlaceholder}>No Image Selected</Text>
        )}
        <View style={styles.imageButtons}>
          <Button title="Camera" onPress={handleCamera} />
          <Button title="Gallery" onPress={handleGallery} />
        </View>
      </View>
 
      {/* Caption Section */}
      <TextInput
        style={styles.captionInput}
        placeholder="Write a caption..."
        value={caption}
        onChangeText={setCaption}
        multiline
      />
 
      {/* Tag Section */}
      <Tags
        initialTags={tags}
        onChangeTags={setTags}
        placeholder="Tag people"
        inputStyle={styles.tagInput}
        renderTag={({ tag, index, onPress }) => (
          <TouchableOpacity key={`${tag}-${index}`} onPress={onPress} style={styles.tag}>
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
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  imagePlaceholder: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  captionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  tagInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  tag: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  tagText: {
    color: '#fff',
  },
  postButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});