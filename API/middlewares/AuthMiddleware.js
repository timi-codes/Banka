import jwt from 'jsonwebtoken';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();

/**
 * @description - use for decoding token
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 * @param {String} token
 *
 * @returns {Object} Object
 */
const decodeToken = (req, res, next, token) => {
  jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
    if (!error) {
      req.token = decode;
      return next();
    }
    response.setError(401, 'invalid request token');
    return response.send(res);
  });
};


/**
 * @description - User's Authentication Middleware
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */
const authMiddleware = (req, res, next) => {
  let token = req.headers['x-access-token']
      || req.headers.Authorization
      || req.headers.token
      || req.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (process.env.NODE_ENV === 'test') {
    if (!token) {
      token = 1;
    }
    if (typeof token === 'number') {
      req.token = { userId: token };
      return next();
    }
    if (typeof token === 'string') {
      return decodeToken(req, res, next, token);
    }
  }

  if (token) {
    return decodeToken(req, res, next, token);
  }

  response.setError(400, 'please assign a access token as header');
  return response.send(res);
};

export default authMiddleware;
