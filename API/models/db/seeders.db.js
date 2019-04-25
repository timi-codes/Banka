import async from 'async';
import debug from 'debug';
import pool from './connection.db';
import dummyData from '../dummyData';


const userQueryText = 'INSERT INTO users (email, firstName, lastName, password, type, isAdmin) values ($1, $2, $3, $4, $5, $6) returning *';
const accountQueryText = 'INSERT INTO accounts (accountNumber, owner, type, status, balance) values ($1, $2, $3, $4, $5) returning *';
const transactionQueryText = 'INSERT INTO transactions (accountNumber, cashier, transactionType, amount, oldBalance, newBalance) values ($1, $2, $3, $4, $5, $6) returning *';

async function userTask1(callback) {
  await pool.query(userQueryText, dummyData.users[0], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted First User');
  });
}

async function userTask2(callback) {
  await pool.query(userQueryText, dummyData.users[1], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted Second User');
  });
}

async function userTask3(callback) {
  await pool.query(userQueryText, dummyData.users[2], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted Third User');
  });
}

async function userTask4(callback) {
  await pool.query(userQueryText, dummyData.users[3], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted Forth User');
  });
}

async function accountTask1(callback) {
  await pool.query(accountQueryText, dummyData.accounts[0], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted First Account');
  });
}

async function accountTask2(callback) {
  await pool.query(accountQueryText, dummyData.accounts[1], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted Second Account');
  });
}

async function transactionTask1(callback) {
  await pool.query(transactionQueryText, dummyData.transactions[0], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted First Transaction');
  });
}

async function transactionTask2(callback) {
  await pool.query(transactionQueryText, dummyData.transactions[1], (err) => {
    if (err) debug('pg/seeder')(err);
    callback(null, 'Inserted Second Transaction');
  });
}

const tasks = [
  userTask1,
  userTask2,
  userTask3,
  userTask4,
  accountTask1,
  accountTask2,
  transactionTask1,
  transactionTask2,
];

async.series(tasks, (err, results) => {
  if (err) console.log(err);
  if (results) console.log(results);
});
