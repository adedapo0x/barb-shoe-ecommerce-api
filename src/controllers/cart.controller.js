const Product = require('../models/products.model')
const Cart= require('../models/cart.model')

const viewCart = async(req, res) => {
    try{
        // fetch currently logged in user id from req.id and search for user's cart from DB
        const userId  = req.user.authId
        const cart = await Cart.findOne({ userId })
        if (!cart) return res.json({message: "Cart currently empty. Add wears to view cart"})
        return res.json(cart)
    } catch (e) {
        console.log(e)
        res.status(401).json({message: "Error loading cart. Please try again"})
    }
}
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

        // check for product availability
        const available = product.availability
        if (!available){
            return res.status(400).json({message: "Product currently not available. Please try again later"})
        }

        let initQuantity, index  // get initQuantity to show user amount of same goods previously in the cart so they don't over order
        // Checks if product exists in cart
        const productIndex = userCart.products.findIndex(val => val.productId.toString() === productId)
        // if product already exists in cart, update its quantity
        if (productIndex > -1){
            initQuantity = userCart.products[productIndex].quantity
            userCart.products[productIndex].quantity += quantity
        } else {
            userCart.products.push({
                productId,
                name: product.name,
                quantity,
                price: product.price
            })
        }

        // Checks if stock is up to quantity added to cart to avoid logical errors
        // if not, returns error notifying client side that they have to reduce cart quantity
        if (userCart.products[userCart.products.length - 1].quantity > product.stock){
            return res.status(404).json({message: `Not available! We only have ${product.stock} left.`})
        } else if (productIndex !== -1 && userCart.products[productIndex].quantity > product.stock){
            return res.status(404).json({message: `Not available! We only have ${product.stock} left, you already have ${initQuantity} in your cart`})
        }

        // gets the totalBill now
        userCart.totalBill = userCart.products.reduce((acc, curr) => {
            return acc + (curr.price * curr.quantity)
        }, 0)
        await userCart.save()
        return res.json(userCart)
    } catch(err){
        console.log(err)
        return res.status(401).json({message: "Error encountered. Please try again"})
    }
}

const removeFromCart = async (req, res) => {
    try{
        const productId = req.params.productId
        const userId = req.user.authId
        const cart = await Cart.findOne({ userId })
        const updatedCart = await Cart.findOneAndUpdate({ userId }, {$pull: { products: { productId }}}, { new: true })
        if (cart.products.length === updatedCart.products.length){
            return res.json({message: "Footwear is not in cart!"})
        }
        updatedCart.totalBill = updatedCart.products.reduce((acc, curr) => {
            return acc + (curr.price * curr.quantity)
        }, 0)
        return res.json({message: "Footwear removed successfully", updatedCart})
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: "Error removing footwear from cart. Please try again later"})
    }
}

const clearCart = async(req, res) => {
    try{
        const userId = req.user.authId
        await Cart.deleteOne({ userId })
        res.json({message: "Cart cleared successfully"})
    } catch (e) {
        console.log(e)
        return res.status(404).json({status: "Failed", message: "Action failed. Try to clear cart again"})
    }
}

module.exports = { addToCart, clearCart, viewCart, removeFromCart }