
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require("./index");

chai.use(chaiHttp);

var api_version = app.get('api_version');
var base_url = app.get('base_url');

dbTest = {
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





var response = {
    status: 200,
    data: {
        token: '45erkjherht45495783',
        id: 2,
        firstname: 'Emmanuel',
        lastname: 'Twahirwa',
        email: 'emmy@banka.com'
    }
}

describe('POST /auth/signup', () => {
    it('should be able to create a new user', (done) => {
        chai.request(app)
            .post(base_url +'/auth/signup')
            .send(testUser)
            .end((err, res) => {
                
                chai.expect(res.body).to.eql(response);
                chai.expect(res.status).to.eql(200);
                done(err);
            });
    }); 
});

describe("POST /auth/signin", () => {

    var signin_spec = {
        status : 200,
        data : {
            token : '45erkjherht45495783',
            id : 2,
            firstName : 'Emmanuel' ,
            lastName : 'Twahirwa' ,
            email : 'emmy@banka.com'
        }
    }
        
    it("should be able to authenticate the user", (done) => {
        chai.request(app)
            .post(base_url +'/auth/signin')
            .send({email: testUser.email, password: testUser.password})
            .end((err, res) => {
                chai.expect(res.status).to.eql(200); 
                chai.expect(res.body).to.eql(signin_spec);
                done(err);
            });
            
    });
});

describe("POST /accounts", () => {

    var acc_spec = {
        status : 200,
        data : {
            accountNumber: '20183444094',
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            email: testUser.email,
            type: testUser.type,
            balance: testAccount.openingBalance
        }

    }
    it("Should be able to create a new account", (done) => {
        chai.request(app)
            .post(base_url +'/accounts')
            .send(testAccount)
            .end((err, res) => {
                chai.expect(res.status).to.eql(200);
                chai.expect(res.body).to.eql(acc_spec);
                done(err);
            });
    });
});

