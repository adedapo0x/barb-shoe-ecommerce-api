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

// userRouter.use(verifyJWT)

userRouter.get('/cart/view', verifyJWT, viewCart)
userRouter.post('/cart/add', verifyJWT,addToCart)
userRouter.patch('/cart/remove/:productId', verifyJWT, removeFromCart)
userRouter.delete('/cart/clear', verifyJWT, clearCart)
userRouter.patch('/update/address', verifyJWT, addAddress)
userRouter.post('/confirm/order', verifyJWT, buyWear)


module.exports = userRouter