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

var _account = _interopRequireDefault(require("../models/account.model"));

var _user = _interopRequireDefault(require("../models/user.model"));

var User = new _user["default"]('users');
var Account = new _account["default"]('accounts');
/** service that allows user create bank account, delete bank account */

var AccountService =
/*#__PURE__*/
function () {
  function AccountService() {
    (0, _classCallCheck2["default"])(this, AccountService);
  }

  (0, _createClass2["default"])(AccountService, null, [{
    key: "createAccount",

    /**
     * @description Create a new user
     * @param {object} a new user object
     */
    value: function () {
      var _createAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(userId, type, balance) {
        var user, account, newAccount;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return User.findUserById(userId);

              case 3:
                user = _context.sent;

                if (!user) {
                  _context.next = 14;
                  break;
                }

                _context.next = 7;
                return Account.findAccountByOwner(userId);

              case 7:
                account = _context.sent;

                if (!account) {
                  _context.next = 10;
                  break;
                }

                throw new Error("user already have an account - ".concat(account.accountnumber));

              case 10:
                _context.next = 12;
                return Account.create({
                  owner: userId,
                  type: type,
                  balance: balance
                });

              case 12:
                newAccount = _context.sent;
                return _context.abrupt("return", {
                  accountNumber: newAccount.accountnumber,
                  firstName: user.firstname,
                  lastName: user.lastname,
                  email: user.email,
                  type: type,
                  balance: balance.toFixed(2)
                });

              case 14:
                throw new Error('user doesn\'t exist');

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 17]]);
      }));

      function createAccount(_x, _x2, _x3) {
        return _createAccount.apply(this, arguments);
      }

      return createAccount;
    }()
    /**
     * @description it fetches all accounts
     * @param {array} of user objects
     */

  }, {
    key: "getAllAccounts",
    value: function () {
      var _getAllAccounts = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var accounts, outputs, promises;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return Account.findAll();

              case 3:
                accounts = _context3.sent;
                outputs = [];
                promises = accounts.map(
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee2(account) {
                    var owner, accountnumber, createdon, data, user;
                    return _regenerator["default"].wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            owner = account.owner, accountnumber = account.accountnumber, createdon = account.createdon, data = (0, _objectWithoutProperties2["default"])(account, ["owner", "accountnumber", "createdon"]);
                            _context2.next = 3;
                            return User.findUserById(owner);

                          case 3:
                            user = _context2.sent;
                            outputs.push((0, _objectSpread2["default"])({
                              createdOn: createdon,
                              accountNumber: accountnumber,
                              ownerEmail: user.email
                            }, data));

                          case 5:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x4) {
                    return _ref.apply(this, arguments);
                  };
                }());
                _context3.next = 8;
                return Promise.all(promises);

              case 8:
                return _context3.abrupt("return", outputs);

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11]]);
      }));

      function getAllAccounts() {
        return _getAllAccounts.apply(this, arguments);
      }

      return getAllAccounts;
    }()
    /**
     * @description this function fetches a single user account
     * @param {object} response
     */

  }, {
    key: "getAccount",
    value: function () {
      var _getAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(accountNumber) {
        var foundAccount, owner, accountnumber, createdon, data, user;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return Account.findByAccountNumber(accountNumber);

              case 3:
                foundAccount = _context4.sent;

                if (!foundAccount) {
                  _context4.next = 10;
                  break;
                }

                owner = foundAccount.owner, accountnumber = foundAccount.accountnumber, createdon = foundAccount.createdon, data = (0, _objectWithoutProperties2["default"])(foundAccount, ["owner", "accountnumber", "createdon"]);
                _context4.next = 8;
                return User.findUserById(owner);

              case 8:
                user = _context4.sent;
                return _context4.abrupt("return", (0, _objectSpread2["default"])({
                  createdOn: createdon,
                  accountNumber: Number(accountnumber),
                  ownerEmail: user.email
                }, data));

              case 10:
                throw new Error('account number doesn\'t exist');

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 13]]);
      }));

      function getAccount(_x5) {
        return _getAccount.apply(this, arguments);
      }

      return getAccount;
    }()
    /**
     * @description this function change account status
     * @param {object} response
     */

  }, {
    key: "changeAccountStatus",
    value: function () {
      var _changeAccountStatus = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(accountNumber, status) {
        var foundAccount, account;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return Account.findByAccountNumber(Number(accountNumber));

              case 3:
                foundAccount = _context5.sent;

                if (!foundAccount) {
                  _context5.next = 10;
                  break;
                }

                _context5.next = 7;
                return Account.updateStatus(Number(accountNumber), status);

              case 7:
                account = _context5.sent;

                if (!account) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return", {
                  accountNumber: Number(account.accountnumber),
                  status: status
                });

              case 10:
                throw new Error('account number doesn\'t exist');

              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 13]]);
      }));

      function changeAccountStatus(_x6, _x7) {
        return _changeAccountStatus.apply(this, arguments);
      }

      return changeAccountStatus;
    }()
    /**
     * @description fetches all accounts
     * @param {object} response
     */

  }, {
    key: "deleteAccount",
    value: function () {
      var _deleteAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(accountNumber) {
        var foundAccount, isDeleted;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return Account.findByAccountNumber(Number(accountNumber));

              case 3:
                foundAccount = _context6.sent;

                if (!foundAccount) {
                  _context6.next = 10;
                  break;
                }

                _context6.next = 7;
                return Account.deleteAccount(Number(accountNumber));

              case 7:
                isDeleted = _context6.sent;

                if (!isDeleted) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt("return", 'Account successfully deleted');

              case 10:
                throw new Error('account number doesn\'t exist');

              case 13:
                _context6.prev = 13;
                _context6.t0 = _context6["catch"](0);
                throw _context6.t0;

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 13]]);
      }));

      function deleteAccount(_x8) {
        return _deleteAccount.apply(this, arguments);
      }

      return deleteAccount;
    }()
    /**
     * @description this function checks if an account belongs to a user
     * @param {object} response
     */

  }, {
    key: "isMyAccount",
    value: function () {
      var _isMyAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(id, accountNumber) {
        var foundAccount;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return Account.findByAccountNumber(accountNumber);

              case 3:
                foundAccount = _context7.sent;

                if (!foundAccount) {
                  _context7.next = 7;
                  break;
                }

                if (!(Number(foundAccount.owner) !== Number(id))) {
                  _context7.next = 7;
                  break;
                }

                return _context7.abrupt("return", false);

              case 7:
                return _context7.abrupt("return", true);

              case 10:
                _context7.prev = 10;
                _context7.t0 = _context7["catch"](0);
                throw _context7.t0;

              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 10]]);
      }));

      function isMyAccount(_x9, _x10) {
        return _isMyAccount.apply(this, arguments);
      }

      return isMyAccount;
    }()
  }]);
  return AccountService;
}();

var _default = AccountService;
exports["default"] = _default;