"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _paramsSchemas = _interopRequireDefault(require("./validatorSchema/paramsSchemas"));

var _default = function _default() {
  // enabled HTTP methods for request data validation
  var supportedMethods = ['get', 'post', 'patch', 'delete']; // Joi validation options

  var validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  }; // return the validation middleware

  return function (req, res, next) {
    var route = req.route.path;
    var method = req.method.toLowerCase();

    if (supportedMethods.includes(method) && route in _paramsSchemas["default"]) {
      // get schema for the current route
      var schema = _paramsSchemas["default"][route];

      if (schema) {
        // Validate req.body using the schema and validation options
        return _joi["default"].validate(req.params, schema, validationOptions, function (err, data) {
          if (err) {
            // Custom Error
            var SimplifiedError = {
              status: 400,
              error: err.details ? err.details[0].message.replace(/['"]/g, '') : err.message
            }; // Send back the JSON error response

            res.status(400).json(SimplifiedError);
          } else {
            // Replace req.params with the data after Joi validation
            req.params = data;
            return next();
          }
        });
      }
    }

    return next();
  };
};

exports["default"] = _default;