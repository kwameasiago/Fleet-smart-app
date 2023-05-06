'use strict';

import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
  class Services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Services.belongsTo(models.Machines, {foreignKey: 'MachineId'});
      Services.belongsTo(models.Parts, {foreignKey: 'PartId'});
    }
  }
  Services.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isDelete: DataTypes.BOOLEAN,
    MachineId: DataTypes.INTEGER,
    PartId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Services',
  });
  return Services;
};