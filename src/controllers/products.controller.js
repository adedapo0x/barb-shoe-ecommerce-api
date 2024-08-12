const Product = require('../models/products.model')
const { validationResult } = require('express-validator')
const addWears = async (req, res) =>{
    try{
        const name  = req.body.name
        const existingWears = await Product.findOne({ name })
        if (existingWears) return res.status(500).json({message: "Footwear already in inventory. Try updating stock if necessary"})

        const wears = new Product({...req.body})
        console.log(wears)
        await wears.save()
        return res.json({status: "Success", message: `Product (${wears.name}) added to store successfully!`})
    } catch (e){
        console.log(e)
        return res.status(401).json({status: "Failed", message: "Unable to add wear to store!"})
    }
}

const getWears = async (req, res) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    const queryObj = {}
    if (req.query.category) queryObj.category = req.query.obj




}


module.exports = {addWears, getWears}