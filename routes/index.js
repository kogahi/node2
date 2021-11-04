const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const quizController = require('../controllers/quizController')
// const registController = require('../controllers/registController')
// const homeController = require('../controllers/homeController')
// const validator = require('../validates/validate')

router.get('/', quizController.doRequest)
// router.post('/home', validator, homeController.getLoggedin)

module.exports = router;