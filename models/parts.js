'use strict';

import {Model} from 'sequelize';

export default (sequelize, DataTypes) => {
  class Parts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Parts.belongsTo(models.Machines, {foriegnKey: 'MachineId'});
        Parts.hasMany(models.Services, {foriegnKey: 'PartId'});
    }
  }
  Parts.init({
    name: DataTypes.STRING,
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    identifier: DataTypes.STRING,
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
     },
     MachineId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Parts',
  });
  return Parts;
};