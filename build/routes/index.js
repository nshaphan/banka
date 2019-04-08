"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Users = _interopRequireDefault(require("../controllers/Users"));

var _Accounts = _interopRequireDefault(require("../controllers/Accounts"));

var _Transactions = _interopRequireDefault(require("../controllers/Transactions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var api_version = 'v1';
var base_url = '/api/' + api_version;
router.get(base_url + '/users', _Users["default"].getUsers);
router.post(base_url + '/auth/signup', _Users["default"].signup);
router.post(base_url + '/auth/signin', _Users["default"].signin);
router.post(base_url + "/accounts", _Accounts["default"].accountCreate);
router.patch(base_url + '/account/:accountNumber', _Accounts["default"].toggleStatus);
router["delete"](base_url + '/accounts/:accountNumber', _Accounts["default"].deleteAccount);
router.post(base_url + '/transactions/:accountNumber/debit', _Transactions["default"].debitAccount);
router.post(base_url + '/transactions/:accountNumber/credit', _Transactions["default"].creditAccount);
var _default = router;
exports["default"] = _default;