const moment = require('moment')
const fs = require('fs')
const path = require('path')
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json')))
const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
    gen(userId) {
        const exp = moment().add(7, 'days').valueOf()
        return jwt.sign({
            user_id: 1,
            exp
        }, config.jwt.secret)
    }
}