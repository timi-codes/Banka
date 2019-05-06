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

var _user = _interopRequireDefault(require("../services/user.service"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

var response = new _ResponseGenerator["default"]();
/**
 * user controller performs user signup and sign in logic
 */

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "createUser",

    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof UserController
     */
    value: function () {
      var _createUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var user, createdUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = req.body;
                _context.prev = 1;
                _context.next = 4;
                return _user["default"].createUser(user);

              case 4:
                createdUser = _context.sent;

                if (!createdUser) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", response.sendSuccess(res, 201, createdUser));

              case 7:
                return _context.abrupt("return", response.sendError(res, 400, 'something went wrong'));

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", response.sendError(res, 400, _context.t0.message));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 10]]);
      }));

      function createUser(_x, _x2) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof UserController
     */

  }, {
    key: "loginUser",
    value: function () {
      var _loginUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var login, user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                login = req.body;
                _context2.prev = 1;
                _context2.next = 4;
                return _user["default"].signUser(login);

              case 4:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", response.sendSuccess(res, 200, user));

              case 7:
                return _context2.abrupt("return", response.sendError(res, 400, 'something went wrong'));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", response.sendError(res, 401, _context2.t0.message));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 10]]);
      }));

      function loginUser(_x3, _x4) {
        return _loginUser.apply(this, arguments);
      }

      return loginUser;
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
      _regenerator["default"].mark(function _callee3(req, res) {
        var email, accounts;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                email = req.params.email;
                _context3.prev = 1;
                _context3.next = 4;
                return _user["default"].getAUserAccounts(email);

              case 4:
                accounts = _context3.sent;

                if (!accounts) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", response.sendSuccess(res, 200, accounts));

              case 7:
                return _context3.abrupt("return", response.sendError(res, 400, 'something went wrong'));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", response.sendError(res, 401, _context3.t0.message));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 10]]);
      }));

      function getAUserAccounts(_x5, _x6) {
        return _getAUserAccounts.apply(this, arguments);
      }

      return getAUserAccounts;
    }()
  }]);
  return UserController;
}();

var _default = UserController;
exports["default"] = _default;