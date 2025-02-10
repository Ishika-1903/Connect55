import { useState } from 'react';
import { PermissionsAndroid } from 'react-native';

const usePermission = () => {
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied'>('denied');

  const requestPermission = async (permission: string) => {
    try {
      const granted = await PermissionsAndroid.request(permission);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionStatus('granted');
      } else {
        setPermissionStatus('denied');
      }
    } catch (error) {
      console.error('Permission request failed', error);
      setPermissionStatus('denied');
    }
  };

  return { permissionStatus, requestPermission };
};

export default usePermission;
