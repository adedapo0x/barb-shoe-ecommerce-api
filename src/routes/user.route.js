const express = require("express")
const userRouter = express.Router()
const httpRegister = require('../controllers/user.controller')
const httpLogin = require('../controllers/auth.controller')
const verifyJWT = require('../middlewares/verifyJWT')
const { filterWears, displayAllWears } = require('../controllers/products.controller')
const { addToCart, clearCart, viewCart, removeFromCart } = require('../controllers/cart.controller')
const { addAddress, buyWear} = require('../controllers/checkout.controller')
const { checkQueryError , checkInputErrors } = require('../middlewares/checkErrors')

// Routes

userRouter.get('/', displayAllWears)
userRouter.get('/get-wears', checkQueryError, filterWears)
userRouter.post('/register', checkInputErrors, httpRegister)
userRouter.post('/auth/login', checkInputErrors, httpLogin)

userRouter.use(verifyJWT)

userRouter.get('/cart/view', viewCart)
userRouter.post('/cart/add', addToCart)
userRouter.patch('/cart/remove/:productId', removeFromCart)
userRouter.delete('/cart/clear', clearCart)
userRouter.patch('/update/address', addAddress)
userRouter.post('/confirm/order', buyWear)



module.exports = userRouter