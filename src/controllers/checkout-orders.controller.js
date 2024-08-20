const User = require('../models/user.model')
const addAddress = async (req, res) => {
    const updatedAddress = { ...req.body }
    const userId = req.user.authId

    const user = await User.findOneAndUpdate({ _id: userId }, { $set: { address: updatedAddress }}, {new: true, runValidators: true})
    console.log(user)
}

module.exports = addAddress



