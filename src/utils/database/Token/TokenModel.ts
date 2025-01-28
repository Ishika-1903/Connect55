import Realm from 'realm';

class TokenModel extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'Token',
    properties: {
      token: 'string',
      FCMToken:'string[]',
    },
  };
}

export default TokenModel;
