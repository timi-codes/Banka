"use strict";

var config = require('dotenv');

config.config();
module.exports = {
  development: {
    username: 'codepreneur',
    password: 'password',
    database: 'banka',
    host: '127.0.0.1',
    port: 5432
  },
  test: {
    username: 'codepreneur',
    password: 'password',
    database: 'banka',
    host: '127.0.0.1',
    port: 5432
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};