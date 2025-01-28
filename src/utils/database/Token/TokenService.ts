import Realm from 'realm';
import UserModel from './TokenModel';
import TokenModel from './TokenModel';

class TokenService {
  private realm: Realm;

  constructor() {
    this.realm = new Realm({
      schema: [TokenModel],
      schemaVersion: 2,
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

  addUser(token: string) {
    try {
      this.realm.write(() => {
        this.realm.create('Token', {token});
      });
      return {success: true, message: `token saved successfully, ${token}`};
    } catch (error) {
      return {success: false, message: 'Error saving user data', error};
    }
  }

  getAllUsers() {
    return this.realm.objects('User');
  }
}

export default new TokenService();
