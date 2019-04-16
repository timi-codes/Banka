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

//   async insert(params, values) {
//     const queryString = `INSERT INTO users (${params}) values ($1,$2,$3,$4,$5,$6)`;
//   }

  async select(params) {
    const res = await this.pool.query(`select ${params} from ${this.table}`);
    this.logJSON(res);
  }

  async selectWhere(params) {
    const res = await this.pool.query(`select ${params} from ${this.table}`);
    this.logJSON(res);
  }
}

export default Model;
