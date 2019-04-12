"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var banka = {
  users: [{
    id: 1,
    email: 'user@banka.com',
    firstname: 'Shaphan',
    lastname: 'Nzabonimana',
    password: '123@bk',
    type: 'client',
    isAdmin: false,
    token: "45erkjherht45495783"
  }],
  accounts: [{
    id: 1,
    accountNumber: '20183444095',
    createdOn: "12-05-2018",
    owner: 1,
    type: 'current',
    status: 'active',
    balance: '2000'
  }],
  transactions: [{
    id: 1,
    createdOn: '12-05-2018',
    type: 'debit',
    accountNumber: '20183444095',
    cashier: 1,
    amount: 3000,
    oldBalance: 5000,
    newBalance: 2000
  }]
};
var _default = banka;
exports["default"] = _default;