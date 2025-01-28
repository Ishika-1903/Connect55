import Realm from 'realm';

class UserModel extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'User',
    properties: {
      name: 'string',
      bio: 'string',
      designation: 'string',
      department: 'string',
      workLocation: 'string',
      skills: 'string[]',
    },
  };
}

export default UserModel;
