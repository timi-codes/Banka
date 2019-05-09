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

var _transaction = _interopRequireDefault(require("../services/transaction.service"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

var response = new _ResponseGenerator["default"]();
/**
 * user controller performs user signup and sign in logic
 */

var TransactionController =
/*#__PURE__*/
function () {
  function TransactionController() {
    (0, _classCallCheck2["default"])(this, TransactionController);
  }

  (0, _createClass2["default"])(TransactionController, null, [{
    key: "debitUserAccount",

    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof TransactionController
     */
    value: function () {
      var _debitUserAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var amount, id, accountNumber, transaction;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                amount = req.body.amount;
                id = req.token.id;
                accountNumber = req.params.accountNumber;
                _context.prev = 3;
                _context.next = 6;
                return _transaction["default"].debitAccount(id, accountNumber, amount);

              case 6:
                transaction = _context.sent;
                return _context.abrupt("return", response.sendSuccess(res, 200, transaction, 'Transaction was successful'));

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);
                return _context.abrupt("return", response.sendError(res, 400, _context.t0.message));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 10]]);
      }));

      function debitUserAccount(_x, _x2) {
        return _debitUserAccount.apply(this, arguments);
      }

      return debitUserAccount;
    }()
    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof TransactionController
     */

  }, {
    key: "creditUserAccount",
    value: function () {
      var _creditUserAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var amount, id, accountNumber, transaction;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                amount = req.body.amount;
                id = req.token.id;
                accountNumber = req.params.accountNumber;
                _context2.prev = 3;
                _context2.next = 6;
                return _transaction["default"].creditAccount(id, accountNumber, amount);

              case 6:
                transaction = _context2.sent;
                return _context2.abrupt("return", response.sendSuccess(res, 200, transaction, 'Transaction was successful'));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](3);
                return _context2.abrupt("return", response.sendError(res, 400, _context2.t0.message));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 10]]);
      }));

      function creditUserAccount(_x3, _x4) {
        return _creditUserAccount.apply(this, arguments);
      }

      return creditUserAccount;
    }()
    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof TransactionController
     */

  }, {
    key: "getTransactions",
    value: function () {
      var _getTransactions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var accountNumber, data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                accountNumber = req.params.accountNumber;
                _context3.prev = 1;
                _context3.next = 4;
                return _transaction["default"].getAllTransactions(accountNumber);

              case 4:
                data = _context3.sent;
                return _context3.abrupt("return", response.sendSuccess(res, 200, data, 'Transactions was successfully fetched'));

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", response.sendError(res, 400, _context3.t0.message));

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 8]]);
      }));

      function getTransactions(_x5, _x6) {
        return _getTransactions.apply(this, arguments);
      }

      return getTransactions;
    }()
    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof TransactionController
     */

  }, {
    key: "getATransaction",
    value: function () {
      var _getATransaction = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var transactionId, data;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                transactionId = req.params.transactionId;
                _context4.prev = 1;
                _context4.next = 4;
                return _transaction["default"].getTransaction(transactionId);

              case 4:
                data = _context4.sent;
                return _context4.abrupt("return", response.sendSuccess(res, 200, data, 'Transaction was successfully fetched'));

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

      function getATransaction(_x7, _x8) {
        return _getATransaction.apply(this, arguments);
      }

      return getATransaction;
    }()
  }]);
  return TransactionController;
}();

var _default = TransactionController;
exports["default"] = _default;