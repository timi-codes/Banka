import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Utils = {

  /**
   * @description - validate password by comparing password with hash password
   * @param {string} password
   * @param {string} hashpassword
   * @returns {boolean} boolean to show if password match or not
   */
  validatePassword(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  },
  /**
   * @description - encypt password
   * @param {object} password
   * @returns {object} hashpassword
   */
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(15);
    const pwd = bcrypt.hashSync(password, salt);
    return pwd;
  },
  /**
   * @description - signs token
   * @param {object} payload
   */
  jwtSigner(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  },
  /**
   * @description - remove null key from ab object
   * @param {object}
   * @returns {object}
   */
  stripNull(obj) {
    let cleanObj = {};

    Object.keys(obj).forEach((val) => {
      const newVal = obj[val];
      cleanObj = newVal ? { ...cleanObj, [val]: newVal } : cleanObj;
    });

    return cleanObj;
  },
};

export default Utils;
