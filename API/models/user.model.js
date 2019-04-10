import dummyData from './dummyData';
import Utility from '../utils/common';

export default class User {
  static createUser(user) {
    const newId = Utility.getNextId(dummyData.users);
    const newUser = user;
    newUser.id = newId;
    dummyData.users.push(newUser);
    return newUser;
  }

  static findUserByEmail(email) {
    const foundUser = dummyData.users.find(user => user.email === email);
    return foundUser;
  }

  static findUserById(id) {
    const foundUser = dummyData.users.find(user => user.id === id);
    return foundUser;
  }
}
