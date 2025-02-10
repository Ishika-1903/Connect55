import {useState, useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

const useContacts = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestContactsPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to your contacts.',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          },
        );

        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (error) {
        console.error('Failed to request contacts permission:', error);
        setHasPermission(false);
      }
    } else {
      setHasPermission(true);
    }
  };

  useEffect(() => {
    requestContactsPermission();
  }, []);

  return {hasPermission, requestContactsPermission};
};

export default useContacts;
