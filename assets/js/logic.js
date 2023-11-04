var start = document.querySelector("#start");
var time = document.querySelector("#time");
var startEl = document.querySelector("#start-screen");
var questionEl = document.querySelector("#questions");
var questionName = document.querySelector("#question-title");
var questionChoices = document.querySelector("#choices");
var feedback = document.querySelector("#feedback");
var end = document.querySelector("#end-screen");
var finalScore = document.querySelector("#final-score");
var initsField = document.querySelector("#initials");
var initsButton = document.querySelector("#submit");
var questionIndex = 0;
var score = 0;
var timeRemaining = 30;
var highscores = [];

// Function to display endscreen and score
function displayScore() {
  end.className = "";

  // Display current score
  finalScore.textContent += score;

  // Listen for initial submit
  initsButton.addEventListener("click", function () {
    var inits = initsField.value.trim();

    if (inits === "") {
      return;
    }
    // Create current score object
    var currentScore = {
      name: inits,
      score: score,
    };
    initsField.value = "";

    // Add current score to highscrores array
    // Check if highscores already exists and get it from storage
    var leaderboard = localStorage.getItem("highscores");
    if (leaderboard) {
      highscores = JSON.parse(leaderboard);
    }
    // Add current score to highscores
    highscores.push(currentScore);
    // Submit highscores to local storage
    localStorage.setItem("highscores", JSON.stringify(highscores));

    // Navigate to highscores page
    window.location.href = "highscores.html";
  });
}

// Function to correct and score
function correctAns(event) {
  var element = event.target;

  // Display result (correct or incorrect) and score
  if (
    element.matches("button") &&
    element.dataset.index == questions[questionIndex].answerIndex
  ) {
    var response = "Correct!";
    score++;
  } else if (element.matches("button")) {
    var response = "Incorrect!";
    if (score > 0) {
      score--;
    }
    timeRemaining -= 5;
  }

  // Add and display feedback for 0.5s
  feedback.textContent = response;
  feedback.className = "feedback";
  setTimeout(function () {
    feedback.className = "hide";
  }, 500);

  // Increase question index
  questionIndex++;

  // Append time
  // Get next question unless no more questions
  if (questionIndex === questions.length) {
    return;
  }

  getQ();
  console.log(score);
}

// Function to listen for answer
function getA() {
  // Receive answer
  questionEl.addEventListener("click", correctAns);
}

// Function to retrieve and display question
function getQ() {
  questionName.textContent = questions[questionIndex].question;
  questionChoices.innerHTML = "";

  // Create each question choice
  for (var j = 0; j < questions[questionIndex].answers.length; j++) {
    var button = document.createElement("button");

    button.textContent = questions[questionIndex].answers[j];
    // Allocate each choice an index
    button.dataset.index = j;
    questionChoices.appendChild(button);
  }
  // Get answers to each question
  getA();
}

// Declare function to display questions
function displayQ() {
  // Hide start screen
  startEl.className = "hide";
  // Display questions element
  questionEl.className = "";

  // get question
  getQ();
}

// Declare countdown function
function countdown() {
  var timeInterval = setInterval(function () {
    timeRemaining--;
    time.textContent = timeRemaining + " Seconds";

    if ((timeRemaining === 0) | (questionIndex === questions.length)) {
      clearInterval(timeInterval);
      // Hide questions and display end screen
      questionEl.className = "hide";
      displayScore();
      // Clear timer text
      time.textContent = "0";
    }
  }, 1000);
}

//
start.addEventListener("click", function (event) {
  // Begin countdown
  countdown();
  // Display questions
  displayQ();
});
