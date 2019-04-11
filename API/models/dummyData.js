import moment from 'moment';
import Utils from '../utils/common';

export default {
  accounts: [
    {
      id: 1,
      accountNumber: 222010772,
      createdOn: moment(),
      owner: 1,
      type: 'savings',
      status: 'active',
      balance: 20000.95,
    },
    {
      id: 2,
      accountNumber: 222010872,
      createdOn: moment(),
      owner: 2,
      type: 'current',
      status: 'dormant',
      balance: 400000.95,
    },
  ],
  users: [
    {
      id: 1,
      email: 'tejumoladavid@gmail.com',
      firstName: 'David',
      lastName: 'Tejumola',
      password: Utils.hashPassword('password'),
      type: 'staff',
      isAdmin: true,
    },
    {
      id: 2,
      email: 'johnoke@gmail.com',
      firstName: 'John',
      lastName: 'Oke',
      password: Utils.hashPassword('password'),
      type: 'staff',
      isAdmin: false,
    },
    {
      id: 3,
      email: 'boladeojo@gmail.com',
      firstName: 'Bolade',
      lastName: 'Ojo',
      password: Utils.hashPassword('password'),
      type: 'client',
      isAdmin: false,
    },
  ],
  transactions: [
    {
      transactionId: 1,
      accountNumber: 222010772,
      cashier: 1,
      transactionType: 'debit',
      accountBalance: '10000.00',
    },
    {
      transactionId: 2,
      accountNumber: 222010772,
      cashier: 1,
      transactionType: 'debit',
      accountBalance: '10000.00',
    },
    {
      transactionId: 3,
      accountNumber: 222010772,
      cashier: 1,
      transactionType: 'debit',
      accountBalance: '10000.00',
    },
  ],
};
