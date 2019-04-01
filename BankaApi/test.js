
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require("./index");

var should = chai.should();

chai.use(chaiHttp);

var user = {
    id : 1,
    email: 'emmy@banka.com',
    firstname: 'Emmanuel',
    lastname: 'Twahirwa',
    password: '1234@bk',
    type: 'client',
    isAdmin: false
}

var response = {
    status: 200,
    data: {
        token: '45erkjherht45495783',
        id: 1,
        firstname: 'Emmanuel',
        lastname: 'Twahirwa',
        email: 'emmy@banka.com'
    }
}

describe('POST /auth/signup', () => {
    it('should be able to create a new user', (done) => {
        chai.request(app)
            .post('/auth/signup')
            .send(user)
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
            id : 1,
            firstName : 'Emmanuel' ,
            lastName : 'Twahirwa' ,
            email : 'emmy@banka.com'
        }
    }
        
    it("should be able to authenticate the user", (done) => {
        chai.request(app)
            .post('/auth/signin')
            .send({email: user.email, password: user.password})
            .end((err, res) => {
                chai.expect(res.status).to.eql(200); 
                chai.expect(res.body).to.eql(user);
                done(err);
            })
            
    });
});



