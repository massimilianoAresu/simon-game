const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
let isGameOver = false;

function nextSequence() {
  userClickedPattern = [];

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);

  level++;
  $("#level-title").text(`Level ${level}`);
}

function playSound(name) {
  let audio = new Audio(`/sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");

  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    gameOver();
    isGameOver = true;
  }

  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(() => {
      nextSequence();
    }, 1000);
  }
}

function gameOver() {
  let audio = new Audio("/sounds/wrong.mp3");
  audio.play();
  
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);

  resetGame();
}

function resetGame() {
  gamePattern = [];
  level = 0;
  started = false;
}

$(document).ready(function () {
  $(document).keydown(function () {
    if (!started) {
      nextSequence();
      $("#level-title").text(`Level ${level}`);
      started = true;
      isGameOver = false;
    }
  });
});

$(".btn").click(function (e) {
  if (!isGameOver && started) {
    let userChosenColor = $(this).attr("id"); // Also: let userChosenColor = e.target.id;

    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
  
    checkAnswer(userClickedPattern.length - 1);
  }
});
