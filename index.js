const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes')

express()
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({extended: true}))
    .set('view engine', 'ejs')
    .set('views', 'view')
    .get('/', routes.index)
    .get('/about', routes.about)
    .use(routes.notFound)
    .listen(3400);

