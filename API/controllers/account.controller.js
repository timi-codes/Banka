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
      return response.sendSuccess(res, 201, account);
    } catch (error) {
      return response.sendError(res, 400, error.message);
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
      return response.sendSuccess(res, 200, { accounts });
    }
    return response.sendError(res, 204, 'no account has been created');
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
      return response.sendSuccess(res, 200, data);
    } catch (error) {
      return response.sendError(res, 400, error.message);
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
      return response.sendSuccess(res, 200, data);
    } catch (error) {
      return response.sendError(res, 400, error.message);
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
      return response.sendSuccess(res, 200, null, message);
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }
}


export default AccountController;
