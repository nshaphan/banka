"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccountHelper =
/*#__PURE__*/
function () {
  function AccountHelper() {
    _classCallCheck(this, AccountHelper);
  }

  _createClass(AccountHelper, [{
    key: "generate",
    // A function to generate a random account number
    value: function generate() {
      var randnumber = Math.random().toString().slice(2).substr(0, 6);
      var today = new Date();
      var year = today.getFullYear();
      return year + randnumber;
    } // A function to verify if account exist and return the unique account

  }, {
    key: "make",
    value: function make() {
      var accountNumber = this.generate();

      if (!this.isAccountExisting(accountNumber)) {
        return accountNumber;
      }

      this.make();
    } // a function to check if a function already exist

  }, {
    key: "isAccountExisting",
    value: function isAccountExisting(acc_number) {
      var accounts = _db["default"].accounts;
      var foundAccount = accounts.find(function (account) {
        return account.accountNumber === acc_number;
      });
      return !foundAccount ? false : true;
    }
  }]);

  return AccountHelper;
}();

var accountHelper = new AccountHelper();
var _default = accountHelper;
exports["default"] = _default;