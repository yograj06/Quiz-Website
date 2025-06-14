const questions = [
  {
    question: "What is the domain of tanx : x \u03B5 R ?",
    answers: [
      { text: "a. R - nπ : n \u03B5 Z", correct: false },
      { text: "b. [-1, 1]", correct: false },
      { text: "c. R - (2n + 1)π/2 : n \u03B5 Z", correct: true },
      { text: "d. R", correct: false }
    ]
  },
  {
    question: "If y = lnx, What is the value of dy/dx ?",
    answers: [
      { text: "a. 1/x", correct: true },
      { text: "b. x", correct: false },
      { text: "c. x^2", correct: false },
      { text: "d. 1/x^2", correct: false }
    ]
  },
  {
    question: "If z = x + iy, then what is the value of Im(z - z') ?",
    answers: [
      { text: "a. 2x", correct: false },
      { text: "b. 2y", correct: true },
      { text: "c. -2x", correct: false },
      { text: "d. -2y", correct: false }
    ]
  },
  {
    question: "L1 -> ax + 3y = 5, L2 -> 4x - 6y + 8 = 0 : If L1 & L2 are parallel, then what is the value of a ?",
    answers: [
      { text: "a. 1/2x", correct: false },
      { text: "b. 2", correct: false },
      { text: "c. -1/2", correct: false },
      { text: "d. -2", correct: true }
    ]
  },
  {
    question: "What is the CGS unit of force ?",
    answers: [
      { text: "a. N", correct: false },
      { text: "b. dyne", correct: false },
      { text: "c. gcm/s^2", correct: false },
      { text: "d. Both b and c", correct: true }
    ]
  },
  {
    question: "The amount of torque experienced by a rod of length 25cm is 4Nm, and the force acting on it is 32N, then what is the angle at which the force is acting on the rod ?",
    answers: [
      { text: "a. 30 degree ", correct: true },
      { text: "b. 45 degree ", correct: false },
      { text: "c. 60 degree ", correct: false },
      { text: "d. 90 degree ", correct: false }
    ]
  },
  {
    question: "If the length of a conductor is doubled and the area of cross-section is halved then what is the effect on resistant of the conductor ?",
    answers: [
      { text: "a. Becomes half ", correct: false },
      { text: "b. Remains same ", correct: false },
      { text: "c. Becomes double ", correct: false },
      { text: "d. Becomes four time ", correct: true }
    ]
  },
  {
    question: "What is the majority charge carrier in n-type semiconductor ?",
    answers: [
      { text: "a. Electrons ", correct: true },
      { text: "b. Holes ", correct: false },
      { text: "c. Both ", correct: false },
      { text: "d. None of the above ", correct: false }
    ]
  },
  {
    question: "How many moles of lime stone is present in 1/2 kg of it ?",
    answers: [
      { text: "a. 3 ", correct: false },
      { text: "b. 4 ", correct: false },
      { text: "c. 5 ", correct: true },
      { text: "d. 6 ", correct: false }
    ]
  },
  {
    question: "Which is the correct energy order ?",
    answers: [
      { text: "a. 3d < 4p < 4d < 5s ", correct: false },
      { text: "b. 3d < 4p < 5s < 4d ", correct: true },
      { text: "c. 5s < 3p < 4p < 4d  ", correct: false },
      { text: "d. None of the above ", correct: false }
    ]
  },
  {
    question: "how many isomers of pentane are there ?",
    answers: [
      { text: "a. 1 ", correct: false },
      { text: "b. 2 ", correct: false },
      { text: "c. 3 ", correct: true },
      { text: "d. 4 ", correct: false }
    ]
  },
  {
    question: "What is the oxidation state of Mn in potassium permanganate ?",
    answers: [
      { text: "a. +7 ", correct: true },
      { text: "b. +2 ", correct: false },
      { text: "c. -7 ", correct: false },
      { text: "d. -2 ", correct: false }
    ]
  }
];

const questionElement = document.getElementById("Question");
const ansButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let attempted = 0;
let correctCount = 0;
let wrongCount = 0;
let answered = false;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  attempted = 0;
  correctCount = 0;
  wrongCount = 0;
  answered = false;
  nextButton.innerHTML = "Next";
  showQuestion();
}


function showQuestion() {
  resetState();
  answered = false;
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    button.dataset.correct = answer.correct;  // important fix
    ansButtons.appendChild(button);

    button.addEventListener("click", () => selectAnswer(button));
  });
}

function resetState() {
  while (ansButtons.firstChild) {
    ansButtons.removeChild(ansButtons.firstChild);
  }
  nextButton.style.display = "block";  // always visible
}

function selectAnswer(button) {
  if (answered) return;
  answered = true;

  const isCorrect = button.dataset.correct === "true";

  if (isCorrect) {
    button.classList.add("correct");
    score += 4;
    correctCount++;
  } else {
    button.classList.add("incorrect");
    score -= 1;
    wrongCount++;
  }

  attempted++;

  Array.from(ansButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
  });
}


nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = `
    <h2>Quiz Completed!</h2><br>
    <p>Total Questions: ${questions.length}</p>
    <p>Attempted: ${attempted}</p>
    <p>Unattempted: ${questions.length - attempted}</p>
    <p>Correct Answers: ${correctCount}</p>
    <p>Wrong Answers: ${wrongCount}</p>
    <p><strong>Final Score: ${score}</strong></p>
  `;
  nextButton.innerHTML = "Play Again";
  nextButton.onclick = startQuiz;
}

startQuiz();
