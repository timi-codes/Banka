import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Test account related endpoints - POST, GET, PATH, DELETE', () => {
  let generatedToken = null;

  /**
   * Sign in user to generate user token before test
   */
  before('Sign in user to obtain auth token to be used in other account operations', (done) => {
    const userCredential = {
      email: 'bolutejumola@gmail.com',
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
   * Test the POST /transactions/:accountNumber/debit route
   */
  describe('POST /transactions/:accountNumber/debit', () => {
    it('it should debit a bank account', (done) => {
      const accountNumber = 0o222010772; // octal number format
      const body = { amount: '50000' };
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('x-access-token', generatedToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('accountNumber').eql(accountNumber);
          res.body.data.should.have.property('transactionId');
          res.body.data.should.have.property('amount').eql(body.amount);
          res.body.data.should.have.property('cashier');
          res.body.data.should.have.property('transactionType');
          res.body.data.should.have.property('accountBalance');
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 0o002020; // octal number format
      const body = { amount: '50000' };

      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
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
      const accountNumber = '0o002020fc'; // octal number format
      const body = { amount: '50000' };

      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
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
      const body = {};
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('x-access-token', generatedToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Require request body field "amount"');
          done();
        });
    });
  });
});
