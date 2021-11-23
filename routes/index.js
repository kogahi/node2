const router = require('express').Router();
const quizController = require('../controllers/quizController')

router.get('/', quizController.index);
router.get('/quiz', quizController.getQuiz);

module.exports = router;