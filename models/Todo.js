const Sequelize = require('sequelize')
const db = require('../configureDB')
const User = require('./User')

const Todo = db.define('todo', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    }
})

Todo.belongsTo(User)

module.exports = Todo