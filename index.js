const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug')
const multer = require('multer')
const routes = require('./routes')

require('dotenv').config(); 

express()
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({extended: true}))
    .set('view engine', 'ejs')
    .set('views', 'views')

    .get('/', routes.index)
    .get('/sign-up', routes.signUp)
    .get('/login', routes.login)
    .use(routes.notFound)
    
    .listen(3400);

