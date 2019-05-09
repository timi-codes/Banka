"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _transaction = _interopRequireDefault(require("../controllers/transaction.controller"));

var _BodySchemaValidator = _interopRequireDefault(require("../middlewares/BodySchemaValidator"));

var _ParamsSchemaValidator = _interopRequireDefault(require("../middlewares/ParamsSchemaValidator"));

var _AuthMiddleware = _interopRequireDefault(require("../middlewares/AuthMiddleware"));

var _PermissionMiddleware = _interopRequireDefault(require("../middlewares/PermissionMiddleware"));

var router = (0, _express.Router)();
var validateBody = (0, _BodySchemaValidator["default"])();
var validateParams = (0, _ParamsSchemaValidator["default"])();
router.post('/transactions/:accountNumber/debit', _AuthMiddleware["default"], _PermissionMiddleware["default"].cashierPermission, validateParams, validateBody, _transaction["default"].debitUserAccount);
router.post('/transactions/:accountNumber/credit', _AuthMiddleware["default"], _PermissionMiddleware["default"].cashierPermission, validateParams, validateBody, _transaction["default"].creditUserAccount);
router.get('/accounts/:accountNumber/transactions', _AuthMiddleware["default"], validateParams, _PermissionMiddleware["default"].strictAccountPermission, _transaction["default"].getTransactions);
router.get('/transactions/:transactionId', _AuthMiddleware["default"], validateParams, _PermissionMiddleware["default"].strictTransactionPermission, _transaction["default"].getATransaction);
var _default = router;
exports["default"] = _default;