
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require("./index");

var should = chai.should();

chai.use(chaiHttp);

describe('POST /auth/signup', () => {
    it('should be able to create a new user', (done) => {
        var user = {
            id : 1,
            email: 'user@banka.com',
            firstname: 'Shaphan',
            lastname: 'Nzabonimana',
            password: '123@bk',
            type: 'client',
            isAdmin: false
        }

        var response = {
            status: 200,
            data: {
                token: '45erkjherht45495783',
                id: 1,
                firstname: 'Shaphan',
                lastname: 'Nzabonimana',
                email: 'user@banka.com'
            }
        }

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



