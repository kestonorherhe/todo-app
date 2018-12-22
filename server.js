const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const mongoose =  require('mongoose')
const config = require('./config/database')

// initialize app
const app = express();

// set port
app.set('port', process.env.PORT || 2600)

// connect to database
mongoose.connect(config.database)
// verify connection 
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database)
})
// on database error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err)
})

//configure environment settings
app.use(bodyParser.json())
app.enable('case sensitive routing')
app.enable('strict routing')
app.disable('x-powered-by')

// import routes
const todo = require('./routes/todo')
//assign routes (this approach involves applying routes as a middleware)
app.use('/api/v1', todo)

// catch 404 error and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next (err)
})

// error handler
// development error handler
// will print stack trace
if ( app.get('env') === 'development' ) {
    app.use((err, req, res, next) => {
        res.status(err.status || 500)
        res.json({
            message: err.message,
            error: err
        })
    })
}

// production err handler
// will not print stact trace
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        message: err.message,
        error: {}
    })
})

// bootup server
let server = app.listen(app.get('port'), ()=> {
    console.info('Express server listening on port'+' '+ server.address().port)
})