import moment from 'moment';
import dummyData from './dummyData';
import Utils from '../utils/common';

export default class Account {
  static create(account) {
    const newId = Utils.getNextId(dummyData.accounts);

    const newAccount = account;
    newAccount.id = newId;
    newAccount.accountNumber = Utils.generateAccountNumber(dummyData.accounts);
    newAccount.createdOn = moment();
    newAccount.status = 'dormant';

    dummyData.accounts.push(newAccount);
    return newAccount;
  }

  static findAll() {
    return dummyData.accounts;
  }

  static findByAccountNumber(accountNumber) {
    const source = dummyData.accounts;
    const foundAccount = source.find(account => account.accountNumber === accountNumber);
    return foundAccount;
  }

  static findAccountByOwner(id) {
    const foundAccount = dummyData.accounts.find(account => account.owner === id);
    return foundAccount;
  }

  static update(account, status) {
    const userAccount = account;
    userAccount.status = status;
    return userAccount;
  }

  static delete(account) {
    const userAccount = account;
    const index = dummyData.accounts.indexOf(userAccount);
    if (index > -1) {
      dummyData.accounts.splice(index, 1);
      return true;
    }
    return false;
  }
}
