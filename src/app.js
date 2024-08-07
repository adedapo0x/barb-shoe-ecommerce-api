const express = require('express')
const verifyJWT = require('./middlewares/verifyJWT')
const userRoutes = require('./routes/user.route')

const app = express()

// middlewares
app.use(express.json())
app.use(verifyJWT)


// routes



module.exports = app