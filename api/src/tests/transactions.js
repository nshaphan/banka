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
        .send({email: 'cashier@banka.com', password: '123456Bk'})
        .end((err, res) => {
            token = res.body.data.token;
            done();
        });
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
        .send({email: 'cashier@banka.com', password: '123456Bk'})
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