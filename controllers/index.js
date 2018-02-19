const Todo = require('./Todo')
const User = require('./User')

module.exports = app => {
    Todo(app)
    User(app)
}