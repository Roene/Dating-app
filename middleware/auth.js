// SOURCE: https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122
const jwt   = require('jsonwebtoken')
// OWN FILES
const User  = require('../model/user')

// This code checks if token is valid. The JWT verify returns a payload, now we have the payload that we can find the user id
// and we store the user request (req.user = user).
const auth = async (req, res, next) => {
    try {
        // SOURCE: https://github.com/LaupWing/Project-Tech/blob/master/App/routes/auth.js
        const cookie = req.get('cookie')
        const token = cookie
            .split(';')
            .find(c => c.includes('dating_token='))
            .trim()
            .split('dating_token=')
            .filter(x => x!=='')[0]
        // END OF SOURCE
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (err) {
        res.status(401).send("Geen toegang, u bent niet ingelogd")
    }
}

module.exports = auth