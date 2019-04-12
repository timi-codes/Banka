"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = _interopRequireDefault(require("../utils/common"));

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** Class that allows user create and login  */
var UserService =
/*#__PURE__*/
function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }

  _createClass(UserService, null, [{
    key: "createUser",

    /**
     * @description Create a new user
     * @param {object} a new user object
     */
    value: function createUser(user) {
      var isUser = _user["default"].findUserByEmail(user.email);

      if (isUser) {
        throw new Error('a user with this email address already exist');
      }

      var newUser = user;
      newUser.password = _common["default"].hashPassword(user.password);

      var createdUser = _user["default"].createUser(newUser);

      var id = createdUser.id,
          type = createdUser.type,
          isAdmin = createdUser.isAdmin,
          firstName = createdUser.firstName,
          lastName = createdUser.lastName,
          email = createdUser.email;
      var payload = {
        id: id,
        type: type,
        isAdmin: isAdmin
      };

      var token = _common["default"].jwtSigner(payload);

      return {
        token: token,
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        isAdmin: user.isAdmin,
        type: type
      };
    }
    /**
     * @description signs user into their account
     * @param {object} a new user object
     */

  }, {
    key: "signUser",
    value: function signUser(login) {
      var user = _user["default"].findUserByEmail(login.email);

      if (user) {
        var bycrptResponse = _common["default"].validatePassword(login.password, user.password);

        if (bycrptResponse) {
          var id = user.id,
              userPassword = user.password,
              data = _objectWithoutProperties(user, ["id", "password"]);

          var userProfile = _objectSpread({
            id: id
          }, data);

          var token = _common["default"].jwtSigner(userProfile);

          return _objectSpread({
            token: token
          }, userProfile);
        }
      }

      throw new Error('invalid user credentials');
    }
  }]);

  return UserService;
}();

var _default = UserService;
exports["default"] = _default;