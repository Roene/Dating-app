const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug')
const multer = require('multer')
const mongo = require('mongodb')
const session = require('express-session')
const routes = require('./routes')

require('dotenv').config() 

let db = null
const url = process.env.MONGODB_URI

mongo.MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
    if (err) throw err
    db = client.db(process.env.DB_NAME)
  })

const upload = multer({dest: 'static/upload/'});

express()
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET
    }))

    .set('view engine', 'ejs')
    .set('views', 'views')

    .get('/', routes.index)
    .get('/sign-up', routes.signUpForm)
    .post('/sign-up', upload.single('cover'), routes.signUp)
    .get('/login', routes.loginForm)
    .post('/login', routes.login)
    .get('/dashboard', routes.dashboard)

    .use(routes.notFound)
    
    .listen(3400);

