"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Utils = {
  /**
   * @description - generates a new id
   * @param {object} data
   * @returns {int} id
   */
  getNextId: function getNextId(data) {
    var lastId = data[data.length - 1].id;
    return lastId + 1;
  },

  /**
   * @description - generates a new id
   * @param {object} data
   * @returns {int} id
   */
  getNextTransactionId: function getNextTransactionId(data) {
    var lastId = data[data.length - 1].transactionId;
    return lastId + 1;
  },

  /**
   * @description - generates a new account number
   * @param {object} data
   * @returns {int} id
   */
  generateAccountNumber: function generateAccountNumber(data) {
    var lastAcc = data[data.length - 1].accountNumber;
    return lastAcc + 100;
  },

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
      cleanObj = newVal ? _objectSpread({}, cleanObj, _defineProperty({}, val, newVal)) : cleanObj;
    });
    return cleanObj;
  }
};
var _default = Utils;
exports["default"] = _default;