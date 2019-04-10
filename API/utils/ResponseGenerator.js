import Utils from './common';

/**
 * a class for api response
 */
class ResponseGenerator {
  constructor() {
    this.status = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  /**
   * @description set Api response for 200 & 201
   *  @param{int} statusCode
   * @param {object} data
   */

  setSuccess(statusCode, data, message) {
    this.status = statusCode;
    this.data = data;
    this.message = message;

    this.type = 'success';
  }

  /**
   * @description set Api response for 400, 401, 403, 404, 503
   *  @param{int} statusCode
   * @param {object} data
   */

  setError(statusCode, message) {
    this.status = statusCode;
    this.message = message;
    this.type = 'error';
  }

  /**
     * Sends response
     * @param {object} res
     * @returns {object} responseObject
     */
  send(res) {
    const filteredResponse = Utils.stripNull({
      status: this.status,
      message: this.message,
      data: this.data,
    });

    if (this.type === 'success') {
      return res.status(this.status).json(filteredResponse);
    }
    // Here this.type === 'error'
    return res.status(this.status).json({
      status: this.status,
      error: this.message,
    });
  }
}

export default ResponseGenerator;
