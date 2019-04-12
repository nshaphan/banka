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

var Transaction =
/*#__PURE__*/
function () {
  function Transaction() {
    _classCallCheck(this, Transaction);
  }

  _createClass(Transaction, [{
    key: "debitAccount",
    value: function debitAccount(req, res) {
      // getting account number from url
      var accountNumber = req.params.accountNumber;
      var accounts = _db["default"].accounts;
      var users = _db["default"].users; // find user using access_token

      var cashier = users.find(function (user) {
        return user.token === req.query.token;
      }); // find account index using account number

      var accountIndex = accounts.findIndex(function (account) {
        return account.accountNumber === accountNumber;
      });
      var transaction = {
        id: _db["default"].users.length + 1,
        createOn: new Date(),
        type: 'debit',
        accountNumber: accountNumber,
        cashier: cashier.id,
        amount: req.body.amount,
        // retrieving existing old balance 
        oldBalance: _db["default"].accounts[accountIndex].balance,
        // reducing transaction amount from existing balance
        newBalance: parseFloat(_db["default"].accounts[accountIndex].balance) - parseFloat(req.body.amount)
      };
      _db["default"].accounts[accountIndex].balance = transaction.newBalance;
      var response = {
        status: 200,
        data: {
          transactionId: transaction.id,
          accountNumber: transaction.accountNumber,
          amount: transaction.amount,
          cashier: transaction.cashier,
          transactionType: transaction.type,
          accountBalance: transaction.newBalance
        } // Send response object

      };
      res.json(response);
    }
  }, {
    key: "creditAccount",
    value: function creditAccount(req, res) {
      // getting account number from url
      var accountNumber = req.params.accountNumber;
      var accounts = _db["default"].accounts;
      var users = _db["default"].users; // find user using access_token

      var cashier = users.find(function (user) {
        return user.token === req.query.token;
      }); // find account index using account number

      var accountIndex = accounts.findIndex(function (account) {
        return account.accountNumber === accountNumber;
      });
      var transaction = {
        id: _db["default"].users.length + 1,
        createOn: new Date(),
        type: 'credit',
        accountNumber: accountNumber,
        cashier: cashier.id,
        amount: req.body.amount,
        // retrieving existing old balance 
        oldBalance: _db["default"].accounts[accountIndex].balance,
        // reducing transaction amount from existing balance
        newBalance: parseFloat(_db["default"].accounts[accountIndex].balance) + parseFloat(req.body.amount)
      };
      _db["default"].accounts[accountIndex].balance = transaction.newBalance;
      var response = {
        status: 200,
        data: {
          transactionId: transaction.id,
          accountNumber: transaction.accountNumber,
          amount: transaction.amount,
          cashier: transaction.cashier,
          transactionType: transaction.type,
          accountBalance: transaction.newBalance
        } // Send response object

      };
      res.json(response);
    }
  }]);

  return Transaction;
}();

var transactionsController = new Transaction();
var _default = transactionsController;
exports["default"] = _default;