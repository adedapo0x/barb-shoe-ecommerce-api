const Product = require('../models/products.model')
const Cart= require('../models/cart.model')

const addToCart = async (req, res) => {
    try{
        const userId = req.user.authId
        const { productId, quantity } = req.body
        const product = await Product.findById({_id: productId})
        if (!product) return res.status(400).json({message: "Product not found!"})

        // checks if cart exist already for user if not, creates one for user
        let userCart = await Cart.findOne({ userId })
        if (!userCart){
            userCart = new Cart({userId, products: [], totalBill: 0})
        }

        // Checks if product exists in cart
        const productIndex = userCart.products.findIndex(val => val.productId.toString() === productId)
        // if product already exists in cart, update its quantity
        if (productIndex > -1){
            userCart.products[productIndex].quantity += quantity
        } else {
            userCart.products.push({
                productId,
                name: product.name,
                quantity,
                price: product.price
            })
        }

        // gets the totalBill now
        userCart.totalBill = userCart.products.reduce((acc, curr) => {
            return acc + (curr.price * curr.quantity)
        }, 0)

        console.log(userCart)
    } catch(err){
        console.log(err)
        return res.status(401).json({message: "Error encountered. Please try again"})
    }
}

module.exports = { addToCart }