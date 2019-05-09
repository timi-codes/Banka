"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _account = _interopRequireDefault(require("../controllers/account.controller"));

var _BodySchemaValidator = _interopRequireDefault(require("../middlewares/BodySchemaValidator"));

var _ParamsSchemaValidator = _interopRequireDefault(require("../middlewares/ParamsSchemaValidator"));

var _AuthMiddleware = _interopRequireDefault(require("../middlewares/AuthMiddleware"));

var _PermissionMiddleware = _interopRequireDefault(require("../middlewares/PermissionMiddleware"));

var router = (0, _express.Router)();
var validateBody = (0, _BodySchemaValidator["default"])();
var validateParams = (0, _ParamsSchemaValidator["default"])();
router.post('/accounts', _AuthMiddleware["default"], validateBody, _account["default"].createBankAccount);
router.get('/accounts', _AuthMiddleware["default"], _PermissionMiddleware["default"].staffPermission, _account["default"].fetchAllAccounts);
router.get('/accounts/:accountNumber', _AuthMiddleware["default"], validateParams, _PermissionMiddleware["default"].strictAccountPermission, _account["default"].getAccount);
router.patch('/accounts/:accountNumber', _AuthMiddleware["default"], validateParams, validateBody, _PermissionMiddleware["default"].adminPermission, _account["default"].changeStatus);
router["delete"]('/accounts/:accountNumber', _AuthMiddleware["default"], validateParams, _PermissionMiddleware["default"].staffPermission, _account["default"].deleteAccount);
router.get('/user/:email/accounts', _AuthMiddleware["default"], validateParams, _PermissionMiddleware["default"].strictAccountPermission, _account["default"].getAUserAccounts);
var _default = router;
exports["default"] = _default;