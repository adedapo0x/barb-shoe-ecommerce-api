const express = require('express')
const adminRouter = express.Router()
const verifyJWT = require("../middlewares/verifyJWT")
const verifyAdminStatus = require('../middlewares/verifyAdminStatus')
const checkInputErrors = require('../middlewares/checkErrors')
const { getAllUsers, createAdmin } = require('../controllers/admin.controller')
const httpLogin = require('../controllers/auth.controller')
const { addWears, findWears, displayAllWears, editOrUpdateWears } = require('../controllers/products.controller')


adminRouter.post('/auth/login', httpLogin)

adminRouter.use(verifyJWT)
adminRouter.use(verifyAdminStatus)

adminRouter.post('/create-admin', createAdmin)
adminRouter.get('/get-users', getAllUsers)
adminRouter.post('/add-wears', addWears)
adminRouter.get('/show-all-wears', displayAllWears)
adminRouter.get('/find-wears', findWears)
adminRouter.patch('/edit-wear', editOrUpdateWears)



module.exports = adminRouter