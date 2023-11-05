var table = document.querySelector("#highscores-table");
var clear = document.querySelector("#clear");
var currentHighscores = JSON.parse(localStorage.getItem("highscores"));

for (var i = 0; i < currentHighscores.length; i++) {
  var li = document.createElement("li");
  li.textContent =
    currentHighscores[i].name + ": " + currentHighscores[i].score;
  table.appendChild(li);
}

// Clear hichscores on click of 'clear' button
clear.addEventListener("click", function () {
  // Remove rendered highscores
  table.innerHTML = "";
  // Empty highscores local storage
  localStorage.setItem("highscores", "");
});
