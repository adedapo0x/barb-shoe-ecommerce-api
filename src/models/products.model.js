const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, min: 2, unique: true},
    category: String,
    price: {type: Number, required: true},
    stock: {type: Number, required: true, default: 1},
    availability: {type: Boolean, default: true},
    description: String
})

module.exports = mongoose.model('Product', productSchema)