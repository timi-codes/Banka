import dummyData from './dummyData';
import Utils from '../utils/common';

export default class Transaction {
  static credit(account, amount, cashierId) {
    const userAccount = account;
    const newBalance = userAccount.balance + amount;
    userAccount.balance = newBalance;

    const newTransaction = {
      transactionId: Utils.getNextTransactionId(dummyData.transactions),
      accountNumber: account.accountNumber,
      amount,
      cashier: cashierId,
      transactionType: 'credit',
      accountBalance: newBalance.toFixed(2),
    };

    dummyData.transactions.push(newTransaction);
    return newTransaction;
  }

  static debit(account, amount, cashierId) {
    const userAccount = account;
    const newBalance = userAccount.balance - amount;
    userAccount.balance = newBalance;

    const newTransaction = {
      transactionId: Utils.getNextTransactionId(dummyData.transactions),
      accountNumber: account.accountNumber,
      amount,
      cashier: cashierId,
      transactionType: 'debit',
      accountBalance: newBalance.toFixed(2),
    };

    dummyData.transactions.push(newTransaction);
    return newTransaction;
  }
}
