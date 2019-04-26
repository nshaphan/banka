
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
            .then((res) => {
                // Expect status to Ok!
                expect(res.status).to.eql(200);
                done();
            }).catch(err => {
                console.log(err.message);
                done();
            });
    }); 
});


describe("POST /auth/signin", () => {
    
    var testUser = bankaTest.users[0];
    it('should be able to log in the user', (done) => {
        request(app)
            .post(base_url +'/auth/signin')
            .send({email: 'user@banka.com', password: '1234567@Bk'})
            .then((res) => {
                // Expect status to Ok!
                expect(res.status).to.eql(200);
                done();
            }).catch(err => {
                console.log(err.message);
                done();
            });
    });
});