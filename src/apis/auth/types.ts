export type RegisterResponse = {
    data: {
      email: string;
      password: string;
      name: string | null;
      bio: string | null;
      designation: string | null;
      department: string | null;
      skills: string[];
      workLocation: string | null;
      profilePicture: string | null;
      _id: string;
      __v: number;
    };
  }

export type UserProfile = {
  userId: string;
  name: string;
  bio: string;
  designation: string | null;
  department: string;
  skills: string[];
  workLocation: string | null;
  profilePicture: { uri: string; name: string; type: string; size: number };
  __v: number;
}
