import Model from './db/index.db';

export default class Transaction extends Model {
  async credit(account, amount, cashierId) {
    const userAccount = account;
    const newBalance = parseFloat(userAccount.balance) + amount;

    try {
      const { rows } = await this.insert('accountNumber, cashier, transactionType, amount, oldbalance, newbalance', '$1, $2, $3, $4, $5, $6', [
        Number(account.accountnumber),
        cashierId,
        'credit',
        amount,
        userAccount.balance,
        newBalance,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async debit(account, amount, cashierId) {
    const userAccount = account;
    const newBalance = parseFloat(userAccount.balance) - amount;

    try {
      const { rows } = await this.insert('accountNumber, cashier, transactionType, amount, oldbalance, newbalance', '$1, $2, $3, $4, $5, $6', [
        Number(account.accountnumber),
        cashierId,
        'credit',
        amount,
        userAccount.balance,
        newBalance,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getTransactions(accountNumber) {
    try {
      const { rows } = await this.selectWhere(
        'id, createdOn, transactiontype, accountNumber, amount, oldBalance, newBalance',
        'accountNumber=$1',
        [accountNumber],
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
}
