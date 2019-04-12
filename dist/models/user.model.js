"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dummyData = _interopRequireDefault(require("./dummyData"));

var _common = _interopRequireDefault(require("../utils/common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "createUser",
    value: function createUser(user) {
      var newId = _common["default"].getNextId(_dummyData["default"].users);

      var newUser = user;
      newUser.id = newId;

      _dummyData["default"].users.push(newUser);

      return newUser;
    }
  }, {
    key: "findUserByEmail",
    value: function findUserByEmail(email) {
      var foundUser = _dummyData["default"].users.find(function (user) {
        return user.email === email;
      });

      return foundUser;
    }
  }, {
    key: "findUserById",
    value: function findUserById(id) {
      var foundUser = _dummyData["default"].users.find(function (user) {
        return user.id === id;
      });

      return foundUser;
    }
  }]);

  return User;
}();

exports["default"] = User;