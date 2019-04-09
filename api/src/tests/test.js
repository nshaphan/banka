
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import bankaTest from '../db/db_test';

use(chaiHttp);

const api_version = 'v1';
const base_url = '/api/'+ api_version; 

describe('POST /auth/signup', () => {

    var testUser = bankaTest.users[0];
    it('should be able to create a new user', (done) => {
        request(app)
            .post(base_url +'/auth/signup')
            .send(testUser)
            .end((err, res) => {
                // Expect status to Ok!
                expect(res.status).to.eql(200);
                done(err);
            });
    }); 
});

describe("POST /auth/signin", () => {
    
    var testUser = bankaTest.users[0];
    it('should be able to create a new user', (done) => {
        request(app)
            .post(base_url +'/auth/signin')
            .send({email: testUser.email, password: testUser.password})
            .end((err, res) => {

                // Expect status to be equal to OK!
                expect(res.status).to.eql(200);
                done(err);
            });
    });
});

describe("POST /accounts", () => {

    var testAccount = bankaTest.accounts[0];
    it("Should be able to create a new account", (done) => {
        request(app)
            .post(base_url +'/accounts?token=45erkjherht45495783')
            .send(testAccount)
            .end((err, res) => {
                expect(res.status).to.eql(200);
                done(err);
            });
    });
});

describe("PATCH /account/<account-number>", () => {

    it("Should be able to activate or disactivate account", (done) => {
        request(app)
            .patch(base_url +'/account/20183444095')
            .end((err, res) => {
                expect(res.status).to.eql(200);
                done(err);
            });
    });
});


describe("DELETE /accounts/<account-number>", () => {

    it("Should be able to delete account", (done) => {
        request(app)
            .delete(base_url +'/accounts/20183444095')
            .end((err, res) => {
                expect(res.status).to.eql(200);
                done(err);
            });
    });
});

describe("POST /transactions/<account-number>/debit", () => {

    var testTransact = bankaTest.transactions[0];
    it("Should be able to debit account", (done) => {
        request(app)
            .post(base_url +'/transactions/20183444095/debit?token=45erkjherht45495783')
            .send(testTransact)
            .end((err, res) => {
                expect(res.status).to.eql(200);
                done(err);
            });
    });
});

describe("POST /transactions/<account-number>/credit", () => {

    var testTransact = bankaTest.transactions[0];
    it("Should be able to credit account", (done) => {
        request(app)
            .post(base_url +'/transactions/20183444095/credit?token=45erkjherht45495783')
            .send(testTransact)
            .end((err, res) => {
                expect(res.status).to.eql(200);
                done(err);
            });
    });
});






