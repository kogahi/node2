export class Quiz {
    constructor(quizData) {
      this._quizzes = quizData;
      this._correctAnswersNum = 0;
    }
    getQuizCategory(index) {
      return this._quizzes[index - 1].category;
    }
    getQuizDifficulty(index) {
      return this._quizzes[index - 1].difficulty;
    }
    //クイズの長さを取得するためのgetNumQuizメソッド
    getNumOfQuiz() {
      return this._quizzes.length;
    }
    getQuizQuestion(index) {
      return this._quizzes[index - 1].question;
    }
    //クイズの正答を取得するためのgetCorrectAnswerメソッド
    getCorrectAnswer(index) {
      return this._quizzes[index - 1].correct_answer;
    }
    getIncorrerctAnswers(index) {
      return this._quizzes[index - 1].incorrect_answers;
    }
    getShuffledAnswers(index) {
      return this._quizzes[index -1].shuffled_answers;
    }
    countCorrectAnswersNum(index, answer) {
      const correctAnswer = this._quizzes[index - 1].correct_answer;
      if (answer === correctAnswer) {
        return this._correctAnswersNum++;
      }
    }
    //カウントした正答数を取得するためのgetCorrectAnswersNumメソッド
    getCorrectAnswerNum() {
      return this._correctAnswersNum;
    }
  }
