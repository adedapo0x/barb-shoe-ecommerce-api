const express = require("express")
const userRouter = express.Router()
const httpRegister = require('../controllers/user.controller')
const httpLogin = require('../controllers/auth.controller')

const { body } = require("express-validator")
const checkErrors = [
    body('firstName').notEmpty().trim(),
    body('lastName').notEmpty().trim(),
    body('email').isEmail(),
    body('password').notEmpty().custom((value, {req} ) => {
        if (value !== req.body.confirmPassword) throw new Error('Passwords do not match!')
        return true
    })]

userRouter.post('/register', checkErrors, httpRegister)
userRouter.post('/auth/login', httpLogin)
userRouter.post('/', (req, res) => res.send("Heyy there"))

module.exports = userRouter