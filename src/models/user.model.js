const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

function normalizeEmail(data){
    const lowerTrimmedEmail = data.toLowerCase().trim();
    const splitEmail = lowerTrimmedEmail.split('@')
    const removedPlusAndDot = splitEmail[0].split('+')[0].replaceAll('.','')
    return removedPlusAndDot + '@' + splitEmail[1]
}

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true, min:2},
    lastName: {type: String, required: true, min: 2},
    normalizedEmail: {type: String,required: true, unique: true},
    originalEmail: {type: String, required: true},
    password: {type: String, required: true},
    address: {
        type: {
            street1: { type: String, required: true }, street2: String, city: { type: String, required: true },
            state: { type: String, required: true}, country: { type: String, required: true }
        },
        required: false
    },
    role: {
        type: String,
        enum: ['admin', 'client'],
        default: 'client'
    }
})

UserSchema.index({ normalizedEmail: 1 }, { unique: true })
UserSchema.index({ originalEmail: 1 })

UserSchema.pre('validate', function(next) {
    this.normalizedEmail = normalizeEmail(this.originalEmail)
    next()
})
UserSchema.pre('save', async function(next){
    try{
        if (!this.isModified("password")) next()
        // generate password hash
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (e) {
        console.log("Error encountered: ", e)
    }
})

module.exports = mongoose.model("User", UserSchema)

