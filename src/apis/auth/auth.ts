
import {apiClient} from '../apiConfig';
import {UserProfile} from './types';

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/users/register', {email, password});
    console.log('responseeeeee', response);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to register user.',
    );
  }
};

export const getOrganisationData = async () => {
  try {
    const response = await apiClient.get('/organisation-data');
    console.log('Organisation data:', JSON.stringify(response));
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
    console.log('login response', response);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const getUserData = async (id: string) => {
  try {
    const response = await apiClient.get(`/users/user-data/${id}`);
    console.log('User data:', JSON.stringify(response));
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};


export const updateUserProfile = async (
  id: string,
  name: string,
  bio: string,
  department: string,
  skills: string[],
  profilePicture: { uri: string; name: string; type: string; size: number } | null,
  workLocation: string | null,
  designation: string | null,
): Promise<UserProfile> => {

  try {
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('department', department);
    formData.append('skills', JSON.stringify(skills));
    //formData.append('profilePicture', profilePicture);
    if (profilePicture && profilePicture.uri) {
      formData.append('profilePicture', {
        uri: profilePicture.uri,
        type: profilePicture.type || 'image/jpg',  
        name: profilePicture.name || 'profile_picture.jpg',  
      });
    }
    formData.append('workLocation', workLocation);
    formData.append('designation', designation);
    console.log("formDataaaa", formData.getParts())
    const response = await apiClient.patch(`/users/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
       
      },
    });

    console.log('Response:', response.data);

    const updatedProfile: UserProfile = response.data.data;
    console.log('Profile updated successfully:', updatedProfile);
    console.log('profilePictureeeeee', profilePicture);

    return updatedProfile;
  } catch (error: any) {
    throw new Error(error);
  }
};
