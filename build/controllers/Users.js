"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../db/db"));

var _shortid = _interopRequireDefault(require("shortid"));

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
    key: "getUsers",
    value: function getUsers(req, res) {
      res.send(_db["default"].users);
    }
  }, {
    key: "signup",
    value: function signup(req, res) {
      var user = req.body; // Increment user id for new user

      user.id = _db["default"].users.length + 1;
      user.token = _shortid["default"].generate(); // Adding new user to database

      _db["default"].users.push(user); // generating response object


      var response = {
        status: 200,
        data: {
          token: user.token,
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
      var credentials = req.body; // find user with provided credentials 

      var user = _db["default"].users.find(function (user) {
        return user.email == credentials.email && user.password == credentials.password;
      }); // sign in response specifications


      var response = {
        status: 200,
        data: {
          token: user.token,
          id: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email
        }
      };
      res.json(response);
    }
  }]);

  return UsersController;
}();

var usersController = new UsersController();
var _default = usersController;
exports["default"] = _default;