"use strict";

var _ = require('lodash');

var Joi = require('joi');

var Schemas = require('./validatorSchema/schemas');

module.exports = function () {
  var useJoiError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  // useJoiError determines if we should respond with the base Joi error
  // boolean: defaults to false
  var useJoiErr = _.isBoolean(useJoiError) && useJoiError; // enabled HTTP methods for request data validation

  var supportedMethods = ['post', 'put', 'patch']; // Joi validation options

  var validationOptions = {
    abortEarly: false,
    // abort after the last validation error
    allowUnknown: true,
    // allow unknown keys that will be ignored
    stripUnknown: true // remove unknown keys from the validated data

  }; // return the validation middleware

  return function (req, res, next) {
    var route = req.route.path;
    var method = req.method.toLowerCase();

    if (_.includes(supportedMethods, method) && _.has(Schemas, route)) {
      // get schema for the current route
      var schema = _.get(Schemas, route);

      if (schema) {
        // Validate req.body using the schema and validation options
        return Joi.validate(req.body, schema, validationOptions, function (err, data) {
          if (err) {
            // Joi Error
            var JoiError = {
              status: 422,
              error: {
                original: err._object,
                // fetch only message and type from each error
                details: _.map(err.details, function (_ref) {
                  var message = _ref.message,
                      type = _ref.type;
                  return {
                    message: message.replace(/['"]/g, ''),
                    type: type
                  };
                })
              }
            }; // Custom Error

            var SimplifiedError = {
              status: 422,
              error: err.details ? err.details[0].message.replace(/['"]/g, '') : err.message
            }; // Send back the JSON error response

            res.status(422).json(useJoiErr ? JoiError : SimplifiedError);
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