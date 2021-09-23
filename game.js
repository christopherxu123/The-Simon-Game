gamePattern = [];
userClickedPattern = [];
buttonColours = ["red", "blue", "green", "yellow"]
var level = 0;
var flag = true;
function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4) 
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
// $("." + buttonColours[randomChosenColour]).animate({opacity: '0'}).animate({opacity: '1'})
// $("." + randomChosenColour).fadeTo(100, 0).fadeTo(100, 1);
    $("." + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
}

function playSound(name){
    new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed").delay(100).queue(function (){
        $(this).removeClass("pressed");
        $(this).dequeue();
    })
    // setTimeout(function() {
    //     $("#" + currentColour).removeClass("pressed");
    // }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success!");
        if(userClickedPattern.length === gamePattern.length){
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);      
        }
    }else {
       $('body').addClass("game-over").delay(200).queue(function (){
        $(this).removeClass("game-over");
        $(this).dequeue();
        })
        
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();

    }
}

function startOver(){
    flag = true;
    level = 0;
    gamePattern = [];
    
}

$(".btn").click(function (){
    // console.log($(this));
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});


$(document).keydown (function () {
    if(flag){
        gamePattern = [];
        userClickedPattern = [];
        nextSequence();
        $('#level-title').html("Level " + level);
        flag = false;
    }

});
