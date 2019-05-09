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

var _account = _interopRequireDefault(require("../services/account.service"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

var response = new _ResponseGenerator["default"]();
/**
 * account controller performs account related function - CRUD
 */

var AccountController =
/*#__PURE__*/
function () {
  function AccountController() {
    (0, _classCallCheck2["default"])(this, AccountController);
  }

  (0, _createClass2["default"])(AccountController, null, [{
    key: "createBankAccount",

    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof AccountController
     */
    value: function () {
      var _createBankAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var id, _req$body, type, balance, account;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = req.token.id;
                _req$body = req.body, type = _req$body.type, balance = _req$body.balance;
                _context.prev = 2;
                _context.next = 5;
                return _account["default"].createAccount(id, type, balance);

              case 5:
                account = _context.sent;
                return _context.abrupt("return", response.sendSuccess(res, 201, account));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);
                return _context.abrupt("return", response.sendError(res, 400, _context.t0.message));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 9]]);
      }));

      function createBankAccount(_x, _x2) {
        return _createBankAccount.apply(this, arguments);
      }

      return createBankAccount;
    }()
    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof AccountController
     */

  }, {
    key: "fetchAllAccounts",
    value: function () {
      var _fetchAllAccounts = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var status, accounts, filtered;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                status = req.query.status;
                _context2.prev = 1;

                if (!(status && !['dormant', 'active'].includes(status))) {
                  _context2.next = 4;
                  break;
                }

                throw new Error('invalid status query');

              case 4:
                _context2.next = 6;
                return _account["default"].getAllAccounts();

              case 6:
                accounts = _context2.sent;

                if (!(accounts.length > 0)) {
                  _context2.next = 14;
                  break;
                }

                if (!status) {
                  _context2.next = 13;
                  break;
                }

                filtered = accounts.find(function (account) {
                  return account.status === status;
                });

                if (!filtered) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", response.sendSuccess(res, 200, [filtered], 'Account was successfully fetched'));

              case 12:
                return _context2.abrupt("return", response.sendSuccess(res, 200, [], 'No account found'));

              case 13:
                return _context2.abrupt("return", response.sendSuccess(res, 200, accounts, 'Account was successfully fetched'));

              case 14:
                return _context2.abrupt("return", response.sendError(res, 204, 'no account has been created'));

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", response.sendError(res, 400, _context2.t0.message));

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 17]]);
      }));

      function fetchAllAccounts(_x3, _x4) {
        return _fetchAllAccounts.apply(this, arguments);
      }

      return fetchAllAccounts;
    }()
    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof AccountController
     */

  }, {
    key: "changeStatus",
    value: function () {
      var _changeStatus = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var status, accountNumber, data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                status = req.body.status;
                accountNumber = req.params.accountNumber;
                _context3.prev = 2;
                _context3.next = 5;
                return _account["default"].changeAccountStatus(accountNumber, status);

              case 5:
                data = _context3.sent;
                return _context3.abrupt("return", response.sendSuccess(res, 200, data, 'Account status was successfully changed'));

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](2);
                return _context3.abrupt("return", response.sendError(res, 400, _context3.t0.message));

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 9]]);
      }));

      function changeStatus(_x5, _x6) {
        return _changeStatus.apply(this, arguments);
      }

      return changeStatus;
    }()
    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof AccountController
     */

  }, {
    key: "getAccount",
    value: function () {
      var _getAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var accountNumber, data;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                accountNumber = req.params.accountNumber;
                _context4.prev = 1;
                _context4.next = 4;
                return _account["default"].getAccount(accountNumber);

              case 4:
                data = _context4.sent;
                return _context4.abrupt("return", response.sendSuccess(res, 200, data, 'Account was successfully fetched'));

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", response.sendError(res, 400, _context4.t0.message));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 8]]);
      }));

      function getAccount(_x7, _x8) {
        return _getAccount.apply(this, arguments);
      }

      return getAccount;
    }()
    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof UserController
     */

  }, {
    key: "getAUserAccounts",
    value: function () {
      var _getAUserAccounts = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res) {
        var email, accounts;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                email = req.params.email;
                _context5.prev = 1;
                _context5.next = 4;
                return _account["default"].getAUserAccounts(email);

              case 4:
                accounts = _context5.sent;

                if (!accounts) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt("return", response.sendSuccess(res, 200, accounts, 'Accounts was successfully fetched'));

              case 7:
                return _context5.abrupt("return", response.sendError(res, 400, 'something went wrong'));

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](1);
                return _context5.abrupt("return", response.sendError(res, 400, _context5.t0.message));

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 10]]);
      }));

      function getAUserAccounts(_x9, _x10) {
        return _getAUserAccounts.apply(this, arguments);
      }

      return getAUserAccounts;
    }()
    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof AccountController
     */

  }, {
    key: "deleteAccount",
    value: function () {
      var _deleteAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(req, res) {
        var accountNumber, message;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                accountNumber = req.params.accountNumber;
                _context6.prev = 1;
                _context6.next = 4;
                return _account["default"].deleteAccount(accountNumber);

              case 4:
                message = _context6.sent;
                return _context6.abrupt("return", response.sendSuccess(res, 200, null, message));

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](1);
                return _context6.abrupt("return", response.sendError(res, 400, _context6.t0.message));

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 8]]);
      }));

      function deleteAccount(_x11, _x12) {
        return _deleteAccount.apply(this, arguments);
      }

      return deleteAccount;
    }()
  }]);
  return AccountController;
}();

var _default = AccountController;
exports["default"] = _default;