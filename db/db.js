// THIS FILE MAKES A DATABASE CONNECTION
const mongoose = require('mongoose')

require('dotenv').config()

const uri = process.env.MONGODB_URI

const dbconnection = () => mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected...') )

module.exports = dbconnection