const User = require('../models/user.model')
const { validationResult } = require('express-validator')

const createAdmin = async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const { firstName, lastName, email, password } = req.body

        const existingAdmin = await User.findOne({ normalizedEmail: email })
        if (existingAdmin) return res.status(400).json({message: "Admin already exists!"})

        // if no pre-existing admin
        const newAdmin = new User({
            firstName, lastName, originalEmail: email, password,
            role: 'admin'
        })
        await newAdmin.save()
        return res.json({status: "Successful", message: "New admin added successfully"})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Error encountered while creating new admin. Please try again later"})
    }
}
const getAllUsers = async (req, res) =>{
    try{
        const allUsers = await User.find({}, "-password")
        return res.json({data: allUsers})
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: "Error encountered. Please try again"})
    }
}

module.exports = { getAllUsers, createAdmin }
