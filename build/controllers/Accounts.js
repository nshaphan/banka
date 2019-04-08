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

var AccountsController =
/*#__PURE__*/
function () {
  function AccountsController() {
    _classCallCheck(this, AccountsController);
  }

  _createClass(AccountsController, [{
    key: "accountCreate",
    value: function accountCreate(req, res) {
      _db["default"].users.forEach(function (user) {
        if (user.token == req.params.token) {
          var account = req.body;
          account.id = _db["default"].accounts.length + 1;
          account.accountNumber = '20183444094';
          account.createdOn = new Date();
          account.status = 'active';
          account.owner = user.id;

          _db["default"].accounts.push(account);

          res.json(account);
        }
      });
    }
  }]);

  return AccountsController;
}();

var accountsController = new AccountsController();
var _default = accountsController;
exports["default"] = _default;