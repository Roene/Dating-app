const mongoose  = require('mongoose')
const bcrypt    = require('bcrypt')
const jwt       = require('jsonwebtoken')

// Make schema and tell how we send it to the database.
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    }, 
    surname: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: true
    }, 
    gender: {
        type: String,
        required: true
    }, 
    club: {
        type: String,
        required: true
    }, 
    image: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }, 
    searchGender: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: false
    }, 
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
})

// SOURCE : https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122
// This code is running bevore we save the object to the database. Here we hash the password with the package bcrypt.
userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// Here we create a token with JWT. The sign expects data that will be used to sign the token. 
// Once the token created save it to the list of tokens and return the token. 
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign ({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

// Here we search for the User we expext 2 parameters email & password. First search for the user by email, if we can't find it throw an error.
// If it is found we compare the password with the hashed password in the database. 
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error({ error: 'Geen geldig emailadres gevonden in de database' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Wachtwoord klopt niet' })
    }
    return user
}

// Here we create the model called User and bind it to the userSchema then we export it. 
const User = mongoose.model('User', userSchema)

module.exports = User