import AccountService from '../services/account.service';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();

/**
 * account controller performs account related function - CRUD
 */
class AccountController {
  /**
   * @param{object}  request express request object
   * @param{object}  response express request object
   * @returns {json} json
   * @memberof AccountController
   */
  static createBankAccount(req, res) {
    const { id } = req.token;
    const { type, balance } = req.body;

    try {
      const account = AccountService.createAccount(id, type, balance);
      if (account) {
        response.setSuccess(201, account);
      }
      return response.send(res);
    } catch (error) {
      response.setError(403, error.message);
      return response.send(res);
    }
  }
}


export default AccountController;
