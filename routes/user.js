const express   = require('express')
const router    = express.Router()
const multer    = require('multer')
// OWN FILES
const User      = require('../model/user')
const auth      = require('../middleware/auth')

const storage   = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'static/upload/')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage: storage })


router
    .get('/', (req, res) => { res.render('pages/index') })
    .get('/signup', (req, res) => { res.render('pages/signup') })
    .get('/login', (req, res) => { res.render('pages/login') })
    // SOURCE : https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122
    // Login expects the user fill in an email and password, if user is found create a token and redirect the user to the dashboard. 
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
    //END OF SOURCE
    // Data send from the form to the database then generate token and redirect to dashboard. 
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
            res.redirect('dashboard')
        } catch (err) {
            res.status(400).send(err)
        }
    })
    // Logout, filter user token and return true if any tokens of is not equal to the token of the loggedin user
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
    // Render the dashboard expect with the user who is signed in. 
    .get('/dashboard', auth, async (req, res) =>  {
        try {
            const users = await User.find({ _id: {$ne: req.user._id}, club: {$in: req.user.club} }).lean()
            res.render('pages/dashboard', { users })
        } catch (err) {
            res.status(500).send(err)
        }
    })
    .get('/profile', auth, (req, res) => {
        try {
            const user = req.user
            res.render('pages/profile', { user })
        } catch (err) {
            res.status(500).send(err)
        }
    })
    .get('/profile-edit', auth, (req, res) => { 
        try {
            const user = req.user
            res.render('pages/profile-edit', { user } ) 
        } catch (err) {
            res.status(500).send(err)
        }
    })
    // Here I update the data from the user. In the const user I store the loggedin user object from the database. 
    // Then I have the form in the Front-end the user filled in, after that I save the new information and redirect to the profile.
    .post('/profile-edit', upload.single('image'), auth, async (req, res) => {
        try {
            const user = req.user

            user.firstname = req.body.firstname
            user.surname = req.body.surname
            user.age = req.body.age
            user.gender = req.body.gender
            user.club = req.body.club
            user.email = req.body.email
            user.searchGender = req.body.searchGender
            user.description = req.body.description

            await user.save()
            res.redirect('/profile')
        } catch (err) {
            res.status(500).send(err)
        }
    })
    .post('/delete', auth, async (req, res) => {
        try {
            const user = req.user
            await user.remove()
            res.status(204).redirect('/')
        } catch (err) {
            res.status(500).send(err)
        }
    })

module.exports = router