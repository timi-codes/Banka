"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _debug = _interopRequireDefault(require("debug"));

var _config = _interopRequireDefault(require("./config"));

var env = process.env.NODE_ENV || 'development';
var config = _config["default"][env];
(0, _debug["default"])('pg/connection')(config);
var pool = null;

if (env === 'production') {
  pool = new _pg.Pool({
    connectionString: process.env[config.use_env_variable]
  });
} else {
  pool = new _pg.Pool({
    user: config.uername,
    host: config.host,
    password: config.password,
    database: config.database,
    port: config.port
  });
}

pool.on('error', function (error) {
  (0, _debug["default"])('pg/connection')(error);
});
var _default = pool;
exports["default"] = _default;