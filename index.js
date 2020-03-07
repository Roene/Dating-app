const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const session = require('express-session')

// OWN FILES
const routes = require('./routes/routes')
const auth = require('./routes/user')

require('./db/db')

require('dotenv').config() 

// const upload = multer({dest: 'static/upload/'})

express()
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET
    }))

    .set('view engine', 'ejs')
    .set('views', 'views')

    .get('/', routes.index)
    .get('/dashboard', routes.dashboard)
    .use(auth)

    .use(routes.notFound)
    
    .listen(3400);
