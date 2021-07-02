import chai from 'chai';
import chaiHttp from 'chai-http';
import { config } from 'dotenv';

import app from '../../src/index';

config();

chai.use(chaiHttp);
chai.should();

let token;

describe('Transactions', () => {
  before(async () => {
    const result = await chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'test@email.com', password: process.env.TEST_PASSWORD });

    token = result.body.token;
  });
  it('Should get all transactions', (done) => {
    chai
      .request(app)
      .get('/api/transactions')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should get all transactions by user', (done) => {
    chai
      .request(app)
      .get('/api/transactions/user/transactions')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should depose a transaction', (done) => {
    chai
      .request(app)
      .post('/api/transactions/depose')
      .set({ 'x-auth-token': token })
      .send({ description: 'sample description', amount: 1000 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should depose a transaction', (done) => {
    chai
      .request(app)
      .post('/api/transactions/depose')
      .set({ 'x-auth-token': token })
      .send({ description: 'sample description', amount: 10 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should withdraw a transaction', (done) => {
    chai
      .request(app)
      .post('/api/transactions/withdraw')
      .set({ 'x-auth-token': token })
      .send({ description: 'sample description', amount: 10 })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
});
