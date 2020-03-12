const express       = require('express')
const bodyParser    = require('body-parser')
const session       = require('express-session')

// OWN FILES
const auth = require('./routes/user')

require('./db/db')

express()
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())

    .set('view engine', 'ejs')
    .set('views', 'views')

    .use(auth)

    .use((req, res) => { res.status(404).render('pages/not-found') }) 

    .listen(3400);
