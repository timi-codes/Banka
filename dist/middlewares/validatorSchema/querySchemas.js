"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var statusSchema = _joi["default"].object({
  status: _joi["default"].string().lowercase().valid('dormant', 'active')
});

var _default = {
  '/accounts?status=dormant': statusSchema
};
exports["default"] = _default;