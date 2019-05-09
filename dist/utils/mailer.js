"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _debug = _interopRequireDefault(require("debug"));

/**
 *@description - A function for sending mail
 *
 * @param {Object} mailData Mail Details
 *
 * @returns {void} void
 */
var mailer =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(mailData) {
    var to, subject, text, html, transporter, info;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            to = mailData.to, subject = mailData.subject, text = mailData.text, html = mailData.html;
            _context.prev = 1;
            transporter = _nodemailer["default"].createTransport({
              host: 'smtp.gmail.com',
              port: 587,
              secure: false,
              auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
              }
            });
            _context.next = 5;
            return transporter.sendMail({
              from: '"Banka App " <tejumoladavid@gmail.com>',
              to: to,
              subject: subject,
              text: text,
              html: html
            });

          case 5:
            info = _context.sent;
            (0, _debug["default"])('development')('Message sent: %s', info.messageId);
            (0, _debug["default"])('development')('Preview URL: %s', _nodemailer["default"].getTestMessageUrl(info));
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            (0, _debug["default"])('development')(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));

  return function mailer(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = mailer;
exports["default"] = _default;