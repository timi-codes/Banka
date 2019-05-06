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

var Account =
/*#__PURE__*/
function (_Model) {
  (0, _inherits2["default"])(Account, _Model);

  function Account() {
    (0, _classCallCheck2["default"])(this, Account);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Account).apply(this, arguments));
  }

  (0, _createClass2["default"])(Account, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(account) {
        var _ref, rows;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.insert('owner, type, balance', '$1, $2, $3', [account.owner, account.type, account.balance]);

              case 3:
                _ref = _context.sent;
                rows = _ref.rows;
                return _context.abrupt("return", rows[0]);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "findAll",
    value: function () {
      var _findAll = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        var _ref2, rows;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.select('createdOn, accountNumber, owner, type, status, balance');

              case 3:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                return _context2.abrupt("return", rows);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function findAll() {
        return _findAll.apply(this, arguments);
      }

      return findAll;
    }()
  }, {
    key: "findByAccountNumber",
    value: function () {
      var _findByAccountNumber = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(accountNumber) {
        var _ref3, rows;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.selectWhere('createdOn, accountNumber,owner, type, status, balance', 'accountNumber=$1', [accountNumber]);

              case 3:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                return _context3.abrupt("return", rows[0]);

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

      function findByAccountNumber(_x2) {
        return _findByAccountNumber.apply(this, arguments);
      }

      return findByAccountNumber;
    }()
  }, {
    key: "findAccountByOwner",
    value: function () {
      var _findAccountByOwner = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(id) {
        var _ref4, rows;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.selectWhere('accountNumber, owner, type, status, balance', 'owner=$1', [id]);

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

      function findAccountByOwner(_x3) {
        return _findAccountByOwner.apply(this, arguments);
      }

      return findAccountByOwner;
    }()
  }, {
    key: "updateStatus",
    value: function () {
      var _updateStatus = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(accountNumber, status) {
        var _ref5, rows;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.update('status=$1', 'accountNumber=$2', [status, accountNumber]);

              case 3:
                _ref5 = _context5.sent;
                rows = _ref5.rows;
                return _context5.abrupt("return", rows[0]);

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 8]]);
      }));

      function updateStatus(_x4, _x5) {
        return _updateStatus.apply(this, arguments);
      }

      return updateStatus;
    }()
  }, {
    key: "deleteAccount",
    value: function () {
      var _deleteAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(accountNumber) {
        var _ref6, rows;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this["delete"]('accountNumber=$1', [accountNumber]);

              case 3:
                _ref6 = _context6.sent;
                rows = _ref6.rows;
                this.logJSON(rows);
                return _context6.abrupt("return", rows[0]);

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](0);
                throw _context6.t0;

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 9]]);
      }));

      function deleteAccount(_x6) {
        return _deleteAccount.apply(this, arguments);
      }

      return deleteAccount;
    }()
  }]);
  return Account;
}(_index["default"]);

var _default = Account;
exports["default"] = _default;