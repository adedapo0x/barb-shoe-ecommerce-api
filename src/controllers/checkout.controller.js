const User = require('../models/user.model')
const Cart = require('../models/cart.model')
const Product = require('../models/products.model')
const addAddress = async (req, res) => {
    const updatedAddress = req.body
    const userId = req.user.authId

    const user = await User.findOneAndUpdate({ _id: userId }, { $set: { address: updatedAddress }}, {new: true, runValidators: true})
    console.log(user)
}

const buyWear = async (req, res) => {
    try{
        const user = req.user.authId
        const userCart = await Cart.findOne({ userId: user })

        // verifies once again that unavailable wears does not make it to checkout
        for (let i = 0; i < userCart.products.length; i++){
            let product = await Product.findOne({_id: userCart.products[i].productId})
            if (product.availability === 'false'){
                return res.status(404).json( {message: `Checkout could not be completed. ${product.name} is no longer available. Kindly remove from cart!`})
            }
        }

        // gets the order with total bill for payment
        const order = { wears: userCart.products, totalBill: userCart.totalBill}

        // logic for payment here (not implemented)

        // reduce stock of goods and give user feedback on successful purchase
        for (let i = 0; i < userCart.products.length; i++) {
            let product = await Product.findOne({_id: userCart.products[i].productId})
            let newStock = product.stock - userCart.products[i].quantity
            if (newStock === 0) product.availability = false
            product.stock = newStock
        }


        console.log(order)
    } catch (err) {
        console.log(err)
        return res.json({message: "Error encountered during checkout!"})
    }
}

module.exports = { addAddress, buyWear }