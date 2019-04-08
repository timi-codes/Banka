import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Test account related endpoints - POST, GET, PATH, DELETE', () => {
  let generatedToken = '1000';

  /**
     * Sign in user to generate user token before test
     */
  before('Sign in user to obtain auth token to be used in other account operations', (done) => {
    const userCredential = {
      email: 'timitejumola@gmail.com',
      password: 'password',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(userCredential)
      .end((err, res) => {
        res.should.have.status(200);
        if (!err) {
          generatedToken = res.body.data.token;
        }
        done();
      });
  });

  /**
     * Test the POST /accounts/ endpoint
     */
  describe('POST /accounts', () => {
    it('it should create a bank account', (done) => {
      const details = {
        type: 'savings',
        openingBalance: '0',
      };

      chai
        .request(app)
        .post('/api/v1/accounts')
        .send(details)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.should.have.property('accountNumber');
          res.body.data.should.have.property('firstName');
          res.body.data.should.have.property('lastName');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('type');
          res.body.data.should.have.property('openingBalance');
          done();
        });
    });

    it('it should throw error when there is a missing field in the request body', (done) => {
      const details = {
        type: 'savings',
      };

      chai
        .request(app)
        .post('/api/v1/accounts')
        .send(details)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.data.should.have.property('error');
          done();
        });
    });
  });

  /**
     * Test the GET /accounts/ routes
     */
  describe('GET /accounts', () => {
    it('it should get all the bank accounts', (done) => {
      chai
        .request(app)
        .get('/api/v1/accounts')
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          done();
        });
    });
  });

  /**
     * Test the GET /accounts/:accountNumber route
     */
  describe('GET /accounts/:accountNumber', () => {
    it('it should GET a bank account by the given account number', (done) => {
      const accountNumber = 0o222010772; // octal number format
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('accountNumber').eql(accountNumber);
          res.body.data.should.have.property('firstName');
          res.body.data.should.have.property('lastName');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('type');
          res.body.data.should.have.property('openingBalance');
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 0o002020; // octal number format
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Account number cannot be found');
          done();
        });
    });

    it('it should throw an error when account number is invalid', (done) => {
      const accountNumber = '0o002020fc'; // octal number format
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('Invalid account number. Account number must be a number');
          done();
        });
    });
  });

  /**
     * Test the PATCH /accounts/:accountNumber route
     */
  describe('PATCH /accounts/:accountNumber', () => {
    it('it should activate a user bank account', (done) => {
      const accountNumber = 0o222010772; // octal number format
      const body = { status: 'active' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', generatedToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('accountNumber').eql(accountNumber);
          res.body.data.should.have.property('status').eql(body.status);
          done();
        });
    });

    it('it should set a bank account as dormant', (done) => {
      const accountNumber = 0o222010772; // octal number format
      const body = { status: 'dormant' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', generatedToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('accountNumber').eql(accountNumber);
          res.body.data.should.have.property('status').eql(body.status);
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 0o222010772; // octal number format
      const body = { status: 'dormant' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', generatedToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Account number cannot be found');
          done();
        });
    });

    it('it should throw an error when account number is invalid', (done) => {
      const accountNumber = 0o222010772; // octal number format
      const body = { status: 'dormant' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', generatedToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('Invalid account number. Account number must be a number');
          done();
        });
    });

    it('it should throw an error when "status" in request body is invalid ', (done) => {
      const accountNumber = 0o222010772; // octal number format
      const body = { status: '' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', generatedToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('Require request body "status" to be active or dormant');
          done();
        });
    });
  });

  /**
     * Test  DELETE /accounts/:accountNumber route
     */
  describe('DELETE /accounts/:accountNumber', () => {
    it('it should DELETE a bank record ', (done) => {
      const accountNumber = 0o222300; // octal number format
      chai
        .request(app)
        .delete(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('Invalid account number. Account number must be a number');
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 0o222300; // octal number format
      chai
        .request(app)
        .delete(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Account number cannot be found');
          done();
        });
    });

    it('it should throw an error when account number is invalid', (done) => {
      const accountNumber = '0o222300ghdh'; // octal number format
      chai
        .request(app)
        .delete(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', generatedToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('Invalid account number. Account number must be a number');
          done();
        });
    });
  });
});
