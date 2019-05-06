"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _transaction = _interopRequireDefault(require("../controllers/transaction.controller"));

var _SchemaValidator = _interopRequireDefault(require("../middlewares/SchemaValidator"));

var _AuthMiddleware = _interopRequireDefault(require("../middlewares/AuthMiddleware"));

var _PermissionMiddleware = _interopRequireDefault(require("../middlewares/PermissionMiddleware"));

var router = (0, _express.Router)();
var validateRequest = (0, _SchemaValidator["default"])();
router.post('/transactions/:accountNumber/debit', _AuthMiddleware["default"], _PermissionMiddleware["default"].cashierPermission, validateRequest, _transaction["default"].debitUserAccount);
router.post('/transactions/:accountNumber/credit', _AuthMiddleware["default"], _PermissionMiddleware["default"].cashierPermission, validateRequest, _transaction["default"].creditUserAccount);
router.get('/accounts/:accountNumber/transactions', _AuthMiddleware["default"], _PermissionMiddleware["default"].strictAccountPermission, validateRequest, _transaction["default"].getTransactions);
router.get('/transactions/:transactionId', _AuthMiddleware["default"], _PermissionMiddleware["default"].strictTransactionPermission, validateRequest, _transaction["default"].getATransaction);
var _default = router;
exports["default"] = _default;