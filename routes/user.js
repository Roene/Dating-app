const express   = require('express')
const router    = express.Router()
const multer    = require('multer')
const User      = require('../model/user')
const auth      = require('../middleware/auth')

const upload    = multer({dest: 'static/upload/'})

router
    .get('/', (req, res) => { res.render('pages/index') })
    .get('/signup', (req, res) => { res.render('pages/signup') })
    .get('/login', (req, res) => { res.render('pages/login') })
    // BRON : https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122
    .post('/login', async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findByCredentials(email, password)
            if (!user) {
                res.status(401).send({ error: 'Email of wachtwoord klopt niet' })
            }
            const token = await user.generateAuthToken()
            res.cookie('dating_token', token, {
                maxAge: (24*7) * 60 * 60 * 1000
            })
            res.redirect('dashboard')
            console.log( { user, token })
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
            res.cookie('dating_token', token, {
                maxAge: (24*7) * 60 * 60 * 1000 // 7 Days because it is in milliseconds
            })
            res.redirect('/')
        } catch (err) {
            res.status(400).send(err)
        }
    })
    .get('/logout', auth, async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token
            })
            await req.user.save()
            res.clearCookie('dating_token')
            res.redirect('/')
        } catch (err) {
            res.status(500).send(err)
        }
    })
    .get('/dashboard', auth, (req, res) =>  {
            res.render('pages/dashboard', {
                user: { firstname: req.body.firstname }
        })
    })

module.exports = router