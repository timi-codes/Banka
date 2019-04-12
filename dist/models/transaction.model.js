"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dummyData = _interopRequireDefault(require("./dummyData"));

var _common = _interopRequireDefault(require("../utils/common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Transaction =
/*#__PURE__*/
function () {
  function Transaction() {
    _classCallCheck(this, Transaction);
  }

  _createClass(Transaction, null, [{
    key: "credit",
    value: function credit(account, amount, cashierId) {
      var userAccount = account;
      var newBalance = userAccount.balance + amount;
      userAccount.balance = newBalance;
      var newTransaction = {
        transactionId: _common["default"].getNextTransactionId(_dummyData["default"].transactions),
        accountNumber: account.accountNumber,
        amount: amount,
        cashier: cashierId,
        transactionType: 'credit',
        accountBalance: newBalance.toFixed(2)
      };

      _dummyData["default"].transactions.push(newTransaction);

      return newTransaction;
    }
  }, {
    key: "debit",
    value: function debit(account, amount, cashierId) {
      var userAccount = account;
      var newBalance = userAccount.balance - amount;
      userAccount.balance = newBalance;
      var newTransaction = {
        transactionId: _common["default"].getNextTransactionId(_dummyData["default"].transactions),
        accountNumber: account.accountNumber,
        amount: amount,
        cashier: cashierId,
        transactionType: 'debit',
        accountBalance: newBalance.toFixed(2)
      };

      _dummyData["default"].transactions.push(newTransaction);

      return newTransaction;
    }
  }]);

  return Transaction;
}();

exports["default"] = Transaction;