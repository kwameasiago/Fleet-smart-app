'use strict';

import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
  class ServicesRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ServicesRoles.hasMany(models.UserService, {foreignKey: 'servicesRolesId'});
    }
  }
  ServicesRoles.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isDelete:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'ServicesRoles',
  });
  return ServicesRoles;
};