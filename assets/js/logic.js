var start = document.querySelector("#start");
var time = document.querySelector("#time");
var startEl = document.querySelector("#start-screen");
var questionEl = document.querySelector("#questions");
var questionName = document.querySelector("#question-title");
var questionChoices = document.querySelector("#choices");
var end = document.querySelector("#end-screen");
var answered = false;


// Function to listen for answer and display response
function getA(i) {
    // Receive answer
    questionEl.addEventListener("click", function(event) {
        var element = event.target;
        answered = true;

        // Display result (correct or incorrect)
        if (element.matches("button") && element.dataset.index == questions[i].answerIndex) {
            var response = "Correct!";
        } else if (element.matches("button")) {
            var response = "Incorrect!";
        };

        var result = document.createElement("p");
        result.textContent = response;
        questionEl.appendChild(result);
        // Append time
        // Append score

    })
}

// Function to retrieve and display question
function getQ(i) {
    questionName.textContent = questions[i].question;
    questionChoices.innerHTML = "";

    // Create each question choice
    for (var j = 0; j < questions[i].answers.length; j++) {
        var button = document.createElement("button");

        button.textContent = questions[i].answers[j];
        // Allocate each choice an index
        button.dataset.index = j;
        questionChoices.appendChild(button);
    }

    getA(i);
}

// Declare function to display questions
function displayQ() {
  // Hide start screen
  startEl.className = "hide";
  // Display first question
  questionEl.className = "";
  // loop through questions array and display the question
  for (var i = 0; i < questions.length; i++) {
    // get question
    getQ(i);
  }
}

// Declare countdown function
function countdown() {
  // Set full time
  var timeRemaining = 30;

  var timeInterval = setInterval(function () {
    timeRemaining--;
    time.textContent = timeRemaining + " Seconds";

    if (timeRemaining === 0) {
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
