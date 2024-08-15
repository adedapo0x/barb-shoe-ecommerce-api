const express = require("express")
const userRouter = express.Router()
const httpRegister = require('../controllers/user.controller')
const httpLogin = require('../controllers/auth.controller')
const verifyJWT = require('../middlewares/verifyJWT')
const { filterWears, displayAllWears } = require('../controllers/products.controller')
const { addToCart } = require('../controllers/cart.controller')

const { body, query } = require("express-validator")
const checkInputErrors = [
    body('firstName').notEmpty().trim(),
    body('lastName').notEmpty().trim(),
    body('email').isEmail(),
    body('password').notEmpty().custom((value, {req} ) => {
        if (value !== req.body.confirmPassword) throw new Error('Passwords do not match!')
        return true
    })]

const checkQueryError = [
    query('category').optional().isString().trim(),
    query('minPrice').optional().isInt({min: 0}),
    query('maxPrice').optional().isInt({min: 0}),
    query('sort').optional().isIn(['price_asc', 'price_desc'])
]

userRouter.get('/', displayAllWears)
userRouter.get('/get-wears', checkQueryError, filterWears)
userRouter.post('/register', checkInputErrors, httpRegister)
userRouter.post('/auth/login', httpLogin)

userRouter.use(verifyJWT)

userRouter.post('/add-to-cart', verifyJWT,addToCart)



module.exports = userRouter