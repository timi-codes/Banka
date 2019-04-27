import UserService from '../services/user.service';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();

/**
 * user controller performs user signup and sign in and create staff logic
 */
class UserController {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof UserController
   */

  static async createUser(req, res) {
    const user = req.body;
    try {
      const createdUser = await UserService.createUser(user);
      if (createdUser) {
        return response.sendSuccess(res, 201, createdUser, 'Registration was successful');
      }
      return response.sendError(res, 400, 'something went wrong');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }

  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof UserController
   */
  static async loginUser(req, res) {
    const login = req.body;
    try {
      const user = await UserService.signUser(login);
      if (user) {
        return response.sendSuccess(res, 200, user, 'Login was successful');
      }
      return response.sendError(res, 400, 'something went wrong');
    } catch (error) {
      return response.sendError(res, 401, error.message);
    }
  }

  /**
   * @param {object} req request express request object
   * @param {object} res express request object
   * @returns {json} json
   * @memberof UserController
   */

  static async createStaff(req, res) {
    const user = req.body;
    try {
      const createdUser = await UserService.createAStaff(user);
      if (createdUser) {
        return response.sendSuccess(res, 201, createdUser, 'Staff created successfully');
      }
      return response.sendError(res, 400, 'something went wrong');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }
}

export default UserController;
