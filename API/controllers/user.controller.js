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
}

export default UserController;
