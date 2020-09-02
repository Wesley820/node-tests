import Sequelize, { Model } from 'sequelize';
import bacrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password = await bacrypt.hash(user.password, 10);
      }
    });

    return this;
  }
}

export default User;
