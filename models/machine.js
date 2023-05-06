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
      Machines.hasMany(models.Parts, {foreignKey: 'MachineId'});
      Machines.hasMany(models.Services, {foreignKey: 'MachineId'});
    }
  }
  Machines.init({
    name: DataTypes.STRING,
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    identifier: DataTypes.STRING,
    isDelete: {
     type: DataTypes.BOOLEAN,
     defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Machines',
  });
  return Machines;
};