import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();

/**
 * @description - User's Permission Middleware
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */
const permissionMiddleWare = (req, res, next) => {
  if (!req.token) {
    response.setError(400, 'How did you get pass the authentication middleware 😩😢😫');
    return response.send(res);
  }

  const { type, isAdmin } = req.token;

  const route = req.route.path;
  const method = req.method.toLowerCase();

  if (route === '/accounts' && method === 'get' && type !== 'staff') {
    response.setError(403, 'you do not have the permission to perform this operation');
    return response.send(res);
  }
  next();
};

export default permissionMiddleWare;
