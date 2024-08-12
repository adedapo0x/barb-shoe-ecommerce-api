const User = require('../models/user.model')

const createAdmin = async (req, res) => {
    try{

    } catch (e) {

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

module.exports = getAllUsers
