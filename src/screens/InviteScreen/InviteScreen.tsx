import React, {useEffect, useState} from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  PermissionsAndroid,
  Linking,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TCText} from '../../components/text/CustomText';
import CommonHeader from '../../components/header/CommonHeader';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../utils/constants/colors';
import {Strings} from '../../utils/constants/strings';
import Icons from '../../utils/constants/Icons';
import Contacts from 'react-native-contacts';

const InviteScreen: React.FC = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    ReadContacts();
  }, []);

  const ReadContacts = async () => {
    try {
      const isPermissionGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );

      if (isPermissionGranted) {
        console.log('Permission already granted');
        fetchContacts();
      } else {
        console.log('Permission not granted, requesting now...');
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Allow',
          },
        );

        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission granted after request');
          fetchContacts();
        } else {
          console.log('Permission denied');
        }
      }
    } catch (error) {
      console.error('Error checking or requesting contacts permission:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const allContacts = await Contacts.getAll();
      const filteredContacts = allContacts
        .filter(contact =>
          contact.emailAddresses?.some(email =>
            email.email.endsWith('@fiftyfivetech.io'),
          ),
        )
        .map(contact => ({
          id: contact.recordID,
          name: contact.displayName,
          email: contact.emailAddresses[0]?.email || '',
          profilePicture: Icons.dummyProfile,
        }));

      setContacts(filteredContacts);
      console.log('Filtered Contacts:', filteredContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleInvite = (email: string) => {
    if (!email) {
      console.error('No email available for this contact');
      return;
    }

    const subject = 'Join Our Platform';
    const body =
      'Hi there,\n\nWe’d like to invite you to join our platform. Please click the link below to get started:\n\n[Insert Link Here]\n\nBest regards,\nYour Company Name';
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoUrl).catch(err => {
      console.error('Failed to send email:', err);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
                {Strings.INVITE.toUpperCase()}
              </TCText>
            </View>
          }
        />
      </View>

      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.userItem}>
            <View style={styles.userInfo}>
              <Image
                source={item.profilePicture}
                style={styles.profilePicture}
                resizeMode="cover"
              />
              <TCText style={styles.userName}>{item.name}</TCText>
            </View>
            <TouchableOpacity
              style={styles.inviteButton}
              onPress={() => handleInvite(item.email)}>
              <TCText style={styles.inviteButtonText}>INVITE</TCText>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <TCText style={styles.emptyText}>No contacts available</TCText>
        }
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    padding: 10,
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
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    color: Colors.darkBlue,
  },
  inviteButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: Colors.gray,
  },
  inviteButtonText: {
    color: Colors.darkBlue,
    fontWeight: 'bold',
    fontSize: 15,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.gray,
    marginTop: 20,
  },
});

export default InviteScreen;

