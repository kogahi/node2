const router = require('express').Router()
router.post('/home', function(req, res) {
    res.render('views/home');
})

module.exports = router;