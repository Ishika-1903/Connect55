// import mqtt from 'mqtt';

import {apiClient} from '../apiConfig';

// const brokerUrl = 'mqtt://test.mosquitto.org';
// const mqttClient = mqtt.connect(brokerUrl);

// mqttClient.on('connect', () => {
//   console.log('Connected to MQTT broker');
// });
// export {mqttClient};

export const createChat = async (chatData: CreateChatRequest): Promise<any> => {
  try {
    const response = await apiClient.post(`/chat/create-chat`, chatData);
    console.log('chat data', response);
    return response.data;
  } catch (error: any) {
    console.log('Error creating chat:', error);
  }
};

export const getChatByUserId = async (userId: string) => {
  try {
    console.log('heyyyy', userId);
    const response = await apiClient.get(`/chat/${userId}`);

    console.log('getChatByUserId', JSON.stringify(response));
    return response.data;
  } catch (error: any) {
    console.log('Error creating chat:', error);
    throw new Error(error.response?.data?.error || 'An error occurred');
  }
};

export const getChatByChatId = async (chatId: string) => {
  try {
    const response = await apiClient.get(`/chat-data/${chatId}`);
    console.log('getChatByChatId', JSON.stringify(response));
    return response.data;
  } catch (error: any) {
    console.log('Error creating chat:', error);
    throw new Error(error.response?.data?.error || 'An error occurred');
  }
};

export const sendMessage = async (
  chatId: string,
  // senderId: string,
  userId: string,
  content: string,
  media: {uri: string; name: string; type: string; size: number} | null,
) => {
  try {
    const formData = new FormData();
    formData.append('chatId', chatId);
    // formData.append('senderId', senderId);
    formData.append('senderId', userId);
    formData.append('content', content);
    if (media && media.uri) {
      formData.append('media', {
        uri: media.uri,
        type: media.type || 'image/jpg',
        name: media.name || 'profile_picture.jpg',
      });
    }

    const response = await apiClient.post('/chat/send-message', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('sendMessage response', JSON.stringify(response));
    return response.data;
  } catch (error: any) {
    console.error('Error sending message:', error);
    throw new Error(error.response?.data?.error || 'An error occurred');
  }
};

export const updateGroup = async (
  chatId: string,
  userId: string,
  groupName: string,
  addMembers: string[],
  removeMembers: string[],
  groupAdminIds: string[],
) => {
  try {
    const requestBody = {
      chatId,
      userId,
      groupName,
      addMembers,
      removeMembers,
      groupAdminIds,
    };
    const response = await apiClient.put('/chat/group/update', requestBody);
    console.log('updateGroup response', JSON.stringify(response));
    return response.data;
  } catch (error: any) {
    console.error('Error updating group:', error);
    throw new Error(error.response?.data?.error || 'An error occurred');
  }
};
