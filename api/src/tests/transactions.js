import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import bankaTest from '../db/db_test';



use(chaiHttp);

const api_version = 'v1';
const base_url = '/api/'+ api_version;
var token = '';

describe("POST /transactions/<account-number>/credit", () => {
    before((done) => {
        request(app)
        .post(base_url +'/auth/signin')
        .send({email: 'cashier@banka.com', password: '1234567@Bk'})
        .then((res) => {
            token = res.body.data.token;
        })
        .then(done, done);
    });

    var testTransact = bankaTest.transactions[0];
    it("Should be able to credit account", (done) => {
        request(app)
            .post(base_url +'/transactions/20183444096/credit')
            .set('x-access-token', token)
            .send(testTransact)
            .end((err, res) => {
                expect(res.status).to.eql(200);
                done(err);
            });
    });
});

describe("POST /transactions/<account-number>/debit", () => {

    before((done) => {
        request(app)
        .post(base_url +'/auth/signin')
        .send({email: 'cashier@banka.com', password: '1234567@Bk'})
        .end((err, res) => {
            token = res.body.data.token;
            done();
        });
    });

    var testTransact = bankaTest.transactions[0];
    it("Should be able to debit account", (done) => {
        request(app)
            .post(base_url +'/transactions/20183444096/debit')
            .set('x-access-token', token)
            .send(testTransact)
            .end((err, res) => {
                expect(res.status).to.eql(200);
                done(err);
            });
    });
});

describe("GET /accounts/<account-number>/transactions", () => {

    before((done) => {
        request(app)
        .post(base_url +'/auth/signin')
        .send({email: 'cashier@banka.com', password: '1234567@Bk'})
        .then((res) => {
            token = res.body.data.token;
        })
        .then(done, done);
    });

    
    it("Should be able to return account transactions", (done) => {
        request(app)
            .get(base_url +'/accounts/20183444096/transactions')
            .set('x-access-token', token)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').eql(200);
                expect(res.body).to.have.property('data');
            })
            .then(done, done);
    });
});

describe("GET /transactions/<transaction-id>", () => {

    before((done) => {
        request(app)
        .post(base_url +'/auth/signin')
        .send({email: 'cashier@banka.com', password: '1234567@Bk'})
        .then((res) => {
            token = res.body.data.token;
        })
        .then(done, done);
    });

    
    it("Should be able to return a specific transaction", (done) => {
        request(app)
            .get(base_url +'/transactions/1')
            .set('x-access-token', token)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').eql(200);
                expect(res.body).to.have.property('data');
            })
            .then(done, done);
    });
});