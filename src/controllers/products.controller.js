const Product = require('../models/products.model')
const { validationResult } = require('express-validator')
const addWears = async (req, res) =>{
    try{
        const name  = req.body.name
        const existingWears = await Product.findOne({ name })
        if (existingWears) return res.status(500).json({message: "Footwear already in inventory. Try updating stock if necessary"})

        const wears = new Product({...req.body})
        await wears.save()
        return res.json({status: "Success", message: `Product (${wears.name}) added to store successfully!`})
    } catch (e){
        console.log(e)
        return res.status(401).json({status: "Failed", message: "Unable to add wear to store!"})
    }
}

const filterWears = async (req, res) =>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()})
        }
        // create query object used to filter DB
        const queryObj = {}
        // checks query for keys that are present and add them to queryObj for search operation in DB
        if (req.query.category) queryObj.category = req.query.obj
        if (req.query.minPrice || req.query.maxPrice){
            queryObj.price = {}
            if (req.query.minPrice) queryObj.price.$gte = parseFloat(req.query.minPrice)
            if (req.query.maxPrice) queryObj.price.$lte = parseFloat(req.query.maxPrice)
        }
        const sort = {}
        if (req.query.sort === 'price_asc') sort.price = 1
        if (req.query.sort === 'price_desc') sort.price = -1

        // create filtered wears
        const products =  await Product.find(queryObj).sort(sort)
        return res.json({status: "Successful", data: products})
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Error encountered."})
    }
}

const findWears = async (req, res) =>{
    try{
        // gets sought after wear(s)
        const searchObj = {}
        if (req.body.name) searchObj.name = req.body.name
        else if (req.body.category) searchObj.category = req.body.category
        else if (req.body.availability) searchObj.availability = req.body.availability
        else if (req.body.stock) searchObj.stock = req.body.stock

        const wears = await Product.findOne(searchObj)
        console.log(searchObj.name)
        return res.json({data: wears})
    } catch (e) {
        console.log(e)
        return res.status(401).json({status: "Unsuccessful", message: "Error encountered, please edit search fields and try again!"})
    }
}

const editOrUpdateWears = async(req, res) => {
    try{
        const { name, category, price, stock, description, availability } = req.body

        // allow for case insensitive search of footwear name
        const nameRegex = new RegExp(name, 'i')

        // name is the unique key that represents distinct wears in this scenario
        const wearToBeUpdated = await Product.findOne({ name: nameRegex })

        if (!wearToBeUpdated) return res.status(400).json({message: "Foot wear not in inventory. Please check name again"})

        // constructing update object based on what changed
        const updateObj = {}

        // compare request body against fetched document to know which fields were updated and update as necessary
        if (category !== wearToBeUpdated.category) updateObj.category = category
        if (price !== wearToBeUpdated.price) updateObj.price = price
        if (stock !== wearToBeUpdated.stock) updateObj.stock = stock
        if (description !== wearToBeUpdated.description) updateObj.description = description
        if (availability !== wearToBeUpdated.availability) updateObj.availability = availability

        // check if anything changed i.e updateObj is no longer empty
        // if so then we update accordingly
        if (Object.keys(updateObj).length !== 0){
            const updatedWear = await Product.findOneAndUpdate({name}, {$set: updateObj }, {new: true, runValidators: true})
            return res.json({status: "Successful", message: "Update completed successfully"})
        } else res.json({message: "No changes detected!"})
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: "Update failed! Please try again"})
    }
}

const displayAllWears = async(req, res) => {
    try{
        const distinctCategories = await Product.distinct('category', {availability: true})
        const wears = await Product.aggregate([
            { $match: { category : {$in: distinctCategories }}},
            { $group: { _id: '$category', count: { $sum: 1 }, goods: { $push: '$$ROOT'} }}
        ])
        return res.json({data: wears})
    } catch (e) {
        console.log(e)
        return res.status(404).json({message: "Error loading page"})
    }
}

module.exports = {addWears, filterWears, findWears, editOrUpdateWears, displayAllWears}