import Account from '../models/account.model';
import User from '../models/user.model';


/** service that allows user create bank account, delete bank account */
class AccountService {
  /**
   * @description Create a new user
   * @param {object} a new user object
   */

  static createAccount(userId, type, balance) {
    const user = User.findUserById(userId); // check if user alredy exist

    if (user) {
      // check if user already has a bank account
      const account = Account.findAccountByOwner(userId);
      if (account) {
        throw new Error(`user already have an account - ${account.accountNumber}`);
      }

      // create a new bank account
      const newAccount = Account.create({
        owner: userId,
        type,
        balance,
      });

      return {
        accountNumber: newAccount.accountNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type,
        balance,
      };
    }
    throw new Error('user doesn\'t exist');
  }

  /**
   * @description it fetches all accounts
   * @param {array} of user objects
   */
  static getAllAccounts() {
    return Account.findAll().map((account) => {
      const { owner, ...data } = account;

      const user = User.findUserById(owner);

      return {
        ...data,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
    });
  }

  /**
   * @description this function change account status
   * @param {object} response
   */
  static changeAccountStatus(accountNumber, status) {
    const foundAccount = Account.findByAccountNumber(Number(accountNumber));

    if (foundAccount) {
      const account = Account.update(foundAccount, status);
      return {
        accountNumber: account.accountNumber,
        status,
      };
    }
    throw new Error('account number doesn\'t exist');
  }

  /**
   * @description fetches all accounts
   * @param {object} response
   */
  static deleteAccount(accountNumber) {
    const foundAccount = Account.findByAccountNumber(Number(accountNumber));

    if (foundAccount) {
      const isDeleted = Account.delete(foundAccount);

      if (isDeleted) {
        return 'Account successfully deleted';
      }
    }
    throw new Error('account number doesn\'t exist');
  }
}


export default AccountService;
