"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var bankaTest = {
  users: [{
    id: 2,
    email: 'emmy@banka.com',
    firstname: 'Emmanuel',
    lastname: 'Twahirwa',
    password: '1234@bk',
    type: 'client',
    isAdmin: false
  }],
  accounts: [{
    accountName: 'Shaphan',
    openingBalance: '5000',
    currency: '$',
    type: 'savings'
  }],
  transactions: [{
    amount: 1000
  }]
};
var _default = bankaTest;
exports["default"] = _default;