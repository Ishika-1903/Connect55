// import mqtt from 'mqtt';
import {apiClient} from '../apiConfig';

// const brokerUrl = 'mqtt://test.mosquitto.org';
// const mqttClient = mqtt.connect(brokerUrl);

// mqttClient.on('connect', () => {
//   console.log('Connected to MQTT broker');
// });
// export {mqttClient};

// export const createChat = async (chatData: CreateChatRequest): Promise<any> => {
//   try {
//     const response = await apiClient.post(`/chat/create-chat`, chatData);
//     console.log('chat data', response);
//     return response.data;
//   } catch (error: any) {
//     console.log('Error creating chat:', error);
//   }
// };

export const createChat = async (
  type: string,
  groupName: string,
  participants: string[],
  adminId: string,
  // groupIcon: {
  //     uri: string;
  //     name: string;
  //     type: string;
  //     size: number;
  //   } | null,
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('type', type);
    formData.append('groupName', groupName);
    formData.append('participants', JSON.stringify(participants));
    formData.append('adminId', adminId);
    // if (groupIcon && groupIcon.uri) {
    //   formData.append('profilePicture', {
    //     uri: groupIcon.uri,
    //     type: groupIcon.type || 'image/jpg',
    //     name: groupIcon.name || 'profile_picture.jpg',
    //   });
    // }
    console.log('formDataaaa', formData.getParts());
    const response = await apiClient.post(`/chat/create-chat`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Chat created successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error creating chat:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const getChatByUserId = async (userId: string) => {
  try {
    console.log('heyyyy', userId);
    const response = await apiClient.get(`/chat/${userId}`);

    // console.log('getChatByUserId', JSON.stringify(response));
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

// export const getChatByChatId = async (
//   chatId: string, 
//   lastMessageId: string, 
//   limit: number
// ) => {
//   try {
//     const response = await apiClient.get(`/chat-data/${chatId}`, {
//       params: {
//         lastMessageId,
//         limit,
//       },
//     });
//     console.log('getChatByChatId', JSON.stringify(response));
//     return response.data;
//   } catch (error: any) {
//     console.log('Error fetching chat:', error);
//     throw new Error(error.response?.data?.error || 'An error occurred');
//   }
// };

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
  groupIcon: {
    uri: string;
    name: string;
    type: string;
    size: number;
  } | null,
  addMembers: string[],
  removeMembers: string[],
  groupAdminIds: string[],
) => {
  try {
    console.log('formdataaa');
    const formData = new FormData();
    formData.append('chatId', chatId);
    formData.append('userId', userId);
    formData.append('groupName', groupName);
    formData.append('addMembers', JSON.stringify(addMembers));
    formData.append('removeMembers', JSON.stringify(removeMembers));
    formData.append('groupAdminIds', JSON.stringify(groupAdminIds));
    if (groupIcon && groupIcon.uri) {
      console.log('Group Icon URI:', groupIcon.uri);
      formData.append('groupIcon', {
        uri: groupIcon.uri,
        type: groupIcon.type || 'image/jpg',
        name: groupIcon.name || 'profile_picture.jpg',
      });
    }
    console.log('afterr');
    const response = await apiClient.patch('/chat/group/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('updateGroup response', JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {
    console.error('Error updating groupsss:', error);
    throw new Error(error.response?.data?.error || 'An error occurred');
  }
};

export const fetchChatByPagination = async (
  chatId: string,
  lastMessageId: string | null,
  limit: number,
) => {
  try {
    const response = await apiClient.get('/chat-data', {
      params: {
        chatId,
        lastMessageId,
        limit,
      },
    });

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch chat data');
    }
  } catch (error: any) {
    console.error('Error fetching chat data:', error.message || error);
    throw error;
  }
};

export const pinChat = async ({
  chatId,
  pinned,
}: {
  chatId: string;
  pinned: boolean;
}) => {
  try {
    const response = await apiClient.post('/chat/mark-chat-pin', {
      chatId,
      pinned,
    });
    return response.data;
  } catch (error) {
    console.error('Error pinning chat:', error);
    throw new Error('Failed to pin/unpin chat');
  }
};
