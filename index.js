const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes')

express()
    .set('view engine', 'ejs')
    .set('views', 'view')
    .get('/', routes.index)
    .listen(3400);

