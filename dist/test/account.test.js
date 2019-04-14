"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _should = _interopRequireDefault(require("should"));

require("chai/register-should");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

describe('Test account related endpoints - POST, GET, PATH, DELETE', function () {
  var clientToken;
  var adminToken;
  var sholaAccountNumber;
  /**
     * Sign in user to generate user token before test
     */

  before('Sign in user to obtain auth token to be used in other account operations', function (done) {
    var userCredential = {
      email: 'sholaadeola@gmail.com',
      password: 'password'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(userCredential).end(function (err, res) {
      res.should.have.status(200);

      if (!err) {
        clientToken = res.body.data.token;
      }

      done();
    });
  });
  /**
     * Test the POST /accounts/ endpoint
     */

  describe('POST /accounts', function () {
    it('it should check for token in the request header', function (done) {
      var details = {
        type: 'savings',
        balance: 0.00
      };

      _chai["default"].request(_index["default"]).post('/api/v1/accounts').send(details).end(function (err, res) {
        (0, _should["default"])(res.headers['x-access-token']).be.type('undefined');
        done();
      });
    });
    it('it should check if token is invalid', function (done) {
      var details = {
        type: 'savings',
        balance: 0.00
      };

      _chai["default"].request(_index["default"]).post('/api/v1/accounts').set('x-access-token', 10000).send(details).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('invalid request token');
        done();
      });
    });
    it('it should create a bank account', function (done) {
      var details = {
        type: 'savings',
        balance: 0.00
      };

      _chai["default"].request(_index["default"]).post('/api/v1/accounts').set('x-access-token', clientToken).send(details).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('accountNumber');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('balance');

        if (!err) {
          sholaAccountNumber = Number(res.body.data.accountNumber);
        }

        done();
      });
    });
    it('it should throw error when account type is not specified', function (done) {
      var details = {
        balance: 0.00
      };

      _chai["default"].request(_index["default"]).post('/api/v1/accounts').send(details).set('x-access-token', clientToken).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('type is required');
        done();
      });
    });
    it('it should throw error when account type is different from savings and account', function (done) {
      var details = {
        type: 'somethingdifferent'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/accounts').set('x-access-token', clientToken).send(details).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('type must be one of [savings, current]');
        done();
      });
    });
  });
  /**
     * Test the GET /accounts/ routes
     */

  describe('GET /accounts', function () {
    it('it should throw permission error if user is not an admin', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/accounts').set('x-access-token', clientToken).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.have.property('error').eql('only a staff has the permission to get all bank accounts');
        done();
      });
    });
    before('Sign in as an admin/staff because only admin/staff can get list of bank accounts', function (done) {
      var userCredential = {
        email: 'tejumoladavid@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(userCredential).end(function (err, res) {
        res.should.have.status(200);

        if (!err) {
          adminToken = res.body.data.token;
        }

        done();
      });
    });
    it('it should get all the bank accounts', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/accounts').set('x-access-token', adminToken).end(function (err, res) {
        res.should.have.status(200);
        res.body.data.should.have.property('accounts').be.a('array');
        done();
      });
    });
  });
  /**
     * Test the GET /accounts/:accountNumber route
     */

  describe('GET /accounts/:accountNumber', function () {
    it('it should throw an error if a client wants to get other user\'s account', function (done) {
      var accountNumber = 222010772;

      _chai["default"].request(_index["default"]).get("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', clientToken).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('only a staff has the permission to get other user\'s account');
        done();
      });
    });
    it('it should GET a bank account details as a client if i own the account', function (done) {
      var accountNumber = sholaAccountNumber;

      _chai["default"].request(_index["default"]).get("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', clientToken).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('accountNumber').eql(accountNumber);
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('balance');
        done();
      });
    });
    it('it should GET a bank account details as a staff', function (done) {
      var accountNumber = 222010772;

      _chai["default"].request(_index["default"]).get("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', adminToken).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('accountNumber').eql(accountNumber);
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('balance');
        done();
      });
    });
    it('it should throw an error when account number is not found', function (done) {
      var accountNumber = 2220107724455; // octal number format

      _chai["default"].request(_index["default"]).get("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', adminToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('account number doesn\'t exist');
        done();
      });
    });
  });
  /**
     * Test the PATCH /accounts/:accountNumber route
     */

  describe('PATCH /accounts/:accountNumber', function () {
    it('it should throw permission error if user is not an admin', function (done) {
      var accountNumber = 222010872;
      var body = {
        status: 'active'
      };

      _chai["default"].request(_index["default"]).patch("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', clientToken).send(body).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('only a staff has the permission to change account status');
        done();
      });
    });
    it('it should activate a user bank account', function (done) {
      var accountNumber = 222010872;
      var body = {
        status: 'active'
      };

      _chai["default"].request(_index["default"]).patch("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', adminToken).send(body).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('accountNumber').eql(accountNumber);
        res.body.data.should.have.property('status').eql(body.status);
        done();
      });
    });
    it('it should set a bank account as dormant', function (done) {
      var accountNumber = 222010872;
      var body = {
        status: 'dormant'
      };

      _chai["default"].request(_index["default"]).patch("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', adminToken).send(body).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('accountNumber').eql(accountNumber);
        res.body.data.should.have.property('status').eql(body.status);
        done();
      });
    });
    it('it should throw an error when account number is not found', function (done) {
      var accountNumber = 2220108723333;
      var body = {
        status: 'dormant'
      };

      _chai["default"].request(_index["default"]).patch("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', adminToken).send(body).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('account number doesn\'t exist');
        done();
      });
    });
    it('it should throw error when request body status is different from dormant or active', function (done) {
      var accountNumber = 222010872;
      var body = {
        status: 'validate'
      };

      _chai["default"].request(_index["default"]).patch("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', adminToken).send(body).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('status must be one of [dormant, active]');
        done();
      });
    });
  });
  /**
     * Test  DELETE /accounts/:accountNumber route
     */

  describe('DELETE /accounts/:accountNumber', function () {
    it('it should throw permission error if user is not an admin', function (done) {
      var accountNumber = 222010872;

      _chai["default"].request(_index["default"])["delete"]("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', clientToken).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.have.property('error').eql('only a staff has the permission to delete an account');
        done();
      });
    });
    it('it should DELETE a bank record ', function (done) {
      var accountNumber = 222010872;

      _chai["default"].request(_index["default"])["delete"]("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', adminToken).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Account successfully deleted');
        done();
      });
    });
    it('it should throw an error when account number is not found', function (done) {
      var accountNumber = 222010872;

      _chai["default"].request(_index["default"])["delete"]("/api/v1/accounts/".concat(accountNumber)).set('x-access-token', adminToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('account number doesn\'t exist');
        done();
      });
    });
  });
});