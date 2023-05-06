'use strict';

import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
  class AccessDefinations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AccessDefinations.hasMany(models.AccessControl, {foreignKey: 'definationId'});
    }
  }
  AccessDefinations.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'AccessDefinations',
  });
  return AccessDefinations;
};
