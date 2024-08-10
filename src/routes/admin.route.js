const express = require('express')
const adminRouter = express.Router()
const verifyJWT = require("../middlewares/verifyJWT")
const verifyAdminStatus = require('../middlewares/verifyAdminStatus')
const getAllUsers = require('../controllers/admin.controller')
const httpLogin = require('../controllers/auth.controller')

adminRouter.use(verifyJWT)
adminRouter.use(verifyAdminStatus)

adminRouter.post('/admin/auth/login', httpLogin)
adminRouter.get('/get-users', getAllUsers)


module.exports = adminRouter