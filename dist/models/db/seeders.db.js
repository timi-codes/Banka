"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _async = _interopRequireDefault(require("async"));

var _debug = _interopRequireDefault(require("debug"));

var _connection = _interopRequireDefault(require("./connection.db"));

var _dummyData = _interopRequireDefault(require("../dummyData"));

var userQueryText = 'INSERT INTO users (email, firstName, lastName, password, type, isAdmin) values ($1, $2, $3, $4, $5, $6) returning *';
var accountQueryText = 'INSERT INTO accounts (accountNumber, owner, type, status, balance) values ($1, $2, $3, $4, $5) returning *';
var transactionQueryText = 'INSERT INTO transactions (accountNumber, cashier, transactionType, amount, oldBalance, newBalance) values ($1, $2, $3, $4, $5, $6) returning *';

function userTask1(_x) {
  return _userTask.apply(this, arguments);
}

function _userTask() {
  _userTask = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(callback) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _connection["default"].query(userQueryText, _dummyData["default"].users[0], function (err) {
              if (err) (0, _debug["default"])('pg/seeder')(err);
              callback(null, 'Inserted First User');
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _userTask.apply(this, arguments);
}

function userTask2(_x2) {
  return _userTask2.apply(this, arguments);
}

function _userTask2() {
  _userTask2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(callback) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _connection["default"].query(userQueryText, _dummyData["default"].users[1], function (err) {
              if (err) (0, _debug["default"])('pg/seeder')(err);
              callback(null, 'Inserted Second User');
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _userTask2.apply(this, arguments);
}

function userTask3(_x3) {
  return _userTask3.apply(this, arguments);
}

function _userTask3() {
  _userTask3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(callback) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _connection["default"].query(userQueryText, _dummyData["default"].users[2], function (err) {
              if (err) (0, _debug["default"])('pg/seeder')(err);
              callback(null, 'Inserted Third User');
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _userTask3.apply(this, arguments);
}

function userTask4(_x4) {
  return _userTask4.apply(this, arguments);
}

function _userTask4() {
  _userTask4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(callback) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _connection["default"].query(userQueryText, _dummyData["default"].users[3], function (err) {
              if (err) (0, _debug["default"])('pg/seeder')(err);
              callback(null, 'Inserted Forth User');
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _userTask4.apply(this, arguments);
}

function accountTask1(_x5) {
  return _accountTask.apply(this, arguments);
}

function _accountTask() {
  _accountTask = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(callback) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _connection["default"].query(accountQueryText, _dummyData["default"].accounts[0], function (err) {
              if (err) (0, _debug["default"])('pg/seeder')(err);
              callback(null, 'Inserted First Account');
            });

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _accountTask.apply(this, arguments);
}

function accountTask2(_x6) {
  return _accountTask2.apply(this, arguments);
}

function _accountTask2() {
  _accountTask2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(callback) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _connection["default"].query(accountQueryText, _dummyData["default"].accounts[1], function (err) {
              if (err) (0, _debug["default"])('pg/seeder')(err);
              callback(null, 'Inserted Second Account');
            });

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _accountTask2.apply(this, arguments);
}

function transactionTask1(_x7) {
  return _transactionTask.apply(this, arguments);
}

function _transactionTask() {
  _transactionTask = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(callback) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _connection["default"].query(transactionQueryText, _dummyData["default"].transactions[0], function (err) {
              if (err) (0, _debug["default"])('pg/seeder')(err);
              callback(null, 'Inserted First Transaction');
            });

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _transactionTask.apply(this, arguments);
}

function transactionTask2(_x8) {
  return _transactionTask2.apply(this, arguments);
}

function _transactionTask2() {
  _transactionTask2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(callback) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _connection["default"].query(transactionQueryText, _dummyData["default"].transactions[1], function (err) {
              if (err) (0, _debug["default"])('pg/seeder')(err);
              callback(null, 'Inserted Second Transaction');
            });

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _transactionTask2.apply(this, arguments);
}

var tasks = [userTask1, userTask2, userTask3, userTask4, accountTask1, accountTask2, transactionTask1, transactionTask2];

_async["default"].series(tasks, function (err, results) {
  if (err) console.log(err);
  if (results) console.log(results);
});