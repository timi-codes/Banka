import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Test transaction related endpoints - Debit and Credit an account', () => {
  let cashierToken = null;
  let userToken = null;

  /**
     * Sign in as a cashier to generate user token before test
     */
  before('Sign in cashier to obtain auth token to be used in other account operations', (done) => {
    const userCredential = {
      email: 'johnoke@gmail.com',
      password: 'password',
    };

    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userCredential)
      .end((err, res) => {
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
  describe('POST /transactions/:accountNumber/debit', () => {
    before('Sign in as a user', (done) => {
      const userCredential = {
        email: 'boladeojo@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(userCredential)
        .end((err, res) => {
          res.should.have.status(200);
          if (!err) {
            userToken = res.body.data.token;
          }
          done();
        });
    });

    it('it should throw permission error if user is not a cashier', (done) => {
      const accountNumber = 222010872;
      const body = { amount: 50000 };
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('x-access-token', userToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('only a cashier has the permission to debit an account');
          done();
        });
    });


    it('it should throw an insufficient balance error', (done) => {
      const accountNumber = 222010872;
      const body = { amount: 5000000 };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('x-access-token', cashierToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('account balance is not sufficient');
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 22201084472;
      const body = { amount: 50000 };

      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('x-access-token', cashierToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('account number doesn\'t exist');
          done();
        });
    });

    it('it should throw an error when "amount" in request body is not provided ', (done) => {
      const accountNumber = 222010872;
      const body = {};
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('x-access-token', cashierToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('amount is required');
          done();
        });
    });

    it('it should throw an error when "amount" is not a number', (done) => {
      const accountNumber = 222010872;
      const body = { amount: '50000hrh' };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('x-access-token', cashierToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('amount must be a number');
          done();
        });
    });

    it('it should debit a bank account', (done) => {
      const accountNumber = 222010872;
      const body = { amount: 50000 };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('x-access-token', cashierToken)
        .send(body)
        .end((err, res) => {
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
  describe('POST /transactions/:accountNumber/credit', () => {
    it('it should throw permission error if user is not a cashier', (done) => {
      const accountNumber = 222010872;
      const body = { amount: 50000 };
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('x-access-token', userToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('only a cashier has the permission to credit an account');
          done();
        });
    });


    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 22201084472;
      const body = { amount: 50000 };

      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('x-access-token', cashierToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('account number doesn\'t exist');
          done();
        });
    });

    it('it should throw an error when "amount" in request body is not provided ', (done) => {
      const accountNumber = 222010872;
      const body = {};
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('x-access-token', cashierToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('amount is required');
          done();
        });
    });

    it('it should throw an error when "amount" is not a number', (done) => {
      const accountNumber = 222010872;
      const body = { amount: '50000hrh' };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('x-access-token', cashierToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('amount must be a number');
          done();
        });
    });

    it('it should credit a bank account', (done) => {
      const accountNumber = 222010872;
      const body = { amount: 50000 };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('x-access-token', cashierToken)
        .send(body)
        .end((err, res) => {
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
});
