"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db/db"));

var _AccountHelper = _interopRequireDefault(require("../helpers/AccountHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccountsController =
/*#__PURE__*/
function () {
  function AccountsController() {
    _classCallCheck(this, AccountsController);
  }

  _createClass(AccountsController, [{
    key: "accountCreate",
    // create new bank account
    value: function accountCreate(req, res) {
      var account = req.body;
      var users = _db["default"].users; // incrementing account id for new account

      account.id = _db["default"].accounts.length + 1; // Generate new Account Number

      account.accountNumber = _AccountHelper["default"].make();
      account.createdOn = new Date();
      account.status = 'active'; // find user using access_token

      var accountOwner = users.find(function (user) {
        return user.token === req.query.token;
      });
      account.owner = accountOwner.id;

      _db["default"].accounts.push(account);

      var response = {
        status: 200,
        data: {
          accountNumber: account.accountNumber,
          firstname: accountOwner.firstname,
          lastname: accountOwner.lastname,
          email: accountOwner.email,
          type: account.type,
          openingBalance: account.balance
        }
      };
      res.status(200).json(response);
    } // change account status from active to dormant and vice-versa

  }, {
    key: "toggleStatus",
    value: function toggleStatus(req, res) {
      // getting account number from url
      var accountNumber = req.params.accountNumber;
      var accounts = _db["default"].accounts; // find account index using account number

      var accountIndex = accounts.findIndex(function (account) {
        return account.accountNumber === accountNumber;
      }); // updating account based on account index

      if (_db["default"].accounts[accountIndex].status == 'active') {
        _db["default"].accounts[accountIndex].status = 'dormant';
      } else {
        _db["default"].accounts[accountIndex].status = 'active';
      } // response object


      var response = {
        status: 200,
        data: {
          accountNumber: _db["default"].accounts[accountIndex].accountNumber,
          status: _db["default"].accounts[accountIndex].status
        }
      };
      res.status(200).json(response);
    } // Delete a user account

  }, {
    key: "deleteAccount",
    value: function deleteAccount(req, res) {
      // getting account number from url
      var accountNumber = req.params.accountNumber;
      var accounts = _db["default"].accounts; // find account index using account number

      var accountIndex = accounts.findIndex(function (account) {
        return account.accountNumber === accountNumber;
      }); // updating deletedAt Account property

      _db["default"].accounts[accountIndex].deletedAt = new Date();
      var response = {
        status: 200,
        message: "Account successfully deleted"
      };
      res.json(response);
    }
  }]);

  return AccountsController;
}();

var accountsController = new AccountsController();
var _default = accountsController;
exports["default"] = _default;