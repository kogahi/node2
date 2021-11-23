import {Quiz} from './main_class.js';

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
  try {
    const quizData = await fetch('/quiz');
    const quizRow = await quizData.json();
    const quizInstance = new Quiz(quizRow);
    setNextQuiz(quizInstance, index);
  }catch(err) {
    console.log(err);
  }

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
  //answerを定義
  const answers = quizInstance.getShuffledAnswers(index);
  answers.forEach((answer) => {
    const answerElement = document.createElement("li");
    answersContainer.appendChild(answerElement);
    //ボタンのテキストに答えを表示
    const buttonElement = document.createElement("button");
    buttonElement.innerHTML = answer;
    answersContainer.appendChild(buttonElement);
    //正答数をカウントするインスタンスメソッドを定義
    buttonElement.addEventListener("click", () => {
      quizInstance.countCorrectAnswersNum(index, answer);
      index++;
      setNextQuiz(quizInstance, index);
    });
  });
};

const finishQuiz = (quizInstance) => {
  //カウントした正答数を表示
  titleElement.textContent = `あなたの正答数は${quizInstance.getCorrectAnswerNum()}です`;
  //ジャンルや難易度の項目を空白にする
  genreElement.textContent = "";
  difficultyElement.textContent = "";
  //再チャレンジ用の文面を用意
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
