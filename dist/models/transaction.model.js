"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _index = _interopRequireDefault(require("./db/index.db"));

var Transaction =
/*#__PURE__*/
function (_Model) {
  (0, _inherits2["default"])(Transaction, _Model);

  function Transaction() {
    (0, _classCallCheck2["default"])(this, Transaction);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Transaction).apply(this, arguments));
  }

  (0, _createClass2["default"])(Transaction, [{
    key: "credit",
    value: function () {
      var _credit = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(account, amount, cashierId) {
        var userAccount, newBalance, _ref, rows;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userAccount = account;
                newBalance = parseFloat(userAccount.balance) + amount;
                _context.prev = 2;
                _context.next = 5;
                return this.insert('accountNumber, cashier, transactionType, amount, oldbalance, newbalance', '$1, $2, $3, $4, $5, $6', [Number(account.accountnumber), cashierId, 'credit', amount, userAccount.balance, newBalance]);

              case 5:
                _ref = _context.sent;
                rows = _ref.rows;
                return _context.abrupt("return", rows[0]);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);
                throw _context.t0;

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 10]]);
      }));

      function credit(_x, _x2, _x3) {
        return _credit.apply(this, arguments);
      }

      return credit;
    }()
  }, {
    key: "debit",
    value: function () {
      var _debit = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(account, amount, cashierId) {
        var userAccount, newBalance, _ref2, rows;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userAccount = account;
                newBalance = parseFloat(userAccount.balance) - amount;
                _context2.prev = 2;
                _context2.next = 5;
                return this.insert('accountNumber, cashier, transactionType, amount, oldbalance, newbalance', '$1, $2, $3, $4, $5, $6', [Number(account.accountnumber), cashierId, 'debit', amount, userAccount.balance, newBalance]);

              case 5:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                return _context2.abrupt("return", rows[0]);

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](2);
                throw _context2.t0;

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 10]]);
      }));

      function debit(_x4, _x5, _x6) {
        return _debit.apply(this, arguments);
      }

      return debit;
    }()
  }, {
    key: "getTransactions",
    value: function () {
      var _getTransactions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(accountNumber) {
        var _ref3, rows;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.selectWhere('id, createdOn, transactiontype, accountNumber, amount, oldBalance, newBalance', 'accountNumber=$1', [accountNumber]);

              case 3:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                return _context3.abrupt("return", rows);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function getTransactions(_x7) {
        return _getTransactions.apply(this, arguments);
      }

      return getTransactions;
    }()
  }, {
    key: "getTransactionById",
    value: function () {
      var _getTransactionById = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(id) {
        var _ref4, rows;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.selectWithJoin('trans.id, trans.createdOn, transactiontype, trans.accountNumber, amount, oldBalance, newBalance, owner', 'trans.id=$1', [id]);

              case 3:
                _ref4 = _context4.sent;
                rows = _ref4.rows;
                return _context4.abrupt("return", rows[0]);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 8]]);
      }));

      function getTransactionById(_x8) {
        return _getTransactionById.apply(this, arguments);
      }

      return getTransactionById;
    }()
  }]);
  return Transaction;
}(_index["default"]);

exports["default"] = Transaction;