var express = require('express')

var router = express.Router()

router.get('/', function(req, res, next) {
    res.send("This is users' page from Express Boilerplate")
})

module.exports = router