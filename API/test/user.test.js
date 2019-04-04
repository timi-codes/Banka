import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Test user login and signup', () => {
  const newUser = {
    email: 'tejumoladavid@gmail.com',
    firstName: 'timi',
    lastName: 'tejumola',
    password: 'password',
    type: 'client',
    isAdmin: 'false',
  };

  /**
   * Test the POST /auth/signup endpoint
   */
  describe('POST /auth/signup', () => {
    it('it should create a new user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup/')
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
        .post('/api/v1/auth/signup/')
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
        .post('/api/v1/auth/signup/')
        .send(invalidPayload)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.data.should.have.property('error');
          done();
        });
    });
  });
});
