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
      if (createdUser) {
        response.setSuccess(201, createdUser);
      }
      return response.send(res);
    } catch (error) {
      response.setError(400, error.message);
      return response.send(res);
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
      if (user) {
        response.setSuccess(200, user);
      }
      return response.send(res);
    } catch (error) {
      response.setError(401, error.message);
      return response.send(res);
    }
  }
}

export default UserController;
