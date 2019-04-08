
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import bankaTest from '../db/db_test';

use(chaiHttp);

const api_version = 'v1';
const base_url = '/api/'+ api_version; 

var testUser = bankaTest.users[0];
var testAccount = bankaTest.accounts[0];





describe('POST /auth/signup', () => {
    it('should be able to create a new user', (done) => {
        request(app)
            .post(base_url +'/auth/signup')
            .send(testUser)
            .end((err, res) => {
                expect(res.status).to.eql(200);
                done(err);
            });
    }); 
});

describe("POST /auth/signin", () => {
        
    it("should be able to authenticate the user", (done) => {
        request(app)
            .post(base_url +'/auth/signin')
            .send({email: testUser.email, password: testUser.password})
            .end((err, res) => {
                expect(res.status).to.eql(200);
                done(err);
            });
            
    });
});

describe("POST /accounts", () => {

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

