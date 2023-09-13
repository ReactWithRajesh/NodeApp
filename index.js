const express = require('express')
const app = express()

//using as middleware for json responce 
app.use(express.json())
//using for url encoder
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/api/users'))

app.listen(3333, () => {
    console.log('Running on Port : 3333')
})

//module.exports = app;

