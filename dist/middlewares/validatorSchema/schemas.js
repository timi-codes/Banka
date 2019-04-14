"use strict";

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * schema.js
 */
var name = _joi["default"].string().regex(/^[A-Z]|[a-z]+$/).required();

var email = _joi["default"].string().email().lowercase().required();

var password = _joi["default"].string().min(7).required().strict();

var createUserSchema = _joi["default"].object({
  firstName: name,
  lastName: name,
  email: email,
  password: password,
  confirmPassword: _joi["default"].string().valid(_joi["default"].ref('password')).required().strict().error(new Error('your password and confirm password do not match')),
  type: _joi["default"].when('isAdmin', {
    is: true,
    then: _joi["default"].string().lowercase().valid('staff')["default"]('staff').error(new Error('an admin cannot register as a client')),
    otherwise: _joi["default"].string().lowercase().valid('client', 'staff').required()
  }),
  isAdmin: _joi["default"]["boolean"]()["default"](false)
});

var loginUserSchema = _joi["default"].object({
  email: email,
  password: password
});

var createAccountSchema = _joi["default"].object({
  type: _joi["default"].string().lowercase().valid('savings', 'current').required(),
  balance: _joi["default"].number().positive().allow(0).precision(2)["default"](0.00)
});

var updateStatusSchema = _joi["default"].object({
  status: _joi["default"].string().lowercase().valid('dormant', 'active').required()
});

var transactionSchema = _joi["default"].object({
  amount: _joi["default"].number().positive().precision(2).required()
});

module.exports = {
  '/signup': createUserSchema,
  '/signin': loginUserSchema,
  '/accounts': createAccountSchema,
  '/accounts/:accountNumber': updateStatusSchema,
  '/transactions/:accountNumber/debit': transactionSchema,
  '/transactions/:accountNumber/credit': transactionSchema
};