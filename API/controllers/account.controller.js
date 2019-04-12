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
      response.setError(400, error.message);
      return response.send(res);
    }
  }

  /**
   * @param{object}  request express request object
   * @param{object}  response express request object
   * @returns {json} json
   * @memberof AccountController
   */
  static fetchAllAccounts(req, res) {
    const accounts = AccountService.getAllAccounts();
    if (accounts.length > 0) {
      response.setSuccess(200, { accounts });
    } else {
      response.setError(204, 'no account has been created');
    }
    return response.send(res);
  }

  /**
   * @param{object}  request express request object
   * @param{object}  response express request object
   * @returns {json} json
   * @memberof AccountController
   */
  static changeStatus(req, res) {
    const { status } = req.body;
    const { accountNumber } = req.params;
    try {
      const data = AccountService.changeAccountStatus(accountNumber, status);
      if (data) {
        response.setSuccess(200, data);
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
   * @memberof AccountController
   */
  static getAccount(req, res) {
    const { accountNumber } = req.params;
    try {
      const data = AccountService.getAccount(accountNumber);
      if (data) {
        response.setSuccess(200, data);
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
   * @memberof AccountController
   */
  static deleteAccount(req, res) {
    const { accountNumber } = req.params;
    try {
      const message = AccountService.deleteAccount(accountNumber);
      if (message) {
        response.setSuccess(200, null, message);
      }
      return response.send(res);
    } catch (error) {
      response.setError(400, error.message);
      return response.send(res);
    }
  }
}


export default AccountController;
