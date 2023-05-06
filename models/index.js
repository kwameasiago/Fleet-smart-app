'use strict'

import { readdirSync } from 'fs'
import path, { basename as _basename, join } from 'path'
import Sequelize from 'sequelize';
import configs from '../config/config'
const basename = _basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = configs[`${env}`]
const db = {}

let sequelize
if (config.use_env_variable) {
    sequelize = new Sequelize(config.use_env_variable, {
        define: {
            freezeTableName: true
        },
        logging: false,
    })
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config)
}

readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file)).default(sequelize, Sequelize.DataTypes);

        db[model.name] = model
    })

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db