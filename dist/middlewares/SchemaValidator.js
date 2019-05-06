"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _joi = _interopRequireDefault(require("joi"));

var _schemas = _interopRequireDefault(require("./validatorSchema/schemas"));

module.exports = function () {
  // enabled HTTP methods for request data validation
  var supportedMethods = ['post', 'put', 'patch']; // Joi validation options

  var validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  }; // return the validation middleware

  return function (req, res, next) {
    var route = req.route.path;
    var method = req.method.toLowerCase();

    if (supportedMethods.includes(method) && route in _schemas["default"]) {
      // get schema for the current route
      var schema = _schemas["default"][route];

      if (schema) {
        // Validate req.body using the schema and validation options
        return _joi["default"].validate(req.body, schema, validationOptions, function (err, data) {
          if (err) {
            // Custom Error
            var SimplifiedError = {
              status: 422,
              error: err.details ? err.details[0].message.replace(/['"]/g, '') : err.message
            }; // Send back the JSON error response

            res.status(422).json(SimplifiedError);
          } else {
            // Replace req.body with the data after Joi validation
            req.body = data;
            next();
          }
        });
      }
    }

    next();
  };
};