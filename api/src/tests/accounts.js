import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';



use(chaiHttp);

const api_version = 'v1';
const base_url = '/api/'+ api_version;

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

describe("Accounts related endpoints", () => {

    context('With client privileges', () => {
        before((done) => {
            initializeUser(done);
        });
        it("POST /accounts - should be able to create a new account", (done) => {
            request(app)
                .post(base_url +'/accounts')
                .send({ type: 'current'})
                .set('x-access-token', userToken)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(200);
                    expect(res.body).to.have.property('data');
                })
                .then(done, done);
        });
    });

    context('With Admin privileges', () => {
        before((done) => {
            initializeAdmin(done);
        });
        it("PATCH /account/<accountNumber> - Should be able to disactivate account", (done) => {
            request(app)
                .patch(base_url +'/account/20183444095')
                .set('x-access-token', adminToken)
                .send({status: 'dormant'})
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(200);
                    expect(res.body).to.have.property('data');
                })
                .then(done, done);
        });
    
        it("PATCH /account/<accountNumber> - Should be able to activate account", (done) => {
            request(app)
                .patch(base_url +'/account/20183444095')
                .set('x-access-token', adminToken)
                .send({status: 'active'})
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(200);
                    expect(res.body).to.have.property('data');
                })
                .then(done, done);
        });
    
        it("DELETE /accounts/<accountNumber> - Should be able to delete account", (done) => {
            request(app)
                .delete(base_url +'/accounts/20183444095')
                .set('x-access-token', adminToken)
                .then((res) => {
                    expect(res.status).to.eql(200);
                })
                .then(done, done);
        });
    
        it("PATCH /accounts/<accountNumber>/undelete - Should be able to restore account", (done) => {
            request(app)
                .patch(base_url +'/accounts/20183444095/undelete')
                .set('x-access-token', adminToken)
                .then((res) => {
                    expect(res.status).to.eql(200);
                })
                .then(done, done);
        });

        it("GET /accounts - Should be able to retrieve all accounts", (done) => {
            request(app)
                .get(base_url +'/accounts')
                .set('x-access-token', adminToken)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(200);
                    expect(res.body).to.have.property('data');
                })
                .then(done, done);
        });

        it("GET /accounts?status=active - Should be able to retrieve all active accounts", (done) => {
            request(app)
                .get(base_url +'/accounts?status=active')
                .set('x-access-token', adminToken)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(200);
                    expect(res.body).to.have.property('data');
                })
                .then(done, done);
        });

        it("GET /accounts?status=dormant - Should be able to retrieve all dormant accounts", (done) => {
            request(app)
                .get(base_url +'/accounts?status=dormant')
                .set('x-access-token', adminToken)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(200);
                    expect(res.body).to.have.property('data');
                })
                .then(done, done);
        });

        it("GET /accounts/<accountNumber> - Should be able to retrieve account details", (done) => {
            request(app)
                .get(base_url +'/accounts/20183444095')
                .set('x-access-token', adminToken)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(200);
                    expect(res.body).to.have.property('data');
                })
                .then(done, done);
        });

        it("GET /accounts/<accountNumber>/transactions - Should be able to retrieve account transactions", (done) => {
            request(app)
                .get(base_url +'/accounts/20183444095/transactions')
                .set('x-access-token', adminToken)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(200);
                    expect(res.body).to.have.property('data');
                })
                .then(done, done);
        });
    });

});