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

var User =
/*#__PURE__*/
function (_Model) {
  (0, _inherits2["default"])(User, _Model);

  function User() {
    (0, _classCallCheck2["default"])(this, User);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(User).apply(this, arguments));
  }

  (0, _createClass2["default"])(User, [{
    key: "createUser",
    value: function () {
      var _createUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(user) {
        var _ref, rows;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.insert('email, firstName, lastName, password', '$1, $2, $3, $4', [user.email, user.firstName, user.lastName, user.password]);

              case 3:
                _ref = _context.sent;
                rows = _ref.rows;
                this.logJSON(rows[0]);
                return _context.abrupt("return", rows[0]);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function createUser(_x) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }, {
    key: "findUserByEmail",
    value: function () {
      var _findUserByEmail = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(email) {
        var _ref2, rows;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.selectWhere('id, email, firstName, lastName, password, type, isAdmin', 'email=$1', [email]);

              case 3:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                return _context2.abrupt("return", rows[0]);

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

      function findUserByEmail(_x2) {
        return _findUserByEmail.apply(this, arguments);
      }

      return findUserByEmail;
    }()
  }, {
    key: "findUserById",
    value: function () {
      var _findUserById = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(id) {
        var _ref3, rows;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.selectWhere('id, email, firstName, lastName, password, type, isAdmin', 'id=$1', [id]);

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

      function findUserById(_x3) {
        return _findUserById.apply(this, arguments);
      }

      return findUserById;
    }()
  }]);
  return User;
}(_index["default"]);

var _default = User;
exports["default"] = _default;