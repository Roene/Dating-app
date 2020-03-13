const express   = require('express')
const router    = express.Router()
const multer    = require('multer')
const User      = require('../model/user')
const auth      = require('../middleware/auth')
const ObjectId  = require('mongodb').ObjectID

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
                res.status(401).send('U heeft geen toegang')
            }
            const token = await user.generateAuthToken()
            res.cookie('dating_token', token, {
                maxAge: (24*7) * 60 * 60 * 1000
            })
            res.redirect('dashboard')
        } catch (err) {
            res.status(400).send('Email of wachtwoord klopt niet')
        }
    })
    .post('/signup', upload.single('image'), async (req, res) => {
        const user = new User({
            firstname: req.body.firstname,
            surname: req.body.surname,
            age: req.body.age,
            gender: req.body.gender,
            club: req.body.club,
            image: req.file ? req.file.filename : null,
            email: req.body.email,
            password: req.body.password,
            searchGender: req.body.searchGender,
            description: req.body.description
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
    .get('/dashboard', auth, async (req, res) =>  {
        try {
            const users = await User.find({ _id: {$ne: req.user._id} }).lean()
            res.render('pages/dashboard', {users})
            console.log({users})
        } catch (err) {
            console.log(err)
            res.status(500).send('Er ging iets mis op de server')
        }
    })
    .get('/profile', auth, (req, res) => {
        try {
            const user = req.user
            res.render('pages/profile', {user})
        } catch (err) {
            res.status(500).send('Er ging iets mis server')
        }
    })
    .post('/delete', auth, async (req, res) => {
        try {
            const user = req.user
            await user.remove()
            res.status(204).redirect('/')
        } catch (err) {
            res.status(500).send('Er ging iets niet goed met verwijderen')
        }
    })

module.exports = router