const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug')
const multer = require('multer')
const session = require('express-session')
const routes = require('./routes')

require('dotenv').config() 

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
