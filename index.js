const express       = require('express')
const bodyParser    = require('body-parser')

// OWN FILES
const auth = require('./routes/user')

// MAKE CONNECTION TO DATABASE
require('./db/db')

express()
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    // SET VIEW ENGINE TO EJS AND SEARCH IN MAP VIEWS
    .set('view engine', 'ejs')
    .set('views', 'views')
    // USE AUTH.JS
    .use(auth)
    // 404 IF USER GO TO UNKNOWN ROUTE
    .use((req, res) => { res.status(404).render('pages/not-found') }) 

    .listen(3400);
