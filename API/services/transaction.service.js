import Transaction from '../models/transaction.model';
import Account from '../models/account.model';


/** service that allows cashier perform transaction of user's account */
class TransactionService {
  /**
   * @description debit user account
   * @param {object} a new transaction object
   */

  static debitAccount(cashierId, accountNumber, amount) {
    const account = Account.findByAccountNumber(Number(accountNumber));

    if (account) {
      if (account.balance > amount) {
        const transaction = Transaction.debit(account, amount, cashierId);
        return transaction;
      }
      throw new Error('account balance is not sufficient');
    }
    throw new Error('account number doesn\'t exist');
  }

  /**
   * @description credit user account
   * @param {object} a new transaction object
   */

  static creditAccount(cashierId, accountNumber, amount) {
    const account = Account.findByAccountNumber(Number(accountNumber));

    if (account) {
      const transaction = Transaction.credit(account, amount, cashierId);
      return transaction;
    }
    throw new Error('account number doesn\'t exist');
  }
}


export default TransactionService;
