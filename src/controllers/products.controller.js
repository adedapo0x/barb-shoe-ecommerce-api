const Product = require('../models/products.model')

const addWears = async (req, res) =>{
    try{
        const wears = new Product(...req.body)
        await wears.save()
        return res.json({status: "Success", message: `Product (${wears.name}) added to store successfully!`})
    } catch (e){

        console.log(e)
        return res.status(401).json({status: "Failed", message: "Unable to add wear to store!"})
    }

}