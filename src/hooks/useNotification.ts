import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const useNotification = () => {
  const onDisplayNotification = async (remoteMessage: any) => {
    try {
      const notifeePermission = await notifee.requestPermission();
      if (!notifeePermission) {
        console.error('Notification permission denied');
        return;
      }

      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: 4,
      });

      const title =
        remoteMessage.notification?.title ||
        remoteMessage.data?.title ||
        'Default Title';
      const body =
        remoteMessage.notification?.body ||
        remoteMessage.data?.body ||
        'Default Body';

      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
          },
        },
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onDisplayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  return { onDisplayNotification };
};

export default useNotification;
