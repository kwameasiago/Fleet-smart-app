'use strict';

import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserService.belongsTo(models.Services, {foreignKey: 'servicesId'});
      UserService.belongsTo(models.User, {foreignKey: 'userId'});
      UserService.belongsTo(models.ServicesRoles, {foreignKey: 'servicesRolesId'})
    }
  }
  UserService.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isDelete:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    servicesId: DataTypes.INTEGER,
    servicesRolesId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'UserService',
  });
  return UserService;
};