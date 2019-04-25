import TransactionModel from '../models/transaction.model';
import AccountModel from '../models/account.model';

const Account = new AccountModel('accounts');
const Transaction = new TransactionModel('transactions');


/** service that allows cashier perform transaction of user's account */
class TransactionService {
  /**
   * @description debit user account
   * @param {object} a new transaction object
   */

  static async debitAccount(cashierId, accountNumber, amount) {
    try {
      const account = await Account.findByAccountNumber(Number(accountNumber));

      if (account) {
        if (account.balance >= amount) {
          const transaction = await Transaction.debit(account, amount, cashierId);
          return {
            transactionId: transaction.id,
            accountNumber: Number(transaction.accountnumber),
            amount,
            cashier: transaction.cashier,
            transactionType: transaction.transactiontype,
            accountBalance: transaction.newbalance,
          };
        }
        throw new Error('account balance is not sufficient');
      }
      throw new Error('account number doesn\'t exist');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description credit user account
   * @param {object} a new transaction object
   */

  static async creditAccount(cashierId, accountNumber, amount) {
    try {
      const account = await Account.findByAccountNumber(Number(accountNumber));

      if (account) {
        const transaction = await Transaction.credit(account, amount, cashierId);
        return {
          transactionId: transaction.id,
          accountNumber: Number(transaction.accountnumber),
          amount,
          cashier: transaction.cashier,
          transactionType: transaction.transactiontype,
          accountBalance: transaction.newbalance,
        };
      }
      throw new Error('account number doesn\'t exist');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description this function fetches a user account's account transactions
   * @param {object} response
   */
  static async getAllTransactions(accountNumber) {
    try {
      const foundAccount = await Account.findByAccountNumber(accountNumber);

      if (foundAccount) {
        const transactions = await Transaction.getTransactions(Number(foundAccount.accountnumber));
        const outputs = [];

        const promises = transactions.map(async (transaction) => {
          const {
            id, transactiontype, accountnumber, createdon, oldbalance, newbalance, ...data
          } = transaction;

          outputs.push({
            transactionId: transaction.id,
            createdOn: createdon,
            type: transactiontype,
            accountNumber: accountnumber,
            ...data,
            oldBalance: oldbalance,
            newBalance: newbalance,
          });
        });

        await Promise.all(promises);

        return outputs;
      }
      throw new Error('account number doesn\'t exist');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description this function fetches a single user transaction
   * @param {object} response
   */
  static async getTransaction(transactionId) {
    try {
      const transaction = await Transaction.getTransactionById(transactionId);

      if (transaction) {
        const {
          id, transactiontype, accountnumber, createdon, oldbalance, newbalance, ...data
        } = transaction;

        return {
          transactionId: id,
          createdOn: createdon,
          type: transactiontype,
          accountNumber: accountnumber,
          ...data,
          oldBalance: oldbalance,
          newBalance: newbalance,
        };
      }
      throw new Error('transaction id doesn\'t exist');
    } catch (error) {
      throw error;
    }
  }
}
export default TransactionService;
