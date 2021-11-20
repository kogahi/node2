const fetch = require("node-fetch");
// import fetch from "node-fetch";
const URL = "https://opentdb.com/api.php?amount=10";

module.exports = {
    getQuiz: async () => {
        try {
          const result = await fetch(URL);
          const quizData = await result.json();
          const results = quizData.results;
          return results;
         } 
         catch(er){
             console.log(er)
         }
        }
  }