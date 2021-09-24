let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let randomNumber;
let randomChosenColor;
let toggle = false;
let level = 0;

function nextSequence() {
    level++;
    $("#level-title").text(`level ${level}`);
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(document).on("keypress", function() {
    if (toggle == false) {
        $("#level-title").text("Level 0");
        nextSequence();
    }
    toggle = true;
});

$(".btn").click((e) => {
    let userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    $(`#${userChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(userChosenColor);
    animatePress(userChosenColor);
});

function playSound(name) {
    let audio = new Audio(`${name}.mp3`);
    audio.play();
}

function animatePress(currentColor) {
    $(`.${currentColor}`).addClass("pressed");

    setTimeout(function() {
        $(`.${currentColor}`).removeClass("pressed");
    }, 30);
}

function checkAnswer(currentLevel) {}