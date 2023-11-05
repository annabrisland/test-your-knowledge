var table = document.querySelector("#highscores-table");
var currentHighscores = JSON.parse(localStorage.getItem("highscores"));

for (var i = 0; i < currentHighscores.length; i++) {
    console.log(currentHighscores[i].name)
    var li = document.createElement("li");
    li.textContent = currentHighscores[i].name + ": " + currentHighscores[i].score;
    table.appendChild(li);
};

