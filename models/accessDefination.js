'use strict';

import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
  class AccessDefinitions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AccessDefinitions.hasMany(models.AccessControl, {foreignKey: 'definitionId'});
    }
  }
  AccessDefinitions.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    group: DataTypes.STRING,
    isDelete: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'AccessDefinitions',
  });
  return AccessDefinitions;
};
