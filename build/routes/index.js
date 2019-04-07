"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Users = _interopRequireDefault(require("../controllers/Users"));

var _Accounts = _interopRequireDefault(require("../controllers/Accounts"));

var _shortid = require("shortid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var api_version = 'v1';
var base_url = '/api/' + api_version;
router.get(base_url, _Users["default"].hello);
router.post(base_url + '/auth/signup', _Users["default"].signup);
router.post(base_url + '/auth/signin', _Users["default"].signin);
router.post(base_url + "/accounts", _Accounts["default"].accountCreate);
var _default = router;
exports["default"] = _default;