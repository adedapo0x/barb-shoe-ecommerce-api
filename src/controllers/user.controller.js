const User = require('../models/user.model')
const { validationResult} = require("express-validator");
const httpRegister = async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json( {errors: errors.array()} )
        }

        const { firstName, lastName, email, password } = req.body

        // check if email already exists
        const existingUser = await User.findOne({ normalizedEmail: email })
        if (existingUser) return res.status(400).json({message: "Email already exists!"})

        // if there are no pre-existing user with inputted email, create new user and save to DB
        const user = new User({firstName, lastName,
            originalEmail: email,
            password})
        await user.save()

        return res.status(200).json({message: "Congratulations! Your registration was successful"})
    } catch (e){
        console.log(e)
        return res.status(500).json({message: "Server error"})
    }
}



module.exports = httpRegister