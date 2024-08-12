const express = require('express')
const userRouter = require('./routes/user.route')
const adminRouter = require('./routes/admin.route')

const app = express()

// middlewares
app.use(express.json())

// routes
app.use("/admin", adminRouter)
app.use(userRouter)

app.use('/*', (req, res) =>{
    return res.status(404).json({message: "Page Not Found!"})
})



module.exports = app
