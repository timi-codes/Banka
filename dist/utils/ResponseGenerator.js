"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _common = _interopRequireDefault(require("./common"));

/**
 * A class for generating API responses
 */
var ResponseGenerator =
/*#__PURE__*/
function () {
  function ResponseGenerator() {
    (0, _classCallCheck2["default"])(this, ResponseGenerator);
    this.status = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }
  /**
   * @description API response for 200 & 201
   * @param{int} statusCode
   * @param {object} data
   * @param{string} message
   */


  (0, _createClass2["default"])(ResponseGenerator, [{
    key: "sendSuccess",
    value: function sendSuccess(res, statusCode, data, message) {
      this.status = statusCode;
      this.data = data;
      this.message = message;
      this.type = 'success';
      return this.send(res);
    }
    /**
     * @description API response for 400, 401, 403, 404, 503
     * @param{int} statusCode
     * @param{string} message
     * @param {object} data
     */

  }, {
    key: "sendError",
    value: function sendError(res, statusCode, message) {
      this.status = statusCode;
      this.message = message;
      this.type = 'error';
      return this.send(res);
    }
    /**
     * Sends response
     * @param {object} res
     * @returns {object} response
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