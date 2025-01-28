import {apiClient} from '../apiConfig';
import {UserProfile} from './types';

export const registerUser = async (
  email: string,
  password: string,
  deviceTokens: string[],
) => {
  try {
    const response = await apiClient.post('/users/register', {
      email,
      password,
      deviceTokens,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getOrganisationData = async () => {
  try {
    const response = await apiClient.get('/organisation-data');
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch organisation data.',
    );
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/users/login', {email, password});
    return response;
  } catch (error: any) {
    console.error('error of login', error);
    throw error;
  }
};

export const getUserData = async (id: string) => {
  try {
    const response = await apiClient.get(`/users/user-data/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const updateUserProfile = async (
  userId: string,
  name: string,
  bio: string,
  department: string,
  skills: string[],
  profilePicture: {
    uri: string;
    name: string;
    type: string;
    size: number;
  } | null,
  workLocation: string | null,
  designation: string | null,
  deviceTokens: string[] | null,
): Promise<UserProfile> => {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('department', department);
    formData.append('skills', JSON.stringify(skills));
    // if (profilePicture && profilePicture.uri) {
    //   formData.append('profilePicture', {
    //     uri: profilePicture.uri,
    //     type: profilePicture.type || 'image/jpg',
    //     name: profilePicture.name || 'profile_picture.jpg',
    //   });
    // }
    formData.append('workLocation', workLocation);
    formData.append('designation', designation);
    formData.append('deviceTokens', JSON.stringify(deviceTokens));
    const response = await apiClient.patch(
      `/users/update/${userId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    const updatedProfile: UserProfile = response.data.data;

    return updatedProfile;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const searchUsers = async (query: string) => {
  try {
    const response = await apiClient.get(`/users/search-users`, {
      params: {query},
    });

    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to search users');
  }
};
