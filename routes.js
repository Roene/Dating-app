const mongo = require('mongodb')
const session = require('express-session')
const bcrypt = require('bcrypt')
const saltRounds = 10

require('dotenv').config() 

let db = null
const url = process.env.MONGODB_URI

mongo.MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
    if (err) throw err
    db = client.db(process.env.DB_NAME)
  })

exports.index = function index (req, res) {
    res.render('pages/index')
}

exports.signUpForm = function signUpForm (req, res) {
    res.render('pages/sign-up')
}

exports.signUp = function signUp (req, res, next) {
       let firstname =req.body.firstname
       let surname = req.body.surname
       let age = Number(req.body.age)
       let gender = req.body.gender
       let club = req.body.club
       let picture = req.file ? req.file.filename : null
       let email = req.body.email
       let password = req.body.password
       let searchGender = req.body.searchGender
       let description = req.body.description

       db.collection('Users').find({email: email}, done)

    function done (err, data) {
        if (err) {
            next(err)
        } else {
            bcrypt.hash(password, saltRounds, onhash)
        }
    }

    function onhash (err, hash) {
        if (err) {
            next (err)
        } else {
            db.collection('Users').insertOne({
                firstname: firstname,
                surname: surname,
                age: age,
                gender: gender,
                club: club,
                picture: picture,
                email: email,
                hash: hash,
                searchGender: searchGender,
                description: description 
            }, onInsert)
        }
    }
    
    function onInsert (err, data) {
        if (err) {
            next (err)
        } else {
            res.redirect('/login')
        }
    }
}

exports.loginForm = function loginForm (req, res) {
    res.render('pages/login')
}

exports.login = function login (req, res) {

}

exports.dashboard = function dashboard (req, res) {
    res.render('pages/dashboard')
}

exports.notFound = function notFound (req, res) {
    res.status(404).render('pages/not-found')
}