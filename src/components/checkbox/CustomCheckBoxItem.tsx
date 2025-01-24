import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../utils/constants/colors';

type CustomCheckboxItemProps = {
  profilePicture?: { uri: string } | number;
  name: string;
  bio?: string;
  isSelected?: boolean;
  onSelectionChange?: (isSelected: boolean) => void; 
};

const CustomCheckboxItem: React.FC<CustomCheckboxItemProps> = ({
  profilePicture,
  name,
  bio,
  isSelected = false,
  onSelectionChange,
}) => {
  const [checked, setChecked] = useState(isSelected);

  const handlePress = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState);
    if (onSelectionChange) {
      onSelectionChange(newCheckedState);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={profilePicture} style={styles.profilePicture} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        {bio && <Text style={styles.bio}>{bio}</Text>}
      </View>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <MaterialIcons name="check" size={18} color="white" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkBlue,
  },
  bio: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: Colors.darkBlue,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: Colors.darkBlue,
    borderColor: Colors.darkBlue,
  },
});

export default CustomCheckboxItem;
