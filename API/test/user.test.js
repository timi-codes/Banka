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
    it('it should create a new user', (done) => {
      const newUser = {
        email: 'tejumoladavidlo@gmail.com',
        firstName: 'timi',
        lastName: 'tejumola',
        password: 'password',
        confirmPassword: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('firstName');
          res.body.data.should.have.property('lastName');
          res.body.data.should.have.property('type').eql('client');
          done();
        });
    });

    it('it should throw an error if the email address is already taken', (done) => {
      const newUser = {
        email: 'tejumoladavidlo@gmail.com',
        firstName: 'timi',
        lastName: 'tejumola',
        password: 'password',
        confirmPassword: 'password',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('a user with this email address already exist');
          done();
        });
    });

    it('it should throw an error if firstName is missing in the request body', (done) => {
      const invalidPayload = {
        lastName: 'timi',
        email: 'tejumoladavid@gmail.com',
        password: 'password',
        confirmPassword: 'password',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(invalidPayload)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('firstName is required');
          done();
        });
    });

    it('it should throw an error if lastName is missing in the request body', (done) => {
      const invalidPayload = {
        firstName: 'timi',
        email: 'tejumoladavid@gmail.com',
        password: 'password',
        confirmPassword: 'password',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(invalidPayload)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('lastName is required');
          done();
        });
    });

    it('it should throw an error if email is missing in the request body', (done) => {
      const invalidPayload = {
        firstName: 'timi',
        lastName: 'timi',
        password: 'password',
        confirmPassword: 'password',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(invalidPayload)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('email is required');
          done();
        });
    });

    it('it should throw an error if password is less than 7 characters', (done) => {
      const invalidPayload = {
        firstName: 'timi',
        lastName: 'timi',
        email: 'tejumoladavid@gmail.com',
        password: 'passw',
        confirmPassword: 'passw',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(invalidPayload)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('password length must be at least 7 characters long');
          done();
        });
    });


    it('it should throw an error if password does not match confirm password', (done) => {
      const invalidPayload = {
        firstName: 'timi',
        lastName: 'timi',
        email: 'tejumoladavid@gmail.com',
        password: 'password',
        confirmPassword: 'passw',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(invalidPayload)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('your password and confirm password do not match');
          done();
        });
    });
  });

  /**
   * Test the POST /auth/signin endpoint
   */
  describe('POST /auth/signin', () => {
    it('it should sign in a user', (done) => {
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

    it('it should throw an error if email is missing in the rquest body', (done) => {
      const loginCredential = {
        password: 'password',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(loginCredential)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('email is required');
          done();
        });
    });


    it('it should throw an error if password is missing in the rquest body', (done) => {
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
          res.body.should.have.property('error').eql('password is required');
          done();
        });
    });


    it('it should throw an error if user supply a wrong email or password combination ', (done) => {
      const loginCredential = {
        email: 'tejumoladavid@gmail.com',
        password: 'passwordd',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(loginCredential)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('invalid user credentials');
          done();
        });
    });
  });
});
