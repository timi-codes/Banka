import ResponseGenerator from '../utils/ResponseGenerator';
import AccountService from '../services/account.service';

const response = new ResponseGenerator();


const messages = [
  'only a staff has the permission to change account status',
  'only a staff has the permission to delete an account',
  'only a staff has the permission to get other user\'s account',
];

const paths = [
  'patch',
  'delete',
  'get',
];

const getNestedObject = (nestedObj, pathArr) => pathArr.reduce((obj, key) => ((obj && obj[key] !== 'undefined') ? obj[key] : undefined), nestedObj);

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
  if (!req.token) { return response.sendError(res, 419, 'How did you get pass the authentication middleware 😩😢😫'); }

  const { id, type, isAdmin } = req.token;

  const route = req.route.path;
  const method = req.method.toLowerCase();
  const { accountNumber } = req.params;


  const routes = {
    '/accounts': {
      valid: method === 'get' && type !== 'staff',
      message: 'only a staff has the permission to get all bank accounts',
    },
    '/transactions/:accountNumber/debit': {
      valid: method === 'post' && (type !== 'staff' || isAdmin),
      message: 'only a cashier has the permission to debit an account',
    },
    '/transactions/:accountNumber/credit': {
      valid: method === 'post' && (type !== 'staff' || isAdmin),
      message: 'only a cashier has the permission to credit an account',
    },
  };


  if (route in routes && getNestedObject(routes, [route, 'valid'])) { return response.sendError(res, 403, getNestedObject(routes, [route, 'message'])); }

  const indexOfMethod = paths.indexOf(method);
  const isValid = (route === '/accounts/:accountNumber' && method === paths[indexOfMethod] && type !== 'staff');

  if (isValid && indexOfMethod < 2) {
    return response.sendError(res, 403, messages[indexOfMethod]);
  } if (isValid && !AccountService.isMyAccount(id, accountNumber)) {
    return response.sendError(res, 403, messages[indexOfMethod]);
  }

  next();
};

export default permissionMiddleWare;
