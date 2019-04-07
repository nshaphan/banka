
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require("../src/index").default;

chai.use(chaiHttp);

const api_version = 'v1';
const base_url = '/api/'+ api_version;

var dbTest = {
    users : [
        {
            id : 2,
            email: 'emmy@banka.com',
            firstname: 'Emmanuel',
            lastname: 'Twahirwa',
            password: '1234@bk',
            type: 'client',
            isAdmin: false
        }
    ],

    accounts : [
        {
            accountName : 'Shaphan',
            openingBalance : '5000',
            currency : '$',
            type : 'savings'
        }
    ]
} 


var testUser = dbTest.users[0];
var testAccount = dbTest.accounts[0];





describe('POST /auth/signup', () => {
    it('should be able to create a new user', (done) => {
        chai.request(app)
            .post(base_url +'/auth/signup')
            .send(testUser)
            .end((err, res) => {
                chai.expect(res.status).to.eql(200);
                done(err);
            });
    }); 
});

describe("POST /auth/signin", () => {
        
    it("should be able to authenticate the user", (done) => {
        chai.request(app)
            .post(base_url +'/auth/signin')
            .send({email: testUser.email, password: testUser.password})
            .end((err, res) => {
                chai.expect(res.status).to.eql(200);
                done(err);
            });
            
    });
});

describe("POST /accounts", () => {

    it("Should be able to create a new account", (done) => {
        chai.request(app)
            .post(base_url +'/accounts?token=45erkjherht45495783')
            .send(testAccount)
            .end((err, res) => {
                chai.expect(res.status).to.eql(200);
                done(err);
            });
    });
});

