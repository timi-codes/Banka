import debug from 'debug';
import pool from './connection.db';

class Model {
  constructor(table) {
    this.table = table;
    this.pool = pool;
    this.logger = debug('pg/model');
  }

  logJSON(data) {
    return this.logger(JSON.stringify(data, null, '\t'));
  }

  async insert(columns, selector, values) {
    const queryString = `INSERT INTO ${this.table} (${columns}) VALUES(${selector}) returning *`;
    try {
      const response = await this.pool.query(queryString, values);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async select(columns) {
    const queryString = `SELECT ${columns} FROM ${this.table}`;
    try {
      const response = await this.pool.query(queryString);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async selectWhere(columns, selector, values) {
    const queryString = `SELECT ${columns} FROM ${this.table} WHERE ${selector}`;
    try {
      const response = await this.pool.query(queryString, values);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async selectWithJoin(columns, selectors, values) {
    const queryString = `SELECT ${columns} FROM ${this.table} trans INNER JOIN accounts acc ON (trans.accountnumber = acc.accountnumber) WHERE ${selectors} `;
    try {
      const response = await this.pool.query(queryString, values);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async update(columns, selector, values) {
    const queryString = `UPDATE ${this.table} SET ${columns} WHERE ${selector} returning *`;
    try {
      const response = await this.pool.query(queryString, values);
      this.logJSON(response);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async delete(selector, value) {
    const queryQuery = `DELETE FROM ${this.table} WHERE ${selector} returning *`;
    try {
      const response = await this.pool.query(queryQuery, value);
      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default Model;
