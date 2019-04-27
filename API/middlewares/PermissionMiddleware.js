import Joi from 'joi';
import ResponseGenerator from '../utils/ResponseGenerator';
import AccountService from '../services/account.service';
import TransactionService from '../services/transaction.service';

const response = new ResponseGenerator();

export default class PermissionMiddleware {
  static async strictAccountPermission(req, res, next) {
    if (!req.token) {
      return response.sendError(
        res,
        419,
        'How did you get pass the authentication middleware 😩😢😫',
      );
    }
    const { id, type } = req.token;
    const { accountNumber } = req.params;

    try {
      const isMyAccount = await AccountService.isMyAccount(id, accountNumber);

      if (!isMyAccount && type !== 'staff') {
        return response.sendError(res, 403, 'only a staff has the permission to view other accounts and transactions');
      }
      return next();
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }

  static async strictTransactionPermission(req, res, next) {
    if (!req.token) {
      return response.sendError(
        res,
        419,
        'How did you get pass the authentication middleware 😩😢😫',
      );
    }
    const { id, type } = req.token;
    const { transactionId } = req.params;

    try {
      const transaction = await TransactionService.getTransaction(transactionId);

      const isMyAccount = transaction.owner === id;

      if (!isMyAccount && type !== 'staff') {
        return response.sendError(res, 403, 'only a staff has the permission to view other accounts and transactions');
      }
      return next();
    } catch (error) {
      return response.sendError(res, 400, error.message);
    }
  }


  static cashierPermission(req, res, next) {
    if (!req.token) {
      return response.sendError(
        res,
        419,
        'How did you get pass the authentication middleware 😩😢😫',
      );
    }
    const { type, isAdmin } = req.token;

    if (isAdmin || type !== 'staff') {
      return response.sendError(res, 403, 'only a cashier can perform this operation');
    }
    return next();
  }

  static adminPermission(req, res, next) {
    if (!req.token) {
      return response.sendError(
        res,
        419,
        'How did you get pass the authentication middleware 😩😢😫',
      );
    }
    const { isAdmin } = req.token;

    if (!isAdmin) {
      return response.sendError(res, 403, 'only an admin can perform this operation');
    }
    return next();
  }

  static staffPermission(req, res, next) {
    if (!req.token) {
      return response.sendError(
        res,
        419,
        'How did you get pass the authentication middleware 😩😢😫',
      );
    }
    const { type } = req.token;

    if (type !== 'staff') {
      return response.sendError(res, 403, 'only a staff can perform this operation');
    }
    return next();
  }
}
