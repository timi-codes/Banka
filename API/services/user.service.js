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

  /**
   * @description signs user into their account
   * @param {object} a new user object
   */

  static signUser(login) {
    const user = User.findUserByEmail(login.email);

    if (user) {
      const bycrptResponse = Utils.validatePassword(login.password, user.password);
      if (bycrptResponse) {
        const { id, password: userPassword, ...data } = user;
        const userProfile = { id, ...data };
        const token = Utils.jwtSigner(userProfile);
        return {
          token,
          ...userProfile,
        };
      }
    }
    throw new Error('invalid user credentials');
  }
}

export default UserService;
