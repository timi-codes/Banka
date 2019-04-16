import pool from './connection.db';
import dummyData from '../dummyData';


const queryString = 'INSERT INTO users ( email, firstName, lastName, password, type, isAdmin) values ($1,$2,$3,$4,$5,$6)';


dummyData.users.map((item) => {
  pool.query(queryString, item, (err) => {
    if (err) console.log(err);
  });
});

dummyData.accounts.map((item) => {
  pool.query(queryString, item, (err) => {
    if (err) console.log(err);
  });
});

dummyData.transactions.map((item) => {
  pool.query(queryString, item, (err) => {
    if (err) console.log(err);
  });
});

pool.end();
