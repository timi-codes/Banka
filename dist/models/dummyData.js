"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = _interopRequireDefault(require("../utils/common"));

var _default = {
  accounts: [[2220107727, 1, 'savings', 'active', 0.00], [2220108726, 3, 'current', 'dormant', 0.00]],
  users: [['tejumoladavid@gmail.com', 'David', 'Tejumola', _common["default"].hashPassword('password'), 'staff', true], ['johnoke@gmail.com', 'John', 'Oke', _common["default"].hashPassword('password'), 'staff', false], ['boladeojo@gmail.com', 'Bolade', 'Ojo', _common["default"].hashPassword('password'), 'client', false], ['sholaadeola@gmail.com', 'Shola', 'Adeola', _common["default"].hashPassword('password'), 'client', false]],
  transactions: [[2220107727, 1, 'debit', 10000.00, 0.00, 10000.00], [2220107727, 2, 'debit', 10000.00, 0.00, 10000.00], [2220107727, 1, 'debit', 10000.00, 0.00, 10000.00]]
};
exports["default"] = _default;