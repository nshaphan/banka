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

var UsersController =
/*#__PURE__*/
function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, [{
    key: "hello",
    value: function hello(req, res) {
      res.send("hello world");
    }
  }, {
    key: "signup",
    value: function signup(req, res) {
      var user = req.body;
      user.id = _db["default"].users.length + 1;

      _db["default"].users.push(user);

      var response = {
        status: 200,
        data: {
          token: '45erkjherht45495783',
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        }
      };
      res.json(response);
    }
  }, {
    key: "signin",
    value: function signin(req, res) {
      var credentials = req.body;

      _db["default"].users.forEach(function (user) {
        if (user.email == credentials.email && user.password == credentials.password) {
          var signin_spec = {
            status: 200,
            data: {
              token: '45erkjherht45495783',
              id: user.id,
              firstName: user.firstname,
              lastName: user.lastname,
              email: user.email
            }
          };
          res.json(signin_spec);
        }
      });
    }
  }]);

  return UsersController;
}();

var usersController = new UsersController();
var _default = usersController;
exports["default"] = _default;