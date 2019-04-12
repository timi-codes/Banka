"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _debug = _interopRequireDefault(require("debug"));

var _user = _interopRequireDefault(require("./routes/user.route"));

var _account = _interopRequireDefault(require("./routes/account.route"));

var _transaction = _interopRequireDefault(require("./routes/transaction.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
var port = process.env.PORT || 7888;
var API_VERSION = '/api/v1';
app.use((0, _bodyParser.json)());
app.use("".concat(API_VERSION, "/auth"), _user["default"]);
app.use("".concat(API_VERSION), _account["default"]);
app.use("".concat(API_VERSION), _transaction["default"]);
app.get('/', function (req, res) {
  res.send('This app server is running on it own 😀😎😋');
});

if (!module.parent) {
  app.listen(port, function () {
    (0, _debug["default"])('development')("Server is running on port ".concat(port));
  });
}

module.exports = app;