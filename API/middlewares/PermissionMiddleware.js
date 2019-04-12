import ResponseGenerator from '../utils/ResponseGenerator';
import AccountService from '../services/account.service';

const response = new ResponseGenerator();

/**
 * @description - User's Permission Middleware
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */
const permissionMiddleWare = (req, res, next) => {
  if (!req.token) {
    response.setError(419, 'How did you get pass the authentication middleware 😩😢😫');
    return response.send(res);
  }

  const { id, type, isAdmin } = req.token;

  const route = req.route.path;
  const method = req.method.toLowerCase();
  const { accountNumber } = req.params;

  if (route === '/accounts' && method === 'get' && type !== 'staff') {
    response.setError(403, 'only a staff has the permission to get all bank accounts');
    return response.send(res);
  }

  if (route === '/accounts/:accountNumber' && method === 'patch' && type !== 'staff') {
    response.setError(403, 'only a staff has the permission to change account status');
    return response.send(res);
  }

  if (route === '/accounts/:accountNumber' && method === 'delete' && type !== 'staff') {
    response.setError(403, 'only a staff has the permission to delete an account');
    return response.send(res);
  }

  if (route === '/transactions/:accountNumber/debit' && method === 'post' && (type !== 'staff' || isAdmin)) {
    response.setError(403, 'only a cashier has the permission to debit an account');
    return response.send(res);
  }

  if (route === '/transactions/:accountNumber/credit' && method === 'post' && (type !== 'staff' || isAdmin)) {
    response.setError(403, 'only a cashier has the permission to credit an account');
    return response.send(res);
  }

  if (route === '/accounts/:accountNumber' && method === 'get' && type !== 'staff') {
    if (!AccountService.isMyAccount(id, accountNumber)) {
      response.setError(403, 'only a staff has the permission to get other user\'s account');
      return response.send(res);
    }
  }

  next();
};

export default permissionMiddleWare;
