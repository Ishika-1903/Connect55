import Realm from 'realm';

import TokenModel from './TokenModel';
import UserModel from '../User/UserModel';

class TokenService {
  private realm: Realm;

  constructor() {
    this.realm = new Realm({
      schema: [TokenModel, UserModel],
      schemaVersion: 6,
      // onMigration: (oldRealm, newRealm) => {
      //   if (oldRealm.schemaVersion < 2) {
      //     const oldObjects = oldRealm.objects('User');
      //     const newObjects = newRealm.objects('User');

      //     for (let i = 0; i < oldObjects.length; i++) {
      //       const oldObject = oldObjects[i];
      //       const newObject = newObjects[i];

      //       newObject.token = oldObject.token || `unique_token_${i}`;
      //     }
      //   }
      // },
    });
  }

  addToken(token: string, FCMToken: (string | null)[]) {
    try {
      this.realm.write(() => {
        this.realm.create('Token', {token, FCMToken});
      });
      return {
        success: true,
        message: `token saved successfully, token  :${token} ,FCM Token :  ${FCMToken}`,
      };
    } catch (error) {
      return {success: false, message: 'Error saving user data', error};
    }
  }

  getAllTokens() {
    return this.realm.objects('Token');
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

  addChatList(
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
}

export default new TokenService();
