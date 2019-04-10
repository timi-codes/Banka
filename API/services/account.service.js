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
}


export default AccountService;
