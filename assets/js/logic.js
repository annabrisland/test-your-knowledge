var start = document.querySelector("#start");
var time = document.querySelector("#time");

function countdown() {
    var timeRemaining = 30;

    var timeInterval = setInterval(function() {
        timeRemaining--;
        time.textContent = timeRemaining + " Seconds";

        if (timeRemaining === 0) {
            clearInterval(timeInterval);
            // display time's up page HERE
            time.textContent = ""
        };
    }, 1000);
}

start.addEventListener("click", function(event) {
    console.log("yo");
    countdown();
});