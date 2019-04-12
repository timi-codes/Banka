"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _account = _interopRequireDefault(require("../services/account.service"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var response = new _ResponseGenerator["default"]();
/**
 * account controller performs account related function - CRUD
 */

var AccountController =
/*#__PURE__*/
function () {
  function AccountController() {
    _classCallCheck(this, AccountController);
  }

  _createClass(AccountController, null, [{
    key: "createBankAccount",

    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof AccountController
     */
    value: function createBankAccount(req, res) {
      var id = req.token.id;
      var _req$body = req.body,
          type = _req$body.type,
          balance = _req$body.balance;

      try {
        var account = _account["default"].createAccount(id, type, balance);

        if (account) {
          response.setSuccess(201, account);
        }

        return response.send(res);
      } catch (error) {
        response.setError(400, error.message);
        return response.send(res);
      }
    }
    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof AccountController
     */

  }, {
    key: "fetchAllAccounts",
    value: function fetchAllAccounts(req, res) {
      var accounts = _account["default"].getAllAccounts();

      if (accounts.length > 0) {
        response.setSuccess(200, {
          accounts: accounts
        });
      } else {
        response.setError(204, 'no account has been created');
      }

      return response.send(res);
    }
    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof AccountController
     */

  }, {
    key: "changeStatus",
    value: function changeStatus(req, res) {
      var status = req.body.status;
      var accountNumber = req.params.accountNumber;

      try {
        var data = _account["default"].changeAccountStatus(accountNumber, status);

        if (data) {
          response.setSuccess(200, data);
        }

        return response.send(res);
      } catch (error) {
        response.setError(400, error.message);
        return response.send(res);
      }
    }
    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof AccountController
     */

  }, {
    key: "getAccount",
    value: function getAccount(req, res) {
      var accountNumber = req.params.accountNumber;

      try {
        var data = _account["default"].getAccount(accountNumber);

        if (data) {
          response.setSuccess(200, data);
        }

        return response.send(res);
      } catch (error) {
        response.setError(400, error.message);
        return response.send(res);
      }
    }
    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof AccountController
     */

  }, {
    key: "deleteAccount",
    value: function deleteAccount(req, res) {
      var accountNumber = req.params.accountNumber;

      try {
        var message = _account["default"].deleteAccount(accountNumber);

        if (message) {
          response.setSuccess(200, null, message);
        }

        return response.send(res);
      } catch (error) {
        response.setError(400, error.message);
        return response.send(res);
      }
    }
  }]);

  return AccountController;
}();

var _default = AccountController;
exports["default"] = _default;