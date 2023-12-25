let questions = [
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vetican city", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Shri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the smallest continent in the world",
    answers: [
      { text: "Asia", correct: false },
      { text: "Austrelia", correct: true },
      { text: "Artic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
];

let questionElement = document.querySelector("#quesElement");
let answerButtons = document.querySelector(".answer");
let nextBtn = document.querySelector("#nxtBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}


function showQuestion() {
  resetData();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  showAnswer();
}

function showAnswer() {
  questions[currentQuestionIndex].answers.forEach((answer) => {
    console.log(answer.text);
    let button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = answer.text;

    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}
function resetData(){
  nextBtn.style.display = "none";
  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  let selectedButton = e.target;
  let isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("inCorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = "true";
  });
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handlednxtButton();
  } else {
    startQuiz();
  }
});

function handlednxtButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion()
  } else {
    showScore();
  }
}
function showScore() {
  resetData();
  questionElement.innerHTML = `Your Score is ${score} out of ${questions.length}`;

  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block"
}
startQuiz();