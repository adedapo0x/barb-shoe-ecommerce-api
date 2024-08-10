const momgoose = require('mongoose')
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: String,
    price: {type: String, required: true},
    stock: {type: Number, required: String},
    description: String
})