const Sequelize = require('sequelize')

const db = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: 'database.sqlite'
})

module.exports = db