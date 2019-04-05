import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Test user login and signup', () => {
  /**
   * Test the POST /auth/signup endpoint
   */
  describe('POST /auth/signup', () => {
    const newUser = {
      email: 'tejumoladavid@gmail.com',
      firstName: 'timi',
      lastName: 'tejumola',
      password: 'password',
      type: 'client',
      isAdmin: 'false',
    };

    it('it should create a new user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Account was successfully created!');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('firstName');
          res.body.data.should.have.property('lastName');
          res.body.data.should.have.property('email');
          done();
        });
    });

    it('it should not POST a new user if the email address is already taken', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have
            .property('message')
            .eql('User with this email address already exist!');
          done();
        });
    });

    it('it should not POST a new user with missing payload fields', (done) => {
      const invalidPayload = {
        email: 'tejumoladavid@gmail.com',
        firstName: 'timi',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(invalidPayload)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.data.should.have.property('error');
          done();
        });
    });
  });

  /**
   * Test the POST /auth/signin endpoint
   */
  describe('POST /auth/signin', () => {
    it('it should log the user in to the app', (done) => {
      const loginCredential = {
        email: 'tejumoladavid@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(loginCredential)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('firstName');
          res.body.data.should.have.property('lastName');
          res.body.data.should.have.property('email');
          done();
        });
    });

    it('it should not log a user in with missing payload fields', (done) => {
      const loginCredential = {
        email: 'tejumoladavid@gmail.com',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(loginCredential)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.data.should.have.property('error');
          done();
        });
    });

    it('it should throw an error if user supply a wrong email or password combination ', (done) => {
      const loginCredential = {
        email: 'tejumoladavid@gmail.com',
        password: 'pass',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(loginCredential)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.data.should.have.property('error');
          done();
        });
    });
  });
});
