const fetch = require("node-fetch");
const URL = "https://opentdb.com/api.php?amount=10";

module.exports = {
getQuiz: async () => {
        try {
          const result = await fetch(URL);
          const quizData = await result.json();
          const results = quizData.results;
          const res = results.map(quiz => {
            let correct_answer = [];
            correct_answer = quiz.correct_answer;
            let incorrect_answers = quiz.incorrect_answers;
            incorrect_answers.push(correct_answer);
            let answers = incorrect_answers;
            let shuffledAnswer = [];
            for (let i = answers.length - 1;0 < i; i--) {
              const rand = Math.floor(Math.random() * (i + 1));
              const tmp = answers[i];
              answers[i] = answers[rand];
              answers[rand] = tmp;
              shuffledAnswer = answers
            }
            quiz["shuffled_answers"] = shuffledAnswer;
            return quiz;
          })
          return res;
         } 
         catch(err){
             console.log(err)
         }
    }
  }