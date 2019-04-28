
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import bankaTest from '../db/db_test';



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

describe('Users related endpoints', () => {
    context("With public access privileges", () => {

        var testUser = bankaTest.users[0];
        it('POST /auth/signup - should be able to create a new client user', (done) => {
            request(app)
                .post(base_url +'/auth/signup')
                .send(testUser)
                .then((res) => {
                    //console.log(res.body);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(200);
                    expect(res.body).to.have.property('data');
                })
                .then(done, done);
        }); 

        it('POST /auth/signin - should be able to log in the user', (done) => {
            request(app)
                .post(base_url +'/auth/signin')
                .send({email: 'user@banka.com', password: '1234567@Bk'})
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(200);
                    expect(res.body).to.have.property('data');
                })
                .then(done, done);
        });

        it('POST /auth/signup - should be able to alert when a same user tries to register twice', (done) => {
            request(app)
                .post(base_url +'/auth/signup')
                .send(testUser)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(400);
                    expect(res.body).to.have.property('error');
                })
                .then(done, done);
        });

    });
    
    context("With Admin privileges", () => {
        before((done) => {
            adminToken = initializeAdmin(done);
        });

        it("GET /users - Should be able to retrieve all users", (done) => {
            request(app)
                .get(base_url +'/users')
                .set('x-access-token', adminToken)
                .then((res) => {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(200);
                    expect(res.body).to.have.property('data');
                })
                .then(done, done);
        });

        it("GET /user/<email-accounts>/accounts - Should be able to retrieve all accounts by email", (done) => {
            request(app)
                .get(base_url +'/user/user@banka.com/accounts')
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