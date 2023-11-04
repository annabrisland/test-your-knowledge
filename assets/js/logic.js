var start = document.querySelector("#start");
var time = document.querySelector("#time");
var startEl = document.querySelector("#start-screen");
var questionEl = document.querySelector("#questions");
var questionName = document.querySelector("#question-title");
var questionChoices = document.querySelector("#choices");
var feedback = document.querySelector("#feedback");
var end = document.querySelector("#end-screen");
var questionIndex = 0;
var score = 0;

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
    score--;
  }

  // Add and display feedback for 0.5s
  feedback.textContent = response;
  feedback.className = "feedback"
  setTimeout(function() {
    feedback.className = "hide"
  }, 500);
  
  // Increase question index
  questionIndex++;

  // Append time
  // Get next question unless no more questions
  if(questionIndex === questions.length) {
    return;
  };

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
  // Set full time
  var timeRemaining = 30;

  var timeInterval = setInterval(function () {
    timeRemaining--;
    time.textContent = timeRemaining + " Seconds";

    if (timeRemaining === 0 | questionIndex === questions.length) {
      clearInterval(timeInterval);
      // Hide questions and display end screen
      questionEl.className = "hide";
      end.className = "";
      // Clear timer text
      time.textContent = "";
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
