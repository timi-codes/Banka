import Utils from '../utils/common';
import UserModel from '../models/user.model';

const User = new UserModel('users');

/** Class that allows user create and login  */
class UserService {
  /**
   * @description Create a new user
   * @param {object} a new user object
   */
  static async createUser(user) {
    try {
      const isUser = await User.findUserByEmail(user.email);

      if (isUser) {
        throw new Error('a user with this email address already exist');
      }

      const newUser = user;
      newUser.password = Utils.hashPassword(user.password);
      const createdUser = await User.createUser(newUser);

      const {
        id, type, isadmin, firstname, lastname, email,
      } = createdUser;

      const payload = {
        id,
        type,
        isAdmin: isadmin,
      };

      const token = Utils.jwtSigner(payload);

      return {
        token,
        id,
        firstName: firstname,
        lastName: lastname,
        email,
        isAdmin: isadmin,
        type,
      };
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description signs user into their account
   * @param {object} a new user object
   */

  static async signUser(login) {
    try {
      const user = await User.findUserByEmail(login.email);

      if (user) {
        const bycrptResponse = Utils.validatePassword(login.password, user.password);
        if (bycrptResponse) {
          const {
            id, firstname, lastname, isadmin, password: userPassword, ...data
          } = user;
          const userProfile = {
            id,
            isAdmin: isadmin,
            ...data,
          };
          const token = Utils.jwtSigner(userProfile);
          return {
            token,
            id,
            firstName: firstname,
            lastName: lastname,
            isAdmin: isadmin,
            ...userProfile,
          };
        }
      }
      throw new Error('invalid user credentials');
    } catch (err) {
      throw err;
    }
  }
}

export default UserService;
