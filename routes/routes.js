const mongo = require('mongodb')
const bcrypt = require('bcrypt')
const saltRounds = 10

require('dotenv').config() 

exports.index = (req, res) => res.render('pages/index')

exports.dashboard = (req, res) => res.render('pages/dashboard')

exports.notFound = (req, res) => res.status(404).render('pages/not-found')
