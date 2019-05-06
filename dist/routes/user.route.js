"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _SchemaValidator = _interopRequireDefault(require("../middlewares/SchemaValidator"));

var router = (0, _express.Router)();
var validateRequest = (0, _SchemaValidator["default"])();
router.post('/signup', validateRequest, _user["default"].createUser);
router.post('/signin', validateRequest, _user["default"].loginUser);
router.get('/user/:email/accounts', validateRequest, _user["default"].getAUserAccounts);
var _default = router;
exports["default"] = _default;