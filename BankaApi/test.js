
var chai = require('chai');
let chaiHttp = require('chai-http');
var app = require("./index");

let should = chai.should();

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
        .expect(200)
        .end((err, res) => {
            
            res.body.should.haveOw
            done(err);
        });
    }); 
});



