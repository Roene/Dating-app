const express       = require('express')
const bodyParser    = require('body-parser')

// OWN FILES
const userRoute     = require('./routes/user')
const dbconnection  = require('./db/db')

// Make connection to the database
dbconnection()

express()
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    // Set view engine to ejs and let it search in the folder views
    .set('view engine', 'ejs')
    .set('views', 'views')
    // Use auth.js
    .use(userRoute)
    // 404 if user go to unkown route
    .use((req, res) => { res.status(404).render('pages/not-found') }) 

    .listen(process.env.PORT || 3400);
