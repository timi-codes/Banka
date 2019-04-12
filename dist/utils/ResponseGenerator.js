"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = _interopRequireDefault(require("./common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * a class for api response
 */
var ResponseGenerator =
/*#__PURE__*/
function () {
  function ResponseGenerator() {
    _classCallCheck(this, ResponseGenerator);

    this.status = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }
  /**
   * @description set Api response for 200 & 201
   *  @param{int} statusCode
   * @param {object} data
   */


  _createClass(ResponseGenerator, [{
    key: "setSuccess",
    value: function setSuccess(statusCode, data, message) {
      this.status = statusCode;
      this.data = data;
      this.message = message;
      this.type = 'success';
    }
    /**
     * @description set Api response for 400, 401, 403, 404, 503
     *  @param{int} statusCode
     * @param {object} data
     */

  }, {
    key: "setError",
    value: function setError(statusCode, message) {
      this.status = statusCode;
      this.message = message;
      this.type = 'error';
    }
    /**
       * Sends response
       * @param {object} res
       * @returns {object} responseObject
       */

  }, {
    key: "send",
    value: function send(res) {
      var filteredResponse = _common["default"].stripNull({
        status: this.status,
        message: this.message,
        data: this.data
      });

      if (this.type === 'success') {
        return res.status(this.status).json(filteredResponse);
      } // Here this.type === 'error'


      return res.status(this.status).json({
        status: this.status,
        error: this.message
      });
    }
  }]);

  return ResponseGenerator;
}();

var _default = ResponseGenerator;
exports["default"] = _default;