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

var _common = _interopRequireDefault(require("../utils/common"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _mailer = _interopRequireDefault(require("../utils/mailer"));

var User = new _user["default"]('users');
/** Class that allows user create and login  */

var UserService =
/*#__PURE__*/
function () {
  function UserService() {
    (0, _classCallCheck2["default"])(this, UserService);
  }

  (0, _createClass2["default"])(UserService, null, [{
    key: "createUser",

    /**
     * @description Create a new user
     * @param {object} a new user object
     */
    value: function () {
      var _createUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(user) {
        var isUser, newUser, createdUser, id, type, isadmin, firstname, lastname, email, payload, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return User.findUserByEmail(user.email);

              case 3:
                isUser = _context.sent;

                if (!isUser) {
                  _context.next = 6;
                  break;
                }

                throw new Error('a user with this email address already exist');

              case 6:
                newUser = user;
                newUser.type = 'client';
                newUser.isAdmin = false;
                newUser.password = _common["default"].hashPassword(user.password);
                _context.next = 12;
                return User.createUser(newUser);

              case 12:
                createdUser = _context.sent;
                id = createdUser.id, type = createdUser.type, isadmin = createdUser.isadmin, firstname = createdUser.firstname, lastname = createdUser.lastname, email = createdUser.email;
                payload = {
                  id: id,
                  type: type,
                  isAdmin: isadmin
                };
                token = _common["default"].jwtSigner(payload);
                return _context.abrupt("return", {
                  token: token,
                  id: id,
                  firstName: firstname,
                  lastName: lastname,
                  email: email,
                  isAdmin: isadmin,
                  type: type
                });

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 19]]);
      }));

      function createUser(_x) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
    /**
     * @description signs user into their account
     * @param {object} a new user object
     */

  }, {
    key: "signUser",
    value: function () {
      var _signUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(login) {
        var user, bycrptResponse, id, firstname, lastname, isadmin, userPassword, data, userProfile, token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return User.findUserByEmail(login.email);

              case 3:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 11;
                  break;
                }

                bycrptResponse = _common["default"].validatePassword(login.password, user.password);

                if (!bycrptResponse) {
                  _context2.next = 11;
                  break;
                }

                id = user.id, firstname = user.firstname, lastname = user.lastname, isadmin = user.isadmin, userPassword = user.password, data = (0, _objectWithoutProperties2["default"])(user, ["id", "firstname", "lastname", "isadmin", "password"]);
                userProfile = (0, _objectSpread2["default"])({
                  id: id,
                  isAdmin: isadmin
                }, data);
                token = _common["default"].jwtSigner(userProfile);
                return _context2.abrupt("return", (0, _objectSpread2["default"])({
                  token: token,
                  id: id,
                  firstName: firstname,
                  lastName: lastname,
                  isAdmin: isadmin
                }, userProfile));

              case 11:
                throw new Error('invalid user credentials');

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 14]]);
      }));

      function signUser(_x2) {
        return _signUser.apply(this, arguments);
      }

      return signUser;
    }()
    /**
     * @description Create a new staff
     * @param {object} a new user object
     */

  }, {
    key: "createAStaff",
    value: function () {
      var _createAStaff = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(user) {
        var isStaff, newStaff, plainPassword, createdStaff, id, type, isadmin, firstname, lastname, email, mailData;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return User.findUserByEmail(user.email);

              case 3:
                isStaff = _context3.sent;

                if (!isStaff) {
                  _context3.next = 6;
                  break;
                }

                throw new Error('a user with this email address already exist');

              case 6:
                newStaff = user;
                newStaff.type = 'staff';
                plainPassword = user.password;
                newStaff.password = _common["default"].hashPassword(user.password);
                _context3.next = 12;
                return User.createUser(newStaff);

              case 12:
                createdStaff = _context3.sent;
                id = createdStaff.id, type = createdStaff.type, isadmin = createdStaff.isadmin, firstname = createdStaff.firstname, lastname = createdStaff.lastname, email = createdStaff.email;
                mailData = {
                  subject: 'An account has created for you on Banka💸💵🏦',
                  text: 'Kindly use the credentials in this mail to login to your account',
                  to: email,
                  html: "<b>Email Adress: ".concat(email, "<br/><br/>\n          Password: ").concat(plainPassword, "<br/><br/>\n          Visit <a href='https://banka-timi.herokuapp.com/'>Banka App</a> today</b>")
                };
                _context3.next = 17;
                return (0, _mailer["default"])(mailData);

              case 17:
                return _context3.abrupt("return", {
                  id: id,
                  firstName: firstname,
                  lastName: lastname,
                  email: email,
                  isAdmin: isadmin,
                  type: type
                });

              case 20:
                _context3.prev = 20;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 20]]);
      }));

      function createAStaff(_x3) {
        return _createAStaff.apply(this, arguments);
      }

      return createAStaff;
    }()
  }]);
  return UserService;
}();

var _default = UserService;
exports["default"] = _default;