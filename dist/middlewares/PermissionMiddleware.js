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

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

var _account = _interopRequireDefault(require("../services/account.service"));

var _transaction = _interopRequireDefault(require("../services/transaction.service"));

var response = new _ResponseGenerator["default"]();

var PermissionMiddleware =
/*#__PURE__*/
function () {
  function PermissionMiddleware() {
    (0, _classCallCheck2["default"])(this, PermissionMiddleware);
  }

  (0, _createClass2["default"])(PermissionMiddleware, null, [{
    key: "strictAccountPermission",
    // static check419(req, res) {
    // }
    value: function () {
      var _strictAccountPermission = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res, next) {
        var _req$token, id, type, accountNumber, isMyAccount;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (req.token) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", response.sendError(res, 419, 'How did you get pass the authentication middleware 😩😢😫'));

              case 2:
                _req$token = req.token, id = _req$token.id, type = _req$token.type;
                accountNumber = req.params.accountNumber;
                _context.prev = 4;
                _context.next = 7;
                return _account["default"].isMyAccount(id, accountNumber);

              case 7:
                isMyAccount = _context.sent;

                if (!(!isMyAccount && type !== 'staff')) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", response.sendError(res, 403, 'only a staff has the permission to view other accounts and transactions'));

              case 10:
                return _context.abrupt("return", next());

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](4);
                return _context.abrupt("return", response.sendError(res, 400, _context.t0.message));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 13]]);
      }));

      function strictAccountPermission(_x, _x2, _x3) {
        return _strictAccountPermission.apply(this, arguments);
      }

      return strictAccountPermission;
    }()
  }, {
    key: "strictTransactionPermission",
    value: function () {
      var _strictTransactionPermission = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res, next) {
        var _req$token2, id, type, transactionId, transaction, isMyAccount;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (req.token) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", response.sendError(res, 419, 'How did you get pass the authentication middleware 😩😢😫'));

              case 2:
                _req$token2 = req.token, id = _req$token2.id, type = _req$token2.type;
                transactionId = req.params.transactionId;
                _context2.prev = 4;
                _context2.next = 7;
                return _transaction["default"].getTransaction(transactionId);

              case 7:
                transaction = _context2.sent;
                isMyAccount = transaction.owner === id;

                if (!(!isMyAccount && type !== 'staff')) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", response.sendError(res, 403, 'only a staff has the permission to view other accounts and transactions'));

              case 11:
                return _context2.abrupt("return", next());

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](4);
                return _context2.abrupt("return", response.sendError(res, 400, _context2.t0.message));

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 14]]);
      }));

      function strictTransactionPermission(_x4, _x5, _x6) {
        return _strictTransactionPermission.apply(this, arguments);
      }

      return strictTransactionPermission;
    }()
  }, {
    key: "cashierPermission",
    value: function cashierPermission(req, res, next) {
      if (!req.token) {
        return response.sendError(res, 419, 'How did you get pass the authentication middleware 😩😢😫');
      }

      var _req$token3 = req.token,
          type = _req$token3.type,
          isAdmin = _req$token3.isAdmin;

      if (isAdmin || type !== 'staff') {
        return response.sendError(res, 403, 'only a cashier can perform this operation');
      }

      return next();
    }
  }, {
    key: "adminPermission",
    value: function adminPermission(req, res, next) {
      if (!req.token) {
        return response.sendError(res, 419, 'How did you get pass the authentication middleware 😩😢😫');
      }

      var isAdmin = req.token.isAdmin;

      if (!isAdmin) {
        return response.sendError(res, 403, 'only an admin can perform this operation');
      }

      return next();
    }
  }, {
    key: "staffPermission",
    value: function staffPermission(req, res, next) {
      if (!req.token) {
        return response.sendError(res, 419, 'How did you get pass the authentication middleware 😩😢😫');
      }

      var type = req.token.type;

      if (type !== 'staff') {
        return response.sendError(res, 403, 'only a staff can perform this operation');
      }

      return next();
    }
  }]);
  return PermissionMiddleware;
}(); // const messages = [
//   'only a staff has the permission to change account status',
//   'only a staff has the permission to delete an account',
//   "only a staff has the permission to get other user's account",
// ];
// const paths = ['patch', 'delete', 'get'];
// const getNestedObject = (nestedObj, pathArr) => pathArr.reduce((obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined), nestedObj);
// /**
//  * @description - User's Permission Middleware
//  *
//  * @param {Object} request
//  * @param {Object} response
//  * @param {Function} next
//  *
//  * @returns {Object} Object
//  */
// const permissionMiddleWare = async (req, res, next) => {
//   if (!req.token) {
//     return response.sendError(
//       res,
//       419,
//       'How did you get pass the authentication middleware 😩😢😫',
//     );
//   }
//   const route = req.route.path;
//   const method = req.method.toLowerCase();
//   const { accountNumber } = req.params;
//   const routes = {
//     '/accounts': {
//       valid: method === 'get' && type !== 'staff',
//       message: 'only a staff has the permission to get all bank accounts',
//     },
//     '/transactions/:accountNumber/debit': {
//       valid: method === 'post' && (type !== 'staff' || isAdmin),
//       message: 'only a cashier has the permission to debit an account',
//     },
//     '/transactions/:accountNumber/credit': {
//       valid: method === 'post' && (type !== 'staff' || isAdmin),
//       message: 'only a cashier has the permission to credit an account',
//     },
//   };
//   if (route in routes && getNestedObject(routes, [route, 'valid'])) {
//     return response.sendError(res, 403, getNestedObject(routes, [route, 'message']));
//   }
//   const indexOfMethod = paths.indexOf(method);
//   const isValid = route === '/accounts/:accountNumber' && method === paths[indexOfMethod] && type !== 'staff';
//   if (isValid && indexOfMethod < 2) {
//     return response.sendError(res, 403, messages[indexOfMethod]);
//   }
//   const isMyAccount = await AccountService.isMyAccount(id, accountNumber);
//   if (isValid && !isMyAccount) {
//     return response.sendError(res, 403, messages[indexOfMethod]);
//   }
//   if (route === '/transactions/:transactionId' && ) {
//     return response.sendError(res, 403, 'only a staff has the permission to see other user\'s transaction');
//   }
//   next();
// };


exports["default"] = PermissionMiddleware;