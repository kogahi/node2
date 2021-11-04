const URL = "https://opentdb.com/api.php?amount=10";

class Quiz {
  constructor(quizData) {
    this._quizzes = quizData.results;
    this._correctAnswersNum = 0;
  }
  getQuizCategory(index) {
    return this._quizzes[index - 1].category;
  }
  getQuizDifficulty(index) {
    return this._quizzes[index - 1].difficulty;
  }
  getNumOfQuiz() {
    return this._quizzes.length;
  }
  getQuizQuestion(index) {
    return this._quizzes[index - 1].question;
  }
  getCorrectAnswer(index) {
    return this._quizzes[index - 1].correct_answer;
  }
  getIncorrerctAnswers(index) {
    return this._quizzes[index - 1].incorrect_answers;
  }
  countCorrectAnswersNum(index, answer) {
    const correctAnswer = this._quizzes[index - 1].correct_answer;
    if (answer === correctAnswer) {
      return this._correctAnswersNum++;
    }
  }
  getCorrectAnswerNum() {
    return this._correctAnswersNum;
  }
}

const titleElement = document.getElementById("title");
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const startButton = document.getElementById("start-button");
const genreElement = document.getElementById("genre");
const difficultyElement = document.getElementById("difficulty");
startButton.addEventListener("click", () => {
  startButton.hidden = true;
  fetchQuiz(1);
});

const fetchQuiz = async (index) => {
  titleElement.textContent = "取得中";
  questionElement.textContent = "お待ち下さい";

  const res = await fetch(URL);
  const quizData = await res.json();
  const quizInstance = new Quiz(quizData);
  setNextQuiz(quizInstance, index);
};

const setNextQuiz = (quizInstance, index) => {
  while (answersContainer.firstChild) {
    answersContainer.removeChild(answersContainer.firstChild);
  }
  if (index <= quizInstance.getNumOfQuiz()) {
    makeQuiz(quizInstance, index);
  } else {
    finishQuiz(quizInstance);
  }
};

const buildAnswers = (quizInstance, index) => {
  const answers = [
    quizInstance.getCorrectAnswer(index),
    ...quizInstance.getIncorrerctAnswers(index),
  ];
  return shuffleArray(answers);
};

const shuffleArray = (array) => {
  const copiedArray = array.slice();
  for (let i = copiedArray.length - 1; i >= 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [copiedArray[i], copiedArray[rand]] = [copiedArray[rand], copiedArray[i]];
  }

  return copiedArray;
};
const makeQuiz = (quizInstance, index) => {
  titleElement.innerHTML = `問題${index}`;
  genreElement.innerHTML = `【ジャンル】 ${quizInstance.getQuizCategory(
    index
  )}`;
  difficultyElement.innerHTML = `【難易度】${quizInstance.getQuizDifficulty(
    index
  )}`;
  questionElement.innerHTML = `【クイズ】${quizInstance.getQuizQuestion(
    index
  )}`;
  const answers = buildAnswers(quizInstance, index);

  answers.forEach((answer) => {
    const answerElement = document.createElement("li");
    answersContainer.appendChild(answerElement);
    const buttonElement = document.createElement("button");
    buttonElement.innerHTML = answer;
    answersContainer.appendChild(buttonElement);
    buttonElement.addEventListener("click", () => {
      quizInstance.countCorrectAnswersNum(index, answer);
      index++;
      setNextQuiz(quizInstance, index);
    });
  });
};

const finishQuiz = (quizInstance) => {
  titleElement.textContent = `あなたの正答数は${quizInstance.getCorrectAnswerNum()}です`;
  genreElement.textContent = "";
  difficultyElement.textContent = "";
  questionElement.textContent = "再チャレンジしたい場合は下をクリック"; //クイズが終わった後にもう一度スタート画面に戻れるようにする
  const restartButton = document.createElement("button");
  restartButton.textContent = "ホームに戻る";
  answersContainer.appendChild(restartButton);
  restartButton.addEventListener("click", () => {
    location.reload();
  });
};

const unescapeHTML = (str) => {
  var div = document.createElement("div");
  div.innerHTML = str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/ /g, "&nbsp;")
    .replace(/\r/g, "&#13;")
    .replace(/\n/g, "&#10;");

  return div.textContent || div.innerText;
};
