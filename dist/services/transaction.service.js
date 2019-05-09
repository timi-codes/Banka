"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _transaction = _interopRequireDefault(require("../models/transaction.model"));

var _account = _interopRequireDefault(require("../models/account.model"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _mailer = _interopRequireDefault(require("../utils/mailer"));

var Account = new _account["default"]('accounts');
var Transaction = new _transaction["default"]('transactions');
var User = new _user["default"]('users');
/** service that allows cashier perform transaction of user's account */

var TransactionService =
/*#__PURE__*/
function () {
  function TransactionService() {
    (0, _classCallCheck2["default"])(this, TransactionService);
  }

  (0, _createClass2["default"])(TransactionService, null, [{
    key: "debitAccount",

    /**
     * @description debit user account
     * @param {object} a new transaction object
     */
    value: function () {
      var _debitAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(cashierId, accountNumber, amount) {
        var account, user, transaction, mailData;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return Account.findByAccountNumber(Number(accountNumber));

              case 3:
                account = _context.sent;

                if (!account) {
                  _context.next = 19;
                  break;
                }

                if (!(account.status === 'dormant')) {
                  _context.next = 7;
                  break;
                }

                throw new Error('You can\'t perform a transaction on a dormant account');

              case 7:
                if (!(account.balance >= amount)) {
                  _context.next = 18;
                  break;
                }

                _context.next = 10;
                return User.findUserById(Number(account.owner));

              case 10:
                user = _context.sent;
                _context.next = 13;
                return Transaction.debit(account, amount, cashierId);

              case 13:
                transaction = _context.sent;
                mailData = {
                  subject: 'A transaction occured on your Banka💸💵🏦 account',
                  text: 'A debit transaction occured on your bank account',
                  to: user.email,
                  html: "<b>Amount: \u20A6".concat(amount, "<br/><br/>\n              Transaction type: debit<br/><br/>\n              Account Balance: \u20A6").concat(transaction.newbalance, "<br/><br/>\n              Visit <a href='https://banka-timi.herokuapp.com/'>Banka App</a> today</b>")
                };
                _context.next = 17;
                return (0, _mailer["default"])(mailData);

              case 17:
                return _context.abrupt("return", {
                  transactionId: transaction.id,
                  accountNumber: Number(transaction.accountnumber),
                  amount: amount,
                  cashier: transaction.cashier,
                  transactionType: transaction.transactiontype,
                  accountBalance: transaction.newbalance
                });

              case 18:
                throw new Error('account balance is not sufficient');

              case 19:
                throw new Error('account number doesn\'t exist');

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 22]]);
      }));

      function debitAccount(_x, _x2, _x3) {
        return _debitAccount.apply(this, arguments);
      }

      return debitAccount;
    }()
    /**
     * @description credit user account
     * @param {object} a new transaction object
     */

  }, {
    key: "creditAccount",
    value: function () {
      var _creditAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(cashierId, accountNumber, amount) {
        var account, user, transaction, mailData;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return Account.findByAccountNumber(accountNumber);

              case 3:
                account = _context2.sent;

                if (!account) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 7;
                return User.findUserById(Number(account.owner));

              case 7:
                user = _context2.sent;
                _context2.next = 10;
                return Transaction.credit(account, amount, cashierId);

              case 10:
                transaction = _context2.sent;
                mailData = {
                  subject: 'A transaction occured on your Banka💸💵🏦 account',
                  text: 'A credit transaction occured on your bank account',
                  to: user.email,
                  html: "<b>Amount: \u20A6".concat(amount, "<br/><br/>\n            Transaction type: credit<br/><br/>\n            Account Balance: \u20A6").concat(transaction.newbalance, "<br/><br/>\n            Visit <a href='https://banka-timi.herokuapp.com/'>Banka App</a> today</b>")
                };
                _context2.next = 14;
                return (0, _mailer["default"])(mailData);

              case 14:
                return _context2.abrupt("return", {
                  transactionId: transaction.id,
                  accountNumber: Number(transaction.accountnumber),
                  amount: amount,
                  cashier: transaction.cashier,
                  transactionType: transaction.transactiontype,
                  accountBalance: transaction.newbalance
                });

              case 15:
                throw new Error('account number doesn\'t exist');

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 18]]);
      }));

      function creditAccount(_x4, _x5, _x6) {
        return _creditAccount.apply(this, arguments);
      }

      return creditAccount;
    }()
    /**
     * @description this function fetches a user account's account transactions
     * @param {object} response
     */

  }, {
    key: "getAllTransactions",
    value: function () {
      var _getAllTransactions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(accountNumber) {
        var foundAccount, transactions;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return Account.findByAccountNumber(accountNumber);

              case 3:
                foundAccount = _context3.sent;

                if (!foundAccount) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 7;
                return Transaction.getTransactions(Number(foundAccount.accountnumber));

              case 7:
                transactions = _context3.sent;
                return _context3.abrupt("return", transactions.map(function (transaction) {
                  var id = transaction.id,
                      transactiontype = transaction.transactiontype,
                      accountnumber = transaction.accountnumber,
                      createdon = transaction.createdon,
                      oldbalance = transaction.oldbalance,
                      newbalance = transaction.newbalance,
                      data = (0, _objectWithoutProperties2["default"])(transaction, ["id", "transactiontype", "accountnumber", "createdon", "oldbalance", "newbalance"]);
                  return (0, _objectSpread2["default"])({
                    transactionId: id,
                    createdOn: createdon,
                    type: transactiontype,
                    accountNumber: accountnumber
                  }, data, {
                    oldBalance: oldbalance,
                    newBalance: newbalance
                  });
                }));

              case 9:
                throw new Error('account number doesn\'t exist');

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 12]]);
      }));

      function getAllTransactions(_x7) {
        return _getAllTransactions.apply(this, arguments);
      }

      return getAllTransactions;
    }()
    /**
     * @description this function fetches a single user transaction
     * @param {object} response
     */

  }, {
    key: "getTransaction",
    value: function () {
      var _getTransaction = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(transactionId) {
        var transaction, id, transactiontype, accountnumber, createdon, oldbalance, newbalance, data;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return Transaction.getTransactionById(transactionId);

              case 3:
                transaction = _context4.sent;

                if (!transaction) {
                  _context4.next = 7;
                  break;
                }

                id = transaction.id, transactiontype = transaction.transactiontype, accountnumber = transaction.accountnumber, createdon = transaction.createdon, oldbalance = transaction.oldbalance, newbalance = transaction.newbalance, data = (0, _objectWithoutProperties2["default"])(transaction, ["id", "transactiontype", "accountnumber", "createdon", "oldbalance", "newbalance"]);
                return _context4.abrupt("return", (0, _objectSpread2["default"])({
                  transactionId: id,
                  createdOn: createdon,
                  type: transactiontype,
                  accountNumber: accountnumber
                }, data, {
                  oldBalance: oldbalance,
                  newBalance: newbalance
                }));

              case 7:
                throw new Error('transaction id doesn\'t exist');

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 10]]);
      }));

      function getTransaction(_x8) {
        return _getTransaction.apply(this, arguments);
      }

      return getTransaction;
    }()
  }]);
  return TransactionService;
}();

var _default = TransactionService;
exports["default"] = _default;