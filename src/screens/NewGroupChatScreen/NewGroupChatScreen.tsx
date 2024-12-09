import React, {useState} from 'react';
import CustomInputField from '../../components/inputField/CustomInputField';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {TCText} from '../../components/text/CustomText';
import {Strings} from '../../utils/constants/strings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommonHeader from '../../components/header/CommonHeader';
import {Colors} from '../../utils/constants/colors';
import CustomCheckboxItem from '../../components/checkbox/CustomCheckBoxItem';
import {newChatData} from '../../utils/dummyData';
import {CustomModal} from '../../components/CustomModal/CustomModal';
import CustomButton from '../../components/buttons/CustomButton';
import {useNavigation} from '@react-navigation/native';

const NewGroupChatScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [groupType, setGroupType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(newChatData);

  const handleSelectionChange = (id: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedUsers(prevSelected => [...prevSelected, id]);
    } else {
      setSelectedUsers(prevSelected =>
        prevSelected.filter(userId => userId !== id),
      );
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = newChatData.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleModalButtonClick = (type: string) => {
    setGroupType(type);
    setError(null);
    setIsModalVisible(false);
  };

  const handleModalCloseAttempt = () => {
    if (!groupType) {
      setError('*Please select a group type before proceeding.');
    }
  };

  return (
    <View style={styles.container}>
      {/* {isModalVisible && (
        <CustomModal
          visible={isModalVisible}
          title="Select Group Type"
          buttons={[
            {
              text: 'Personal',
              onPress: () => handleModalButtonClick('Personal'),
              textStyle: {color: Colors.white, textAlign: 'center'},
              buttonStyle: styles.buttonStyle,
            },
            {
              text: 'Work',
              onPress: () => handleModalButtonClick('Work'),
              textStyle: styles.textStyle,
              buttonStyle: styles.buttonStyle,
            },
          ]}
          onClose={handleModalCloseAttempt}>
          {error && <TCText style={styles.errorText}>{error}</TCText>}
        </CustomModal>
      )} */}

      <View style={styles.headerContainer}>
        <CommonHeader
          leftContent={
            <View style={styles.leftContent}>
              <MaterialIcons name="arrow-back" size={25} style={styles.icon} onPress={() => navigation.goBack()}/>
              <TCText style={styles.heading}>
                {Strings.NEW_GROUP_CHAT.toUpperCase()}
              </TCText>
            </View>
          }
        />
      </View>
      <View style={styles.inputFieldContainer}>
        <CustomInputField
          lefticon="search"
          placeholder="Search"
          placeholderTextStyle={{color: Colors.darkBlue}}
          containerStyle={styles.inputField}
          textStyle={{
            color: Colors.darkBlue,
          }}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <View>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <CustomCheckboxItem
              profilePicture={item.profilePicture}
              name={item.name}
              bio={item.bio}
              isSelected={selectedUsers.includes(item.id)}
              onSelectionChange={isSelected =>
                handleSelectionChange(item.id, isSelected)
              }
            />
          )}
        />
      </View>

      {selectedUsers.length > 1 && (
        <CustomButton
          text={Strings.CREATE_GROUP_CHAT}
          textStyle={{color: Colors.white}}
          onPress={() => navigation.navigate('GroupChatScreen')}
          style={styles.createGroupButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    padding: 10,
  },
  inputFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  inputField: {
    width: '90%',
    backgroundColor: Colors.gray,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: Colors.darkBlue,
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  icon: {
    color: Colors.darkBlue,
  },
  buttonStyle: {
    width: '50%',
    height: 'auto',
    backgroundColor: Colors.darkBlue,
    borderRadius: 10,
  },
  textStyle: {
    color: Colors.white,
    marginVertical: 2,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
  },
  createGroupButton: {
    width: '90%',
    height: 50,
    backgroundColor: Colors.darkBlue,
    borderRadius: 30,
    alignSelf: 'center',
    bottom: 20,
    position: 'absolute',
  },
});

export default NewGroupChatScreen;
