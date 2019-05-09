"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var accountNumber = _joi["default"].string().regex(/^\d+$/).required();

var accountNumberSchema = _joi["default"].object({
  accountNumber: accountNumber.error(new Error('accountNumber must be an integer'))
});

var transactionIdSchema = _joi["default"].object({
  transactionId: accountNumber.error(new Error('trasactionId must be an integer'))
});

var emailSchema = _joi["default"].object({
  email: _joi["default"].string().email({
    minDomainAtoms: 2
  }).lowercase().required()
});

var _default = {
  '/accounts/:accountNumber': accountNumberSchema,
  '/transactions/:accountNumber/credit': accountNumberSchema,
  '/transactions/:accountNumber/debit': accountNumberSchema,
  '/accounts/:accountNumber/transactions': accountNumberSchema,
  '/transactions/:transactionId': transactionIdSchema,
  '/user/:email/accounts': emailSchema
};
exports["default"] = _default;