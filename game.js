let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let randomNumber;
let randomChosenColor;
let toggle = false;
let level = 0;

function nextSequence() {
    userClickedPattern = [];
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
        $("#level-title").text("Level " + level);
        nextSequence();
    }
    toggle = true;
});

$(".btn").click((e) => {
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    let userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
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

function wrong() {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press any key to Restart");
    startOver();
}

function startOver() {
    gamePattern = [];
    toggle = false;
    level = 0;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        wrong();
    }
}