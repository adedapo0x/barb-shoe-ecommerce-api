const express = require('express')
const adminRouter = express.Router()
const verifyAdminStatus = require('../middlewares/verifyAdminStatus')

adminRouter.use(verifyAdminStatus)


module.exports = adminRouter