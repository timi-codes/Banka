import UserService from '../services/user.service';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();

/**
 * user controller performs user signup and sign in logic
 */
class UserController {
  /**
   * @param{object}  request express request object
   * @param{object}  response express request object
   * @returns {json} json
   * @memberof UserController
   */

  static createUser(req, res) {
    const user = req.body;
    try {
      const createdUser = UserService.createUser(user);
      return response.sendSuccess(res, 201, createdUser);
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }

  /**
   * @param{object}  request express request object
   * @param{object}  response express request object
   * @returns {json} json
   * @memberof UserController
   */
  static loginUser(req, res) {
    const login = req.body;
    try {
      const user = UserService.signUser(login);
      return response.sendSuccess(res, 200, user);
    } catch (error) {
      return response.sendError(res, 401, error.message);
    }
  }
}

export default UserController;
