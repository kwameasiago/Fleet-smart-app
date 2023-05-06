'use strict';

import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
  class ServicesRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ServicesRole.belongsTo(models.Services, {foreignKey: 'servicesId'});
    }
  }
  ServicesRole.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isDelete: DataTypes.BOOLEAN,
    servicesId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Services',
  });
  return ServicesRole;
};