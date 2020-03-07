const express = require('express')
const router = express.Router()
const multer = require('multer')
const User = require('../model/user')
const auth = require('../middleware/auth')

const upload = multer({dest: 'static/upload/'})

router
    .get('/signup', (req, res) => res.render('pages/signup'))
    .get('/login', (req, res) => res.render('pages/login'))
    .get('/dashboard', (req, res) => res.render('pages/dashboard'))
    // BRON : https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122
    .post('/login', async (req, res) => {
        try {
            const { email, password} = req.body
            const user = await User.findByCredentials(email, password)
            if (!user) {
                res.status(401).send({ error: 'Login klopt niet' })
            }
            const token = await user.generateAuthToken()
            res.send( { user, token })
        } catch (err) {
            res.status(400).send(err)
        }
    })
    .post('/signup', upload.single('cover'), async (req, res) => {
        const {
            firstname,
            surname,
            age,
            gender,
            club,
            email,
            password,
            searchGender,
            description
        } = req.body

        const user = new User({
            firstname,
            surname,
            age,
            gender,
            club,
            email,
            password,
            searchGender,
            description
        })
        try {
            await user.save()
            const token = await user.generateAuthToken()
            res.redirect('/')
        } catch (err) {
            res.status(400).send(err)
        }
    })

module.exports = router