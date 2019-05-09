"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _BodySchemaValidator = _interopRequireDefault(require("../middlewares/BodySchemaValidator"));

var _PermissionMiddleware = _interopRequireDefault(require("../middlewares/PermissionMiddleware"));

var _AuthMiddleware = _interopRequireDefault(require("../middlewares/AuthMiddleware"));

var router = (0, _express.Router)();
var validateRequest = (0, _BodySchemaValidator["default"])();
router.post('/signup', validateRequest, _user["default"].createUser);
router.post('/signin', validateRequest, _user["default"].loginUser);
router.post('/create/staff', _AuthMiddleware["default"], validateRequest, _PermissionMiddleware["default"].adminPermission, _user["default"].createStaff);
var _default = router;
exports["default"] = _default;