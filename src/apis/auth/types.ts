export type RegisterResponse = {
  data: {
    email?: string;
    password?: string;
    name?: string;
    bio?: string;
    designation?: string;
    department?: string;
    skills?: string[];
    workLocation?: string;
    profilePicture?: string;
    _id?: string;
  };
};

export type UserProfile = {
  userId?: string;
  name?: string;
  bio?: string;
  designation?: string;
  department?: string;
  skills?: string[];
  workLocation?: string;
  profilePicture?: {uri: string; name: string; type: string; size: number};
};
