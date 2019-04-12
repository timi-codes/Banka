"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

var _account = _interopRequireDefault(require("../services/account.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var response = new _ResponseGenerator["default"]();
/**
 * @description - User's Permission Middleware
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */

var permissionMiddleWare = function permissionMiddleWare(req, res, next) {
  if (!req.token) {
    response.setError(400, 'How did you get pass the authentication middleware 😩😢😫');
    return response.send(res);
  }

  var _req$token = req.token,
      id = _req$token.id,
      type = _req$token.type,
      isAdmin = _req$token.isAdmin;
  var route = req.route.path;
  var method = req.method.toLowerCase();
  var accountNumber = req.params.accountNumber;

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
    if (!_account["default"].isMyAccount(id, accountNumber)) {
      response.setError(403, 'only a staff has the permission to get other user\'s account');
      return response.send(res);
    }
  }

  next();
};

var _default = permissionMiddleWare;
exports["default"] = _default;