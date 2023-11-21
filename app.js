const express = require('express')
const path = require('path');
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const cors = require('cors')

const index = require('./routes/index')
const users = require('./routes/users')

//////////////////////////////////////////////////////////////////////
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// app.use(cors())
//////////////////////////////////////////////////////////////////////
app.use('/', index)
app.use('/users', users)

//////////////////////////////////////////////////////////////////////
app.use(function(req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})
app.use(function(err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
    res.render('error')
})

//////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App is running on port ${port}!`))

module.exports = app