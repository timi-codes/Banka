import Utils from '../utils/common';
import User from '../models/user.model';

/** Class that allows user create and login  */
class UserService {
  /**
   * @description Create a new user
   * @param {object} a new user object
   */
  static createUser(user) {
    const isUser = User.findUserByEmail(user.email);

    if (isUser) {
      throw new Error('a user with this email address already exist');
    }

    const newUser = user;
    newUser.password = Utils.hashPassword(user.password);
    const createdUser = User.createUser(newUser);

    const {
      id, type, isAdmin, firstName, lastName, email,
    } = createdUser;


    const payload = {
      id,
      type,
      isAdmin,
    };

    const token = Utils.jwtSigner(payload);

    return {
      token,
      id,
      firstName,
      lastName,
      email,
      isAdmin: user.isAdmin,
      type,
    };
  }
}

export default UserService;
