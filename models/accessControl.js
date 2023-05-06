'use strict';

import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
  class AccessControl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AccessControl.belongsTo(models.AccessDefinitions, {foreignKey: 'definitionId'});
      AccessControl.belongsTo(models.Accounts, {foreignKey: 'accountId'});
    }
  }
  AccessControl.init({
    accountId: DataTypes.INTEGER,
    definitionId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'AccessControl',
  });
  return AccessControl;
};
