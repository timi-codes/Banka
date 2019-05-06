"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

require("chai/register-should");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

_chai["default"].use(_chaiHttp["default"]);

describe('Test transaction related endpoints - Debit and Credit an account', function () {
  var cashierToken = null;
  var userToken = null;
  /**
     * Sign in as a cashier to generate user token before test
  */

  before('Sign in cashier to obtain auth token to be used in other account operations', function (done) {
    var userCredential = {
      email: 'johnoke@gmail.com',
      password: 'password'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(userCredential).end(function (err, res) {
      res.should.have.status(200);

      if (!err) {
        cashierToken = res.body.data.token;
      }

      done();
    });
  });
  /**
     * Test the POST /transactions/:accountNumber/debit route
     */

  describe('POST /transactions/:accountNumber/debit', function () {
    before('Sign in as a user', function (done) {
      var userCredential = {
        email: 'sholaadeola@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(userCredential).end(function (err, res) {
        res.should.have.status(200);

        if (!err) {
          userToken = res.body.data.token;
        }

        done();
      });
    });
    it('it should throw permission error if user is not a cashier', function (done) {
      var accountNumber = 222010872;
      var body = {
        amount: 50000
      };

      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('x-access-token', userToken).send(body).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('only a cashier can perform this operation');
        done();
      });
    });
    it('it should throw an insufficient balance error', function (done) {
      var accountNumber = 2220107727;
      var body = {
        amount: 5000000
      };

      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('x-access-token', cashierToken).send(body).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('account balance is not sufficient');
        done();
      });
    });
    it('it should throw an error when account number is not found', function (done) {
      var accountNumber = 22201084472;
      var body = {
        amount: 50000
      };

      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('x-access-token', cashierToken).send(body).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('account number doesn\'t exist');
        done();
      });
    });
    it('it should throw an error when "amount" in request body is not provided ', function (done) {
      var accountNumber = 222010872;
      var body = {};

      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('x-access-token', cashierToken).send(body).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('amount is required');
        done();
      });
    });
    it('it should throw an error when "amount" is not a number', function (done) {
      var accountNumber = 222010872;
      var body = {
        amount: '50000hrh'
      };

      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('x-access-token', cashierToken).send(body).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('amount must be a number');
        done();
      });
    });
    it('it should debit a bank account', function (done) {
      var accountNumber = 2220107727;
      var body = {
        amount: 500
      };

      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accountNumber, "/debit")).set('x-access-token', cashierToken).send(body).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('accountNumber').eql(accountNumber);
        res.body.data.should.have.property('transactionId');
        res.body.data.should.have.property('amount');
        res.body.data.should.have.property('cashier');
        res.body.data.should.have.property('transactionType');
        res.body.data.should.have.property('accountBalance');
        done();
      });
    });
  });
  /**
     * Test the POST /transactions/:accountNumber/credit route
     */

  describe('POST /transactions/:accountNumber/credit', function () {
    it('it should throw permission error if user is not a cashier', function (done) {
      var accountNumber = 222010872;
      var body = {
        amount: 50000
      };

      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accountNumber, "/credit")).set('x-access-token', userToken).send(body).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('only a cashier can perform this operation');
        done();
      });
    });
    it('it should throw an error when account number is not found', function (done) {
      var accountNumber = 22201084472;
      var body = {
        amount: 50000
      };

      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accountNumber, "/credit")).set('x-access-token', cashierToken).send(body).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('account number doesn\'t exist');
        done();
      });
    });
    it('it should throw an error when "amount" in request body is not provided ', function (done) {
      var accountNumber = 2220107727;
      var body = {};

      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accountNumber, "/credit")).set('x-access-token', cashierToken).send(body).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('amount is required');
        done();
      });
    });
    it('it should throw an error when "amount" is not a number', function (done) {
      var accountNumber = 222010872;
      var body = {
        amount: '50000hrh'
      };

      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accountNumber, "/credit")).set('x-access-token', cashierToken).send(body).end(function (err, res) {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('amount must be a number');
        done();
      });
    });
    it('it should credit a bank account', function (done) {
      var accountNumber = 2220107727;
      var body = {
        amount: 50000
      };

      _chai["default"].request(_index["default"]).post("/api/v1/transactions/".concat(accountNumber, "/credit")).set('x-access-token', cashierToken).send(body).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('accountNumber').eql(accountNumber);
        res.body.data.should.have.property('transactionId');
        res.body.data.should.have.property('amount');
        res.body.data.should.have.property('cashier');
        res.body.data.should.have.property('transactionType');
        res.body.data.should.have.property('accountBalance');
        done();
      });
    });
  });
  /**
     * Test the GET accounts/:accountNumber/transactions route
     */

  describe('GET accounts/:accountNumber/transactions', function () {
    it('it should throw permission error if a user wants to get all transactions', function (done) {
      var accountNumber = 2220107727;

      _chai["default"].request(_index["default"]).get("/api/v1/accounts/".concat(accountNumber, "/transactions")).set('x-access-token', userToken).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('only a staff has the permission to view other accounts and transactions');
        done();
      });
    });
    it('it should throw an error when account number is not found', function (done) {
      var accountNumber = 2220107727890;

      _chai["default"].request(_index["default"]).get("/api/v1/accounts/".concat(accountNumber, "/transactions")).set('x-access-token', userToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('account number doesn\'t exist');
        done();
      });
    });
    it('it should get an account transactions', function (done) {
      var accountNumber = 2220220303;

      _chai["default"].request(_index["default"]).get("/api/v1/accounts/".concat(accountNumber, "/transactions")).set('x-access-token', userToken).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
    });
  });
  /**
     * Test the GET /transactions/:transactionId route
     */

  describe('GET /transactions/:transactionId', function () {
    it('it should throw an error when transaction id is not found', function (done) {
      var transactionId = 0;

      _chai["default"].request(_index["default"]).get("/api/v1/transactions/".concat(transactionId)).set('x-access-token', cashierToken).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('transaction id doesn\'t exist');
        done();
      });
    });
    it('it should get a specific transaction', function (done) {
      var transactionId = 1;

      _chai["default"].request(_index["default"]).get("/api/v1/transactions/".concat(transactionId)).set('x-access-token', cashierToken).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('transactionId');
        res.body.data.should.have.property('createdOn');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('accountNumber');
        res.body.data.should.have.property('amount');
        res.body.data.should.have.property('oldBalance');
        res.body.data.should.have.property('newBalance');
        done();
      });
    });
    it('it should throw permission error if user wants to see other users transactions', function (done) {
      var transactionId = 1;

      _chai["default"].request(_index["default"]).get("/api/v1/transactions/".concat(transactionId)).set('x-access-token', userToken).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('only a staff has the permission to view other accounts and transactions');
        done();
      });
    });
  });
});