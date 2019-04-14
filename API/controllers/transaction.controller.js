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
  static debitUserAccount(req, res) {
    const { amount } = req.body;
    const { id } = req.token;
    const { accountNumber } = req.params;

    try {
      const transaction = TransactionService.debitAccount(id, accountNumber, amount);
      return response.sendSuccess(res, 200, transaction);
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
  static creditUserAccount(req, res) {
    const { amount } = req.body;
    const { id } = req.token;
    const { accountNumber } = req.params;

    try {
      const transaction = TransactionService.creditAccount(id, accountNumber, amount);
      return response.sendSuccess(res, 200, transaction);
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }
}

export default TransactionController;
