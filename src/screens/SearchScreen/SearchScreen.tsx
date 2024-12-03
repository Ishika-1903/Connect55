import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import CommonSearchBar from '../../components/searchBar/CommonSearchBar';
import ForYouPage from '../../components/forYouComponent/ForYouComponent';
import CustomInputField from '../../components/inputField/CustomInputField';
import {Colors} from '../../utils/constants/colors';
import Icons from '../../utils/constants/Icons';
import {StackNavigationProp} from '@react-navigation/stack';
import {PrivateNavigatorParamList} from '../../routes/navigation/navigators';
import {useNavigation} from '@react-navigation/native';
import CustomBottomTab from '../../components/bottomTab/CustomBottomTab';
import {newChatData, recentSearch} from '../../utils/dummyData';
import {TCText} from '../../components/text/CustomText';

type SearchScreenNavigationProp =
  StackNavigationProp<PrivateNavigatorParamList>;

const SearchScreen = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  console.log('Ishikaaa');
  const [unreadCount, setUnreadCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecentSearch = newChatData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const displayedData =
    searchQuery === '' ? recentSearch.slice(0, 4) : filteredRecentSearch;

  const tabs = [
    {icon: 'home', onPress: () => console.log('Home pressed')},
    {icon: 'search', onPress: () => navigation.navigate('Search')},
    // {icon: 'add-box', onPress: () => console.log('Home pressed')},
    {
      icon: 'email',
      onPress: () => navigation.navigate('ChatList'),
      unreadCount: unreadCount,
    },
    {icon: 'campaign', onPress: () => navigation.navigate('Announcement')},
    {icon: 'person', onPress: () => navigation.navigate('Profile')},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.inputFieldContainer}>
        <CustomInputField
          lefticon="search"
          placeholder="Search"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          placeholderTextStyle={{color: Colors.darkBlue}}
          containerStyle={styles.inputField}
          textStyle={{color: Colors.darkBlue}}
        />
      </View>
      {/* <ForYouPage/> */}
      <View>
        <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
        <View style={{marginTop: 20, marginHorizontal: 10}}>
          <FlatList
            data={displayedData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.chatItem}
                onPress={() => navigation.navigate('Profile')} // Add onPress here
              >
                <Image
                  source={item.profilePicture}
                  style={styles.profilePicture}
                />
                <View style={styles.chatDetails}>
                  <TCText style={styles.name}>{item.name}</TCText>
                  <TCText style={styles.bio}>{item.bio}</TCText>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContainer}
          />
          <Text style={styles.noMoreText}>No More Recent Searches</Text>
        </View>
      </View>

      <CustomBottomTab
        tabs={tabs}
        style={{
          color: 'white',
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginTop: 0,
  },
  logo: {
    width: '90%',
    height: 50,
    marginHorizontal: 20,
    marginBottom: 30,
  },

  itemText: {
    fontSize: 16,
    color: '#333',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
  inputFieldContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  inputField: {
    width: '90%',
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkBlue,
  },
  bio: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d3d3d3',
  },
  chatDetails: {
    flex: 1,
  },
  recentSearchesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  recentSearchesTitle: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: Colors.darkBlue,
    marginTop: -20,
  },

  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  noMoreText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d3d3d3',
    fontStyle: 'italic',
  },
});

export default SearchScreen;
