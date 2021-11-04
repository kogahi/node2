const router = require('express').Router()
router.get('/regist', function(req, res) {
    res.render('views/regist');
})

module.exports = router;