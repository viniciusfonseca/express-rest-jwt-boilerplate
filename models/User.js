const Sequelize = require('sequelize')
const db = require('../configureDB')

const User = db.define('user', {
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
})

Object.assign(User.prototype, {
    getInfo() {
        
    }
})

module.exports = User