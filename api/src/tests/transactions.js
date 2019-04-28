import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import bankaTest from '../db/db_test';



use(chaiHttp);

const api_version = 'v1';
const base_url = '/api/'+ api_version;
var token = '';

var adminToken = '';
var userToken = '';
var cashierToken = '';

let initializeUser = (done) => {
    request(app)
        .post(base_url +'/auth/signin')
        .send({email: 'user@banka.com', password: '1234567@Bk'})
        .then((res) => {
            userToken = res.body.data.token;
        })
        .then(done, done);
};

let initializeCashier = (done) => {
    request(app)
        .post(base_url +'/auth/signin')
        .send({email: 'cashier@banka.com', password: '1234567@Bk'})
        .then((res) => {
            cashierToken = res.body.data.token;
        })
        .then(done, done);
}

let initializeAdmin = (done) => {
    request(app)
        .post(base_url +'/auth/signin')
        .send({email: 'admin@banka.com', password: '1234567@Bk'})
        .then((res) => {
            adminToken = res.body.data.token;
        })
        .then(done, done);
    
}

describe("Transactions related endpoints", () => {
    
    context("With cashier privileges", () => {
        before((done) => {
            cashierToken = initializeCashier(done);
        });

        var testTransact = bankaTest.transactions[0];
        it("POST /transactions/<accountNumber>/credit - Should be able to credit account", (done) => {
            request(app)
                .post(base_url +'/transactions/20183444096/credit')
                .set('x-access-token', cashierToken)
                .send(testTransact)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(200);
                    expect(res.body).to.have.property('data');
                })
                .then(done, done);
        });

        var testTransact = bankaTest.transactions[0];
        it("POST /transactions/<accountNumber>/debit - Should be able to debit account", (done) => {
            request(app)
                .post(base_url +'/transactions/20183444096/debit')
                .set('x-access-token', cashierToken)
                .send(testTransact)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(200);
                    expect(res.body).to.have.property('data');
                })
                .then(done, done);
        });
        
        it("POST /transactions/<transaction-id> - Should be able to return a specific transaction", (done) => {
            request(app)
                .get(base_url +'/transactions/1')
                .set('x-access-token', cashierToken)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(200);
                    expect(res.body).to.have.property('data');
                })
                .then(done, done);
        });

        it("GET /transactions - Should be able to retrieve all transactions", (done) => {
            request(app)
                .get(base_url +'/transactions')
                .set('x-access-token', cashierToken)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(200);
                    expect(res.body).to.have.property('data');
                })
                .then(done, done);
        });
    });
});