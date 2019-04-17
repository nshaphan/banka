import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import bankaTest from '../db/db_test';



use(chaiHttp);

const api_version = 'v1';
const base_url = '/api/'+ api_version;
var token = '';

describe("POST /accounts", () => {
    
    before((done) => {
        request(app)
        .post(base_url +'/auth/signin')
        .send({email: 'user@banka.com', password: '123456Bk'})
        .end((err, res) => {
            token = res.body.data.token;
            done();
        });
    });

    var testAccount = bankaTest.accounts[0];

    it("Should be able to create a new account", (done) => {
        request(app)
            .post(base_url +'/accounts')
            .set('x-access-token', token)
            .send(testAccount)
            .end((err, res) => {
                expect(res.status).to.eql(200);
                done(err);
            });
    });

});

describe("PATCH /account/<account-number>", () => {

    before((done) => {
        request(app)
        .post(base_url +'/auth/signin')
        .send({email: 'admin@banka.com', password: '123456Bk'})
        .end((err, res) => {
            token = res.body.data.token;
            done();
        });
    });

    it("Should be able to disactivate account", (done) => {
        request(app)
            .patch(base_url +'/account/20183444095')
            .set('x-access-token', token)
            .end((err, res) => {
                expect(res.status).to.eql(200);
                done(err);
            });
    });

    it("Should be able to activate account", (done) => {
        request(app)
            .patch(base_url +'/account/20183444095')
            .set('x-access-token', token)
            .end((err, res) => {
                expect(res.status).to.eql(200);
                done(err);
            });
    });
});

describe("DELETE /accounts/<account-number>", () => {

    before((done) => {
        request(app)
        .post(base_url +'/auth/signin')
        .send({email: 'admin@banka.com', password: '123456Bk'})
        .end((err, res) => {
            token = res.body.data.token;
            done();
        });
    });

    it("Should be able to delete account", (done) => {
        request(app)
            .delete(base_url +'/accounts/20183444095')
            .set('x-access-token', token)
            .end((err, res) => {
                expect(res.status).to.eql(200);
                done(err);
            });
    });

});