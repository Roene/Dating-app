// BRON : https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122
const jwt = require('jsonwebtoken')
const User = require('../model/user')

const auth = async (req, res) => {
    const token = req.header('Authorization').replaceWith('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch {
        res.status(401).send({ error: "Geen toegang" })
    }
}

module.exports = auth