const fs = require('fs')
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const jwtMiddleware = require('express-jwt')

const router = require('./controllers')
const db = require('./configureDB')
const config = JSON.parse(fs.readFileSync(path.join(__dirname, './config.json')))

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(jwtMiddleware({
    secret: config.jwt.secret
}).unless({
    path: [ '/login', '/register' ]
}))

router(app)

async function init() {
    console.log(__dirname)
    await db.sync()
    const server = app.listen(8000, () => {
        console.log('App listening on port ' + server.address().port)
    })
}

init()