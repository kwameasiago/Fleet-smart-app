'use strict';

import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
  class Accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Accounts.hasOne(models.User, {foreignKey: 'accountId'});
      Accounts.hasMany(models.AccessControl, {foreignKey: 'accountId'})
    }
  }
  Accounts.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Accounts',
  });
  return Accounts;
};
