import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  TextInput,
  StyleSheet,
  View,
} from 'react-native';
import {TCText} from '../../components/text/CustomText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommonHeader from '../../components/header/CommonHeader';
import {Colors} from '../../utils/constants/colors';
import CustomCheckboxItem from '../../components/checkbox/CustomCheckBoxItem';
import CustomButton from '../../components/buttons/CustomButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {searchUsers} from '../../apis/auth/auth';
import {baseURLPhoto} from '../../apis/apiConfig';
import Icons from '../../utils/constants/Icons';
import {RootState} from '../../controller/store';
import {useSelector} from 'react-redux';
import CustomInputField from '../../components/inputField/CustomInputField';
import {Strings} from '../../utils/constants/strings';
import { getInitials } from '../../utils/utils';
import { styles } from './AddGroupMembers.styles';

type SearchResultItem = {
  userId: string;
  name: string;
  bio?: string;
  profilePicture?: string;
};

const AddGroupMembers: React.FC = () => {
  const navigation = useNavigation();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);

  const route = useRoute();
  const {onMembersSelected} = route.params as {
    onMembersSelected: (newMembers: Participant[]) => void;
  };

  const handleDoneSelecting = () => {
    const newMembers = selectedUsers.map(userId => {
      const user = searchResults.find(result => result.userId === userId);
      return {
        userId: user?.userId || '',
        name: user?.name || '',
        profilePicture: user?.profilePicture
          ? {uri: `${baseURLPhoto}${user.profilePicture}`}
        : getInitials(user?.name || 'Unknown'),
      };
    });

    onMembersSelected(newMembers);
    navigation.goBack();
  };

  const handleSelectionChange = (id: string, isSelected: boolean) => {
    setSelectedUsers(prevSelected => {
      const updated = isSelected
        ? [...prevSelected, id]
        : prevSelected.filter(userId => userId !== id);

      return updated;
    });
  };

  const handleClearSearch = () => {
    setSearchText('');
    setSearchResults([]);
  };

  const handleSearch = async (query: string) => {
    setSearchText(query);
    if (query.length > 0) {
      try {
        const response = await searchUsers(query);
        setSearchResults(response.data.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CommonHeader
          leftContent={
            <View style={styles.leftContent}>
              <MaterialIcons
                name="arrow-back"
                size={25}
                style={styles.icon}
                onPress={() => navigation.goBack()}
              />
              <TCText style={styles.heading}>
                {Strings.ADD_MEMBERS.toUpperCase()}
              </TCText>
            </View>
          }
        />
      </View>
      <View style={styles.inputFieldContainer}>
        <CustomInputField
          lefticon="search"
          placeholder="Search"
          rightIcon="close"
          rightIconStyle={{color: Colors.darkBlue, fontSize: 15}}
          onRightIconPress={handleClearSearch}
          placeholderTextStyle={{color: Colors.darkBlue}}
          containerStyle={styles.inputField}
          textStyle={{color: Colors.darkBlue}}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={item => item.userId}
        renderItem={({item}) => (
          <CustomCheckboxItem
            profilePicture={
              item.profilePicture
                ? {uri: `${baseURLPhoto}${item.profilePicture}`}
                : Icons.dummyProfile
            }
            name={item.name || 'Unnamed'}
            bio={item.bio || 'No bio available'}
            isSelected={selectedUsers.includes(item.userId)}
            onSelectionChange={isSelected =>
              handleSelectionChange(item.userId, isSelected)
            }
          />
        )}
        ListEmptyComponent={
          searchText.length > 0 && searchResults.length === 0 ? (
            <TCText style={{textAlign: 'center', marginTop: 20}}>
              No results found
            </TCText>
          ) : null
        }
      />
      {selectedUsers.length > 0 && (
        <CustomButton
          text={Strings.DONE.toUpperCase()}
          textStyle={{color:Colors.white, fontSize:18, fontWeight:'bold'}}
          onPress={handleDoneSelecting}
          style={styles.doneButton}
        />
      )}
    </View>
  );
};


export default AddGroupMembers;
