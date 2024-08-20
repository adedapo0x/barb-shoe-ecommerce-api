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

const checkAddressErrors = [
    body('street1').notEmpty().isString().trim(),
    body('street2').optional().isString().trim(),
    body('city').notEmpty().isString().trim(),
    body('state').notEmpty().isString(),
    body('country').notEmpty().isString()
]

module.exports = { checkInputErrors, checkQueryError, checkAddressErrors }