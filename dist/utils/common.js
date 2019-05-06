"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var Utils = {
  /**
   * @description - validate password by comparing password with hash password
   * @param {string} password
   * @param {string} hashpassword
   * @returns {boolean} boolean to show if password match or not
   */
  validatePassword: function validatePassword(password, userPassword) {
    return _bcrypt["default"].compareSync(password, userPassword);
  },

  /**
   * @description - encypt password
   * @param {object} password
   * @returns {object} hashpassword
   */
  hashPassword: function hashPassword(password) {
    var salt = _bcrypt["default"].genSaltSync(15);

    var pwd = _bcrypt["default"].hashSync(password, salt);

    return pwd;
  },

  /**
   * @description - signs token
   * @param {object} payload
   */
  jwtSigner: function jwtSigner(payload) {
    return _jsonwebtoken["default"].sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
  },

  /**
   * @description - remove null key from ab object
   * @param {object}
   * @returns {object}
   */
  stripNull: function stripNull(obj) {
    var cleanObj = {};
    Object.keys(obj).forEach(function (val) {
      var newVal = obj[val];
      cleanObj = newVal ? (0, _objectSpread3["default"])({}, cleanObj, (0, _defineProperty2["default"])({}, val, newVal)) : cleanObj;
    });
    return cleanObj;
  }
};
var _default = Utils;
exports["default"] = _default;