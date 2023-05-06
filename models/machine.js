'use strict';

import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
  class Machines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Machines.hasMany(models.Parts, {foreignKey: 'machineId'});
      Machines.hasMany(models.Services, {foreignKey: 'machineId'});
    }
  }
  Machines.init({
    name: DataTypes.STRING,
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    identifier: DataTypes.STRING,
    isDelete: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Machines',
  });
  return Machines;
};