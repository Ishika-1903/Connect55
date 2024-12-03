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
  _id: string;
  name: string;
  bio: string;
  designation: string | null;
  department: string;
  skills: string[];
  workLocation: string | null;
  profilePicture: string;  
  __v: number;
}
