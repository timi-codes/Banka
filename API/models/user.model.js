import Model from './db/index.db';

class User extends Model {
  async createUser(user) {
    try {
      const { rows } = await this.insert(
        'email, firstName, lastName, type, isAdmin, password',
        '$1, $2, $3, $4, $5, $6',
        [
          user.email,
          user.firstName,
          user.lastName,
          user.type,
          user.isAdmin,
          user.password,
        ],
      );
      this.logJSON(rows[0]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email) {
    try {
      const { rows } = await this.selectWhere('id, email, firstName, lastName, password, type, isAdmin', 'email=$1', [email]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id) {
    try {
      const { rows } = await this.selectWhere('id, email, firstName, lastName, password, type, isAdmin', 'id=$1', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default User;
