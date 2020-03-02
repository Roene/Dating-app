const mongo = require('mongodb')
const session = require('express-session')

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
    db.collection('EreDate').insertOne ({
        firstname: req.body.firstname,
        surname: req.body.surname,
        age: Number(req.body.age),
        gender: req.body.gender, 
        club: req.body.club,
        picture: req.file ? req.file.filename : null,
        email: req.body.email,
        password: req.body.password,
        searchGender: req.body.searchGender,
        description: req.body.description
    }, done)

    function done (err, data) {
        if (err) {
            next(err)
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