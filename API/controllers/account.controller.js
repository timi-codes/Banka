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
  static async createBankAccount(req, res) {
    const { id } = req.token;
    const { type, balance } = req.body;

    try {
      const account = await AccountService.createAccount(id, type, balance);
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
  static async fetchAllAccounts(req, res) {
    try {
      const accounts = await AccountService.getAllAccounts();
      if (accounts.length > 0) {
        return response.sendSuccess(res, 200, { accounts });
      }
      return response.sendError(res, 204, 'no account has been created');
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
  static async changeStatus(req, res) {
    const { status } = req.body;
    const { accountNumber } = req.params;
    try {
      const data = await AccountService.changeAccountStatus(accountNumber, status);
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
  static async getAccount(req, res) {
    const { accountNumber } = req.params;
    try {
      const data = await AccountService.getAccount(accountNumber);
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
  static async deleteAccount(req, res) {
    const { accountNumber } = req.params;
    try {
      const message = await AccountService.deleteAccount(accountNumber);
      return response.sendSuccess(res, 200, null, message);
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }
}


export default AccountController;
