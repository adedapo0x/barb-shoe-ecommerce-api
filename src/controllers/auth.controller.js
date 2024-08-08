const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const httpLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        // check if user exists by email or if user password is correct
        const user = await User.findOne({normalizedEmail: email})
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({message: "Incorrect email or password"})
        }

        //generate JWT token for authentication
        const payload = { authId : user._id }
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'})
        return res.json({accessToken})
    } catch (err){
        console.log(err)
        
    }
}

module.exports = httpLogin