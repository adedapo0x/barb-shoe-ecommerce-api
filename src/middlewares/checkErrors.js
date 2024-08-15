const {body, query} = require("express-validator");

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

module.exports = { checkInputErrors, checkQueryError }