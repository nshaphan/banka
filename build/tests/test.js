"use strict";

var _chai = require("chai");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

var _db_test = _interopRequireDefault(require("../db/db_test"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _chai.use)(_chaiHttp["default"]);
var api_version = 'v1';
var base_url = '/api/' + api_version;
var testUser = _db_test["default"].users[0];
var testAccount = _db_test["default"].accounts[0];
describe('POST /auth/signup', function () {
  it('should be able to create a new user', function (done) {
    (0, _chai.request)(_index["default"]).post(base_url + '/auth/signup').send(testUser).end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
describe("POST /auth/signin", function () {
  it("should be able to authenticate the user", function (done) {
    (0, _chai.request)(_index["default"]).post(base_url + '/auth/signin').send({
      email: testUser.email,
      password: testUser.password
    }).end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
describe("POST /accounts", function () {
  it("Should be able to create a new account", function (done) {
    (0, _chai.request)(_index["default"]).post(base_url + '/accounts?token=45erkjherht45495783').send(testAccount).end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});