const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true, min:2},
    lastName: {type: String, required: true, min: 2},
    normalizedEmail: {type: String, required: true, unique: true},
    originalEmail: {type: String, required: true},
    password: {type: String, required: true},
    address: {
        street1: {type: String, required: true},
        street2: String,
        city: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true}
    },
    role: {
        type: String,
        enum: ['admin', 'client'],
        default: 'client'
    }
})

UserSchema.index({ normalizedEmail: 1 }, { unique: true })
UserSchema.index({ originalEmail: 1 })

UserSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (e) {
        console.log("Error encountered: ", e)
    }
})

module.exports = mongoose.model("users", UserSchema)

