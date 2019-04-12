"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _account = _interopRequireDefault(require("../models/account.model"));

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** service that allows user create bank account, delete bank account */
var AccountService =
/*#__PURE__*/
function () {
  function AccountService() {
    _classCallCheck(this, AccountService);
  }

  _createClass(AccountService, null, [{
    key: "createAccount",

    /**
     * @description Create a new user
     * @param {object} a new user object
     */
    value: function createAccount(userId, type, balance) {
      var user = _user["default"].findUserById(userId); // check if user alredy exist


      if (user) {
        // check if user already has a bank account
        var account = _account["default"].findAccountByOwner(userId);

        if (account) {
          throw new Error("user already have an account - ".concat(account.accountNumber));
        } // create a new bank account


        var newAccount = _account["default"].create({
          owner: userId,
          type: type,
          balance: balance
        });

        return {
          accountNumber: newAccount.accountNumber,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          type: type,
          balance: balance
        };
      }

      throw new Error('user doesn\'t exist');
    }
    /**
     * @description it fetches all accounts
     * @param {array} of user objects
     */

  }, {
    key: "getAllAccounts",
    value: function getAllAccounts() {
      return _account["default"].findAll().map(function (account) {
        var owner = account.owner,
            data = _objectWithoutProperties(account, ["owner"]);

        var user = _user["default"].findUserById(owner);

        return _objectSpread({}, data, {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });
      });
    }
    /**
     * @description this function fetches a single user account
     * @param {object} response
     */

  }, {
    key: "getAccount",
    value: function getAccount(accountNumber) {
      var foundAccount = _account["default"].findByAccountNumber(Number(accountNumber));

      if (foundAccount) {
        var owner = foundAccount.owner,
            data = _objectWithoutProperties(foundAccount, ["owner"]);

        var user = _user["default"].findUserById(owner);

        return _objectSpread({}, data, {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });
      }

      throw new Error('account number doesn\'t exist');
    }
    /**
     * @description this function change account status
     * @param {object} response
     */

  }, {
    key: "changeAccountStatus",
    value: function changeAccountStatus(accountNumber, status) {
      var foundAccount = _account["default"].findByAccountNumber(Number(accountNumber));

      if (foundAccount) {
        var account = _account["default"].update(foundAccount, status);

        return {
          accountNumber: account.accountNumber,
          status: status
        };
      }

      throw new Error('account number doesn\'t exist');
    }
    /**
     * @description fetches all accounts
     * @param {object} response
     */

  }, {
    key: "deleteAccount",
    value: function deleteAccount(accountNumber) {
      var foundAccount = _account["default"].findByAccountNumber(Number(accountNumber));

      if (foundAccount) {
        var isDeleted = _account["default"]["delete"](foundAccount);

        if (isDeleted) {
          return 'Account successfully deleted';
        }
      }

      throw new Error('account number doesn\'t exist');
    }
    /**
     * @description this function checks if an account belongs to a user
     * @param {object} response
     */

  }, {
    key: "isMyAccount",
    value: function isMyAccount(id, accountNumber) {
      var foundAccount = _account["default"].findByAccountNumber(Number(accountNumber));

      if (foundAccount) {
        if (foundAccount.owner !== Number(id)) {
          return false;
        }
      }

      return true;
    }
  }]);

  return AccountService;
}();

var _default = AccountService;
exports["default"] = _default;