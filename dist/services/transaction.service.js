"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transaction = _interopRequireDefault(require("../models/transaction.model"));

var _account = _interopRequireDefault(require("../models/account.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** service that allows cashier perform transaction of user's account */
var TransactionService =
/*#__PURE__*/
function () {
  function TransactionService() {
    _classCallCheck(this, TransactionService);
  }

  _createClass(TransactionService, null, [{
    key: "debitAccount",

    /**
     * @description debit user account
     * @param {object} a new transaction object
     */
    value: function debitAccount(cashierId, accountNumber, amount) {
      var account = _account["default"].findByAccountNumber(Number(accountNumber));

      if (account) {
        if (account.balance > amount) {
          var transaction = _transaction["default"].debit(account, amount, cashierId);

          return transaction;
        }

        throw new Error('account balance is not sufficient');
      }

      throw new Error('account number doesn\'t exist');
    }
    /**
     * @description credit user account
     * @param {object} a new transaction object
     */

  }, {
    key: "creditAccount",
    value: function creditAccount(cashierId, accountNumber, amount) {
      var account = _account["default"].findByAccountNumber(Number(accountNumber));

      if (account) {
        var transaction = _transaction["default"].credit(account, amount, cashierId);

        return transaction;
      }

      throw new Error('account number doesn\'t exist');
    }
  }]);

  return TransactionService;
}();

var _default = TransactionService;
exports["default"] = _default;