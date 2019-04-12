"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _SchemaValidator = _interopRequireDefault(require("../middlewares/SchemaValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
var validateRequest = (0, _SchemaValidator["default"])(false);
router.post('/signup', validateRequest, _user["default"].createUser);
router.post('/signin', validateRequest, _user["default"].loginUser);
var _default = router;
exports["default"] = _default;