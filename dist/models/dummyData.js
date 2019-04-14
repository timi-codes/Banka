"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _common = _interopRequireDefault(require("../utils/common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  accounts: [{
    id: 1,
    accountNumber: 222010772,
    createdOn: (0, _moment["default"])(),
    owner: 1,
    type: 'savings',
    status: 'active',
    balance: 20000.95
  }, {
    id: 2,
    accountNumber: 222010872,
    createdOn: (0, _moment["default"])(),
    owner: 3,
    type: 'current',
    status: 'dormant',
    balance: 400000.95
  }],
  users: [{
    id: 1,
    email: 'tejumoladavid@gmail.com',
    firstName: 'David',
    lastName: 'Tejumola',
    password: _common["default"].hashPassword('password'),
    type: 'staff',
    isAdmin: true
  }, {
    id: 2,
    email: 'johnoke@gmail.com',
    firstName: 'John',
    lastName: 'Oke',
    password: _common["default"].hashPassword('password'),
    type: 'staff',
    isAdmin: false
  }, {
    id: 3,
    email: 'boladeojo@gmail.com',
    firstName: 'Bolade',
    lastName: 'Ojo',
    password: _common["default"].hashPassword('password'),
    type: 'client',
    isAdmin: false
  }, {
    id: 4,
    email: 'sholaadeola@gmail.com',
    firstName: 'Shola',
    lastName: 'Adeola',
    password: _common["default"].hashPassword('password'),
    type: 'client',
    isAdmin: false
  }],
  transactions: [{
    transactionId: 1,
    accountNumber: 222010772,
    cashier: 1,
    transactionType: 'debit',
    accountBalance: '10000.00'
  }, {
    transactionId: 2,
    accountNumber: 222010772,
    cashier: 1,
    transactionType: 'debit',
    accountBalance: '10000.00'
  }, {
    transactionId: 3,
    accountNumber: 222010772,
    cashier: 1,
    transactionType: 'debit',
    accountBalance: '10000.00'
  }]
};
exports["default"] = _default;