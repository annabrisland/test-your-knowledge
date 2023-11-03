var start = document.querySelector("#start");
var time = document.querySelector("#time");
var startEl = document.querySelector("#start-screen");
var questionEl = document.querySelector("#questions");
var questionName = document.querySelector("#question-title");
var questionChoices = document.querySelector("#choices");
var end = document.querySelector("#end-screen");

// Declare function to display questions
function displayQ() {
    // Hide start screen
    startEl.className = "hide";
    // Display first question
    questionEl.className = "";
    // loop through questions array and display the question
    questionName.textContent = questions[0].question;
    // Create each question choice
    for (var j = 0; j < questions[0].answers.length; j++) {
        var button = document.createElement("button");
            
        button.textContent = questions[0].answers[j];
        // Allocate each choice an index
        button.dataset.index = j;
        questionChoices.appendChild(button);
    }
}

// Declare countdown function
function countdown() {
    // Set full time
    var timeRemaining = 30;

    var timeInterval = setInterval(function() {
        timeRemaining--;
        time.textContent = timeRemaining + " Seconds";

        if (timeRemaining === 0) {
            clearInterval(timeInterval);
            // Hide questions and display end screen
            questionEl.className = "hide";
            end.className = "";
            // Clear timer text
            time.textContent = "";
        };
    }, 1000);
}

// 
start.addEventListener("click", function(event) {
    // Begin countdown
    countdown();
    // Display questions
    displayQ();
});