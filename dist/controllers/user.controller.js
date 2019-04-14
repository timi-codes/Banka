"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../services/user.service"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var response = new _ResponseGenerator["default"]();
/**
 * user controller performs user signup and sign in logic
 */

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "createUser",

    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof UserController
     */
    value: function createUser(req, res) {
      var user = req.body;

      try {
        var createdUser = _user["default"].createUser(user);

        if (createdUser) {
          response.setSuccess(201, createdUser);
        }

        return response.send(res);
      } catch (error) {
        response.setError(400, error.message);
        return response.send(res);
      }
    }
    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof UserController
     */

  }, {
    key: "loginUser",
    value: function loginUser(req, res) {
      var login = req.body;

      try {
        var user = _user["default"].signUser(login);

        if (user) {
          response.setSuccess(200, user);
        }

        return response.send(res);
      } catch (error) {
        response.setError(401, error.message);
        return response.send(res);
      }
    }
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;