import Realm from 'realm';
import UserModel from './UserModel';

class UserService {
  private realm: Realm;

  constructor() {
    this.realm = new Realm({
      schema: [UserModel],
     
    });
  }

  addUser(
    name: string,
    bio: string,
    designation: string,
    department: string,
    workLocation: string,
    skills: string[],
  ) {
    try {
      this.realm.write(() => {
        this.realm.create('User', {
          name,
          bio,
          designation,
          department,
          workLocation,
          skills,
        });
      });
      return {
        success: true,
        message: `User profile saved successfully, name  :${name} ,bio :  ${bio}, designation  :${designation} ,department :  ${department}, workLocation  :${workLocation} ,skills :  ${skills}`,
      };
    } catch (error) {
      return {success: false, message: 'Error saving user data', error};
    }
  }

  getAllUsers() {
    return this.realm.objects('User');
  }
}

export default new UserService();
