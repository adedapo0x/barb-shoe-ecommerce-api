const express = require('express')
const adminRouter = express.Router()
const verifyJWT = require("../middlewares/verifyJWT")
const verifyAdminStatus = require('../middlewares/verifyAdminStatus')
const getAllUsers = require('../controllers/admin.controller')
const httpLogin = require('../controllers/auth.controller')
const { addWears } = require('../controllers/products.controller')

adminRouter.post('/auth/login', httpLogin)

adminRouter.use(verifyJWT)
adminRouter.use(verifyAdminStatus)


adminRouter.get('/get-users', getAllUsers)
adminRouter.post('/add-wears', addWears)
adminRouter.get('/show-all-wears')



module.exports = adminRouter