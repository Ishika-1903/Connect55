import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import CustomInputField from '../inputField/CustomInputField';

type CommonSearchBarProps = {
  placeholder?: string; 
  placeholderTextStyle?:TextStyle;
  style?: ViewStyle | TextStyle; 
  onSearch: (query: string) => void;
};

const CommonSearchBar: React.FC<CommonSearchBarProps> = ({
  placeholder = 'Search...',
  placeholderTextStyle,
  style = {},
  onSearch,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="search" size={24} color="gray" />
      </TouchableOpacity>
      <CustomInputField
        containerStyle={styles.input}
        placeholder={placeholder}
        placeholderTextStyle={styles.placeholderTextStyle}
        onChangeText={(text) => onSearch(text)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d3d3d3', 
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 40,
    width: '100%',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, 
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: 'black',
  },
  placeholderTextStyle: {
    color: 'gray',  
  },
});

export default CommonSearchBar;
