"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _dummyData = _interopRequireDefault(require("./dummyData"));

var _common = _interopRequireDefault(require("../utils/common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Account =
/*#__PURE__*/
function () {
  function Account() {
    _classCallCheck(this, Account);
  }

  _createClass(Account, null, [{
    key: "create",
    value: function create(account) {
      var newId = _common["default"].getNextId(_dummyData["default"].accounts);

      var newAccount = account;
      newAccount.id = newId;
      newAccount.accountNumber = _common["default"].generateAccountNumber(_dummyData["default"].accounts);
      newAccount.createdOn = (0, _moment["default"])();
      newAccount.status = 'dormant';

      _dummyData["default"].accounts.push(newAccount);

      return newAccount;
    }
  }, {
    key: "findAll",
    value: function findAll() {
      return _dummyData["default"].accounts;
    }
  }, {
    key: "findByAccountNumber",
    value: function findByAccountNumber(accountNumber) {
      var source = _dummyData["default"].accounts;
      var foundAccount = source.find(function (account) {
        return account.accountNumber === accountNumber;
      });
      return foundAccount;
    }
  }, {
    key: "findAccountByOwner",
    value: function findAccountByOwner(id) {
      var foundAccount = _dummyData["default"].accounts.find(function (account) {
        return account.owner === id;
      });

      return foundAccount;
    }
  }, {
    key: "update",
    value: function update(account, status) {
      var userAccount = account;
      userAccount.status = status;
      return userAccount;
    }
  }, {
    key: "delete",
    value: function _delete(account) {
      var userAccount = account;

      var index = _dummyData["default"].accounts.indexOf(userAccount);

      if (index > -1) {
        _dummyData["default"].accounts.splice(index, 1);

        return true;
      }

      return false;
    }
  }]);

  return Account;
}();

exports["default"] = Account;