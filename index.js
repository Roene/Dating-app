const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes')

express()
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({extended: true}))
    .set('view engine', 'ejs')
    .set('views', 'views')

    .get('/', routes.index)
    .get('/sign-up', routes.signUp)
    .get('/about', routes.about)
    .use(routes.notFound)
    
    .listen(3400);

