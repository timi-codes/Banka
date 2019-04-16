import { Pool } from 'pg';
import debug from 'debug';
import configJson from './config';

const env = process.env.NODE_ENV || 'development';
const config = configJson[env];
debug('pg/connection')(config);

let pool;

if (env === 'production') {
  pool = new Pool({ connectionString: config[env] });
} else {
  pool = new Pool({
    user: config.uername,
    host: config.host,
    password: config.password,
    database: config.database,
    port: config.port,
  });
}

pool.on('error', (error) => {
  debug('pg/connection')(`Some error occured!${error}`);
});

export default pool;
