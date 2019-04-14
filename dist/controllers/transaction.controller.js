"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transaction = _interopRequireDefault(require("../services/transaction.service"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var response = new _ResponseGenerator["default"]();
/**
 * user controller performs user signup and sign in logic
 */

var TransactionController =
/*#__PURE__*/
function () {
  function TransactionController() {
    _classCallCheck(this, TransactionController);
  }

  _createClass(TransactionController, null, [{
    key: "debitUserAccount",

    /**
     * @param{object}  request express request object
     * @param{object}  response express request object
     * @returns {json} json
     * @memberof TransactionController
     */
    value: function debitUserAccount(req, res) {
      var amount = req.body.amount;
      var id = req.token.id;
      var accountNumber = req.params.accountNumber;

      try {
        var transaction = _transaction["default"].debitAccount(id, accountNumber, amount);

        if (transaction) {
          response.setSuccess(200, transaction);
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
     * @memberof TransactionController
     */

  }, {
    key: "creditUserAccount",
    value: function creditUserAccount(req, res) {
      var amount = req.body.amount;
      var id = req.token.id;
      var accountNumber = req.params.accountNumber;

      try {
        var transaction = _transaction["default"].creditAccount(id, accountNumber, amount);

        if (transaction) {
          response.setSuccess(200, transaction);
        }

        return response.send(res);
      } catch (error) {
        response.setError(400, error.message);
        return response.send(res);
      }
    }
  }]);

  return TransactionController;
}();

var _default = TransactionController;
exports["default"] = _default;