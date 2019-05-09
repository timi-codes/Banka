"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _debug = _interopRequireDefault(require("debug"));

var _connection = _interopRequireDefault(require("./connection.db"));

var Model =
/*#__PURE__*/
function () {
  function Model(table) {
    (0, _classCallCheck2["default"])(this, Model);
    this.table = table;
    this.pool = _connection["default"];
    this.logger = (0, _debug["default"])('pg/model');
  }

  (0, _createClass2["default"])(Model, [{
    key: "logJSON",
    value: function logJSON(data) {
      return this.logger(JSON.stringify(data, null, '\t'));
    }
  }, {
    key: "insert",
    value: function () {
      var _insert = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(columns, selector, values) {
        var queryString, response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryString = "INSERT INTO ".concat(this.table, " (").concat(columns, ") VALUES(").concat(selector, ") returning *");
                _context.prev = 1;
                _context.next = 4;
                return this.pool.query(queryString, values);

              case 4:
                response = _context.sent;
                return _context.abrupt("return", response);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                throw _context.t0;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function insert(_x, _x2, _x3) {
        return _insert.apply(this, arguments);
      }

      return insert;
    }()
  }, {
    key: "select",
    value: function () {
      var _select = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(columns) {
        var queryString, response;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queryString = "SELECT ".concat(columns, " FROM ").concat(this.table);
                _context2.prev = 1;
                _context2.next = 4;
                return this.pool.query(queryString);

              case 4:
                response = _context2.sent;
                return _context2.abrupt("return", response);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                throw _context2.t0;

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 8]]);
      }));

      function select(_x4) {
        return _select.apply(this, arguments);
      }

      return select;
    }()
  }, {
    key: "selectWhere",
    value: function () {
      var _selectWhere = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(columns, selector, values) {
        var queryString, response;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queryString = "SELECT ".concat(columns, " FROM ").concat(this.table, " WHERE ").concat(selector);
                _context3.prev = 1;
                _context3.next = 4;
                return this.pool.query(queryString, values);

              case 4:
                response = _context3.sent;
                return _context3.abrupt("return", response);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);
                throw _context3.t0;

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 8]]);
      }));

      function selectWhere(_x5, _x6, _x7) {
        return _selectWhere.apply(this, arguments);
      }

      return selectWhere;
    }()
  }, {
    key: "selectWithJoin",
    value: function () {
      var _selectWithJoin = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(columns, selectors, values) {
        var queryString, response;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                queryString = "SELECT ".concat(columns, " FROM ").concat(this.table, " trans INNER JOIN accounts acc ON (trans.accountnumber = acc.accountnumber) WHERE ").concat(selectors, " ");
                _context4.prev = 1;
                _context4.next = 4;
                return this.pool.query(queryString, values);

              case 4:
                response = _context4.sent;
                return _context4.abrupt("return", response);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                throw _context4.t0;

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 8]]);
      }));

      function selectWithJoin(_x8, _x9, _x10) {
        return _selectWithJoin.apply(this, arguments);
      }

      return selectWithJoin;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(columns, selector, values) {
        var queryString, response;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                queryString = "UPDATE ".concat(this.table, " SET ").concat(columns, " WHERE ").concat(selector, " returning *");
                _context5.prev = 1;
                _context5.next = 4;
                return this.pool.query(queryString, values);

              case 4:
                response = _context5.sent;
                this.logJSON(response);
                return _context5.abrupt("return", response);

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](1);
                throw _context5.t0;

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 9]]);
      }));

      function update(_x11, _x12, _x13) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(selector, value) {
        var queryQuery, response;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                queryQuery = "DELETE FROM ".concat(this.table, " WHERE ").concat(selector, " returning *");
                _context6.prev = 1;
                _context6.next = 4;
                return this.pool.query(queryQuery, value);

              case 4:
                response = _context6.sent;
                return _context6.abrupt("return", response);

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](1);
                throw _context6.t0;

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 8]]);
      }));

      function _delete(_x14, _x15) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return Model;
}();

var _default = Model;
exports["default"] = _default;