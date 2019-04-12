"use strict";

var _chai = require("chai");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

var _db_test = _interopRequireDefault(require("../db/db_test"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _chai.use)(_chaiHttp["default"]);
var api_version = 'v1';
var base_url = '/api/' + api_version;
describe('POST /auth/signup', function () {
  var testUser = _db_test["default"].users[0];
  it('should be able to create a new user', function (done) {
    (0, _chai.request)(_index["default"]).post(base_url + '/auth/signup').send(testUser).end(function (err, res) {
      // Expect status to Ok!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
describe("POST /auth/signin", function () {
  var testUser = _db_test["default"].users[0];
  it('should be able to create a new user', function (done) {
    (0, _chai.request)(_index["default"]).post(base_url + '/auth/signin').send({
      email: testUser.email,
      password: testUser.password
    }).end(function (err, res) {
      // Expect status to be equal to OK!
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
describe("POST /accounts", function () {
  var testAccount = _db_test["default"].accounts[0];
  it("Should be able to create a new account", function (done) {
    (0, _chai.request)(_index["default"]).post(base_url + '/accounts?token=45erkjherht45495783').send(testAccount).end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
describe("PATCH /account/<account-number>", function () {
  it("Should be able to activate or disactivate account", function (done) {
    (0, _chai.request)(_index["default"]).patch(base_url + '/account/20183444095').end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
describe("DELETE /accounts/<account-number>", function () {
  it("Should be able to delete account", function (done) {
    (0, _chai.request)(_index["default"])["delete"](base_url + '/accounts/20183444095').end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
describe("POST /transactions/<account-number>/debit", function () {
  var testTransact = _db_test["default"].transactions[0];
  it("Should be able to debit account", function (done) {
    (0, _chai.request)(_index["default"]).post(base_url + '/transactions/20183444095/debit?token=45erkjherht45495783').send(testTransact).end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});
describe("POST /transactions/<account-number>/credit", function () {
  var testTransact = _db_test["default"].transactions[0];
  it("Should be able to credit account", function (done) {
    (0, _chai.request)(_index["default"]).post(base_url + '/transactions/20183444095/credit?token=45erkjherht45495783').send(testTransact).end(function (err, res) {
      (0, _chai.expect)(res.status).to.eql(200);
      done(err);
    });
  });
});