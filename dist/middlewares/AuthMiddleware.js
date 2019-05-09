"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

var response = new _ResponseGenerator["default"]();
/**
 * @description - use for decoding token
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 * @param {String} token
 *
 * @returns {Object} Object
 */

var decodeToken = function decodeToken(req, res, next, token) {
  _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, function (error, decode) {
    if (!error) {
      req.token = decode;
      return next();
    }

    return response.sendError(res, 401, 'invalid request token');
  });
};
/**
 * @description - User's Authentication Middleware
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */


var authMiddleware = function authMiddleware(req, res, next) {
  var token = req.headers['x-access-token'] || req.headers.Authorization || req.headers.token || req.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    return decodeToken(req, res, next, token);
  }

  return response.sendError(res, 401, 'please assign a access token as header');
};

var _default = authMiddleware;
exports["default"] = _default;