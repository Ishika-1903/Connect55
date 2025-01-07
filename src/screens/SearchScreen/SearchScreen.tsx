import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CustomInputField from '../../components/inputField/CustomInputField';
import {Colors} from '../../utils/constants/colors';
import Icons from '../../utils/constants/Icons';
import {StackNavigationProp} from '@react-navigation/stack';
import {PrivateNavigatorParamList} from '../../routes/navigation/navigators';
import {useNavigation} from '@react-navigation/native';
import CustomBottomTab from '../../components/bottomTab/CustomBottomTab';
import {newChatData, recentSearch} from '../../utils/dummyData';
import {TCText} from '../../components/text/CustomText';
import {searchUsers} from '../../apis/auth/auth';

type SearchScreenNavigationProp =
  StackNavigationProp<PrivateNavigatorParamList>;

const SearchScreen = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [unreadCount, setUnreadCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchUserId, setSearchUserId] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      try {
        const response = await searchUsers(query);
        setSearchResults(response.data.data);
      } catch (error) {
        console.error('Error fetching search results:', error.message);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const tabs = [
    {icon: 'home', onPress: () => navigation.navigate('Home')},
    {icon: 'search', onPress: () => navigation.navigate('Search')},
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
          onChangeText={handleSearch}
          placeholderTextStyle={{color: Colors.darkBlue}}
          containerStyle={styles.inputField}
          textStyle={{color: Colors.darkBlue}}
        />
      </View>

      <View>
        <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
        <View style={{marginTop: 20, marginHorizontal: 10}}>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.darkBlue} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <FlatList
              data={searchResults}
              keyExtractor={item => item.userId}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.chatItem}
                  onPress={() => {
                    setSearchUserId(item.userId);
                    console.log(
                      'Navigating to Profile with userId:',
                      searchUserId,
                    );
                    navigation.navigate('Profile', {searchUserId});
                  }}>
                  <Image
                    source={
                      item.profilePicture
                        ? {uri: item.profilePicture}
                        : Icons.dummyProfile
                    }
                    style={styles.profilePicture}
                  />
                  <View style={styles.chatDetails}>
                    <TCText style={styles.name}>
                      {item.name || 'Unnamed'}
                    </TCText>
                    <TCText style={styles.bio}>
                      {item.bio || 'No bio available'}
                    </TCText>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.listContainer}
              ListEmptyComponent={
                <TCText style={styles.noResultsText}>
                  {searchQuery ? 'No results found.' : 'Search for users.'}
                </TCText>
              }
            />
          )}
          {!isLoading && searchQuery === '' && (
            <Text style={styles.noMoreText}>No More Recent Searches</Text>
          )}
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
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
  },
});

export default SearchScreen;
