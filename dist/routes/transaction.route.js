"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _transaction = _interopRequireDefault(require("../controllers/transaction.controller"));

var _SchemaValidator = _interopRequireDefault(require("../middlewares/SchemaValidator"));

var _AuthMiddleware = _interopRequireDefault(require("../middlewares/AuthMiddleware"));

var _PermissionMiddleware = _interopRequireDefault(require("../middlewares/PermissionMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
var validateRequest = (0, _SchemaValidator["default"])(false);
router.post('/transactions/:accountNumber/debit', _AuthMiddleware["default"], _PermissionMiddleware["default"], validateRequest, _transaction["default"].debitUserAccount);
router.post('/transactions/:accountNumber/credit', _AuthMiddleware["default"], _PermissionMiddleware["default"], validateRequest, _transaction["default"].creditUserAccount);
var _default = router;
exports["default"] = _default;