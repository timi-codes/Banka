import TransactionService from '../services/transaction.service';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();

/**
 * user controller performs user signup and sign in logic
 */
class TransactionController {
  /**
   * @param{object}  request express request object
   * @param{object}  response express request object
   * @returns {json} json
   * @memberof TransactionController
   */
  static async debitUserAccount(req, res) {
    const { amount } = req.body;
    const { id } = req.token;
    const { accountNumber } = req.params;

    try {
      const transaction = await TransactionService.debitAccount(id, accountNumber, amount);
      return response.sendSuccess(res, 200, transaction, 'Transaction was successful');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }

  /**
   * @param{object}  request express request object
   * @param{object}  response express request object
   * @returns {json} json
   * @memberof TransactionController
   */
  static async creditUserAccount(req, res) {
    const { amount } = req.body;
    const { id } = req.token;
    const { accountNumber } = req.params;

    try {
      const transaction = await TransactionService.creditAccount(id, accountNumber, amount);
      return response.sendSuccess(res, 200, transaction, 'Transaction was successful');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }

  /**
   * @param{object}  request express request object
   * @param{object}  response express request object
   * @returns {json} json
   * @memberof TransactionController
   */
  static async getTransactions(req, res) {
    const { accountNumber } = req.params;
    try {
      const data = await TransactionService.getAllTransactions(accountNumber);
      return response.sendSuccess(res, 200, data, 'Transactions was successfully fetched');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }

  /**
   * @param{object}  request express request object
   * @param{object}  response express request object
   * @returns {json} json
   * @memberof TransactionController
   */
  static async getATransaction(req, res) {
    const { transactionId } = req.params;
    try {
      const data = await TransactionService.getTransaction(transactionId);
      return response.sendSuccess(res, 200, data, 'Transaction was successfully fetched');
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }
}

export default TransactionController;
