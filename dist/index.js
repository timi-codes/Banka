"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = require("body-parser");

var _debug = _interopRequireDefault(require("debug"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("./swagger.json"));

var _user = _interopRequireDefault(require("./routes/user.route"));

var _account = _interopRequireDefault(require("./routes/account.route"));

var _transaction = _interopRequireDefault(require("./routes/transaction.route"));

_dotenv["default"].config();

var app = (0, _express["default"])();
var port = process.env.PORT || 7888;
var API_VERSION = '/api/v1';
app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
app.use((0, _bodyParser.json)());
app.use((0, _cors["default"])());
app.use("".concat(API_VERSION, "/auth"), _user["default"]);
app.use("".concat(API_VERSION), _account["default"]);
app.use("".concat(API_VERSION), _transaction["default"]);
app.get('/', function (req, res) {
  res.send('App server is running');
});
app.use(function (err, req, res, next) {
  if (!err) return next();
  return res.status(500).send('Something broke!');
});

if (!module.parent) {
  app.listen(port, function () {
    (0, _debug["default"])('development')("Server is running on port ".concat(port));
  });
}

module.exports = app;