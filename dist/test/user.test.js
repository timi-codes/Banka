"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

require("chai/register-should");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

_chai["default"].use(_chaiHttp["default"]);

describe('Test user login and signup', function () {
  /**
   * Test the POST /auth/signup endpoint
   */
  describe('POST /auth/signup', function () {
    it('it should create a new user', function (done) {
      var newUser = {
        email: 'tejumoladavidlo@gmail.com',
        firstName: 'timi',
        lastName: 'tejumola',
        password: 'password',
        confirmPassword: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(newUser).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('type').eql('client');
        done();
      });
    });
    it('it should throw an error if the email address is already taken', function (done) {
      var newUser = {
        email: 'tejumoladavidlo@gmail.com',
        firstName: 'timi',
        lastName: 'tejumola',
        password: 'password',
        confirmPassword: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(newUser).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('a user with this email address already exist');
        done();
      });
    });
    it('it should throw an error if firstName is missing in the request body', function (done) {
      var invalidPayload = {
        lastName: 'timi',
        email: 'tejumoladavid@gmail.com',
        password: 'password',
        confirmPassword: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(invalidPayload).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('firstName is required');
        done();
      });
    });
    it('it should throw an error if lastName is missing in the request body', function (done) {
      var invalidPayload = {
        firstName: 'timi',
        email: 'tejumoladavid@gmail.com',
        password: 'password',
        confirmPassword: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(invalidPayload).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('lastName is required');
        done();
      });
    });
    it('it should throw an error if email is missing in the request body', function (done) {
      var invalidPayload = {
        firstName: 'timi',
        lastName: 'timi',
        password: 'password',
        confirmPassword: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(invalidPayload).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('email is required');
        done();
      });
    });
    it('it should throw an error if password is less than 7 characters', function (done) {
      var invalidPayload = {
        firstName: 'timi',
        lastName: 'timi',
        email: 'tejumoladavid@gmail.com',
        password: 'passw',
        confirmPassword: 'passw'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(invalidPayload).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('password length must be at least 7 characters long');
        done();
      });
    });
    it('it should throw an error if password does not match confirm password', function (done) {
      var invalidPayload = {
        firstName: 'timi',
        lastName: 'timi',
        email: 'tejumoladavid@gmail.com',
        password: 'password',
        confirmPassword: 'passw'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(invalidPayload).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('your password and confirm password do not match');
        done();
      });
    });
  });
  /**
   * Test the POST /auth/signin endpoint
   */

  describe('POST /auth/signin', function () {
    it('it should sign in a user', function (done) {
      var loginCredential = {
        email: 'tejumoladavid@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(loginCredential).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('email');
        done();
      });
    });
    it('it should throw an error if email is missing in the rquest body', function (done) {
      var loginCredential = {
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(loginCredential).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('email is required');
        done();
      });
    });
    it('it should throw an error if password is missing in the rquest body', function (done) {
      var loginCredential = {
        email: 'tejumoladavid@gmail.com'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(loginCredential).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('password is required');
        done();
      });
    });
    it('it should throw an error if user supply a wrong email or password combination ', function (done) {
      var loginCredential = {
        email: 'tejumoladavid@gmail.com',
        password: 'passwordd'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(loginCredential).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('invalid user credentials');
        done();
      });
    });
  });
});