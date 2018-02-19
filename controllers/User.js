const fs = require('fs')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('../utils/jwt')

module.exports = app => {

    app.post('/register', async (req, res) => {
        const { email, password } = req.body

        if (!email || !password || password.length < 6) {
            res.status(400).send()
            return
        }

        const userWithEmail = await User.findOne({
            where: { email }
        })

        if (userWithEmail) {
            res.status(400).send()
            return
        }

        const stored_password = await bcrypt.hash(password, 10)

        const user = await User.create({
            email,
            password: stored_password
        })

        res.status(200).send()
    })

    app.post('/login', async (req, res) => {
        const { email, password } = req.body

        const user = await User.findOne({
            where: {
                email,
            }
        })

        if (!user) {
            res.status(401).send()
            return
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            res.status(401).send()
            return
        }

        const token = jwt.gen(user.id)

        res.status(200).send({
            token,
            user
        })
    })
    
}