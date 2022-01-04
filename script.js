const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const goalkeeperLi = document.querySelector(".goalkeeperScore");
const shooterLi = document.querySelector(".shooterScore");

const balizaImg = new Image();
balizaImg.src = "./images/baliza.png"

const soccerBall = new Image();
soccerBall.src = "./images/Soccerball.png"
soccerBall.width = 5
soccerBall.height = 5

const soccerGloves = new Image();
soccerGloves.src = "./images/soccerGloves.png"

const goalTextImg = new Image();
goalTextImg.src = "./images/goal.png"

const savedTextImg = new Image();
savedTextImg.src = "./images/saved.png"

const noKeysPressedErrorImg = new Image();
noKeysPressedErrorImg.src = "./images/Error Message.png"

const crowdSound = new Audio();
crowdSound.src = "./sounds/crowdSound.mp3"

const goalSound = new Audio();
goalSound.src = "./sounds/goalSound.mp3"

const defendSound = new Audio();
defendSound.src = "./sounds/defendSound.m4a"


const drawBaliza = {
    img: balizaImg,
    x: 0,
    draw: function () {
        ctx.drawImage(this.img, this.x, 0);
    }
}

const ballDraw = {
    img: soccerBall,
    x: 0,
    y: 0,
    size: .05,
    width: function () {
        return this.img.width / this.size
      },
    height: function () {
        return this.img.height / this.size
      },
    draw: function () {
        ctx.drawImage(this.img, this.x, this.y, this.width(), this.height())
    }    
}

const glovesDraw = {
    img: soccerGloves,
    x: 0,
    y: 0,
    size: 4,
    width: function () {
        return this.img.width / this.size
      },
    height: function () {
        return this.img.height / this.size
      },
    draw: function () {
        ctx.drawImage(this.img, this.x, this.y, this.width(), this.height())
    }
}

const goalTextDraw = {
    img: goalTextImg,
    x: -150,
    y: 0,
    size : 1,
    width: function () {
        return this.img.width / this.size
      },
    height: function () {
        return this.img.height / this.size
      },
    draw: function () {
        ctx.drawImage(this.img, this.x, this.y, this.width(), this.height())
    }
}

const savedTextDraw = {
    img: savedTextImg,
    x: 0,
    y: 0,
    size : .7,
    width: function () {
        return this.img.width / this.size
      },
    height: function () {
        return this.img.height / this.size
      },
    draw: function () {
        ctx.drawImage(this.img, this.x, this.y, this.width(), this.height())
    }
}

const noKeysPressedErrorDraw = {
    img: noKeysPressedErrorImg,
    x: 100,
    y: 100,
    size: 1,
    width: function () {
        return this.img.width / this.size
      },
    height: function () {
        return this.img.height / this.size
      },
    draw: function () {
        ctx.drawImage(this.img, this.x, this.y, this.width(), this.height())
    }
}

function refreshPage() {
    return location.reload()
}

let scoreGoalkeeper = 0;
let scoreShooter = 0;

let intervalId;
function startGame() { 
    let timerInput = document.getElementById('timerInput').value;
    clearInterval(intervalId)
    let timer = timerInput * 1000;
    ballDraw.x = -100
    glovesDraw.x = -200
    document.getElementById("start-button").style.display = 'none'
    crowdSound.play();

    intervalId = setInterval(() => {
        ctx.clearRect( 0, 0, canvas.width, canvas.height);
        drawBaliza.draw();
        glovesDraw.draw();
        ballDraw.draw();
        document.getElementById('timerInput').style.display = 'none';
        document.getElementById("restartButton").style.visibility = 'visible';
        document.getElementById("homepage").style.visibility = 'visible';
        document.getElementById("instructions").style.display = 'none';

        timer -= 20
        document.getElementById('timer').innerHTML = Math.floor((timer % 60000)/1000)
        
        if (timer <= 0) {
            if (shooterChoice == "" || goalkeeperChoice == "") {
                noKeysPressedErrorDraw.draw()
            } else if (shooterChoice === goalkeeperChoice) {
                defendSound.play();
                savedTextDraw.draw()
                scoreGoalkeeper++
                goalkeeperLi.innerHTML = scoreGoalkeeper 
                } else {
                goalSound.play();
                goalTextDraw.draw()
                scoreShooter++
                shooterLi.innerHTML = scoreShooter
                }
            clearInterval(intervalId)}
    }, 20);
}

const goalPlace = ['topLeft', 'topRight', 'Center', 'botLeft', 'botRight']
let shooterChoice = "";
let goalkeeperChoice = ""; 


window.onload = function() {
    document.getElementById("start-button").onclick = function() {
       //document.getElementById("start-button").disabled = true;
       startGame()
    };
    document.getElementById("restartButton").style.visibility = "hidden";
    document.getElementById("restartButton").onclick = function() {
        goalSound.pause();
        shooterChoice = "";
        goalkeeperChoice = ""; 
        startGame()
        
    };
    document.getElementById("homepage").style.visibility = "hidden";
    document.getElementById("homepage").onclick = function() { 
        refreshPage()
    };
  };

  
//document.getElementById("start-button").style.display = 'none'


document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case "Digit1": 
            shooterChoice = goalPlace[0];
            ballDraw.x = 35;
            ballDraw.y = 25;
            break;
        case "Digit2": 
            shooterChoice = goalPlace[1];
            ballDraw.x = 430;
            ballDraw.y = 25;
            break;
        case "Digit3": 
            shooterChoice = goalPlace[2];
            ballDraw.x = 225;
            ballDraw.y = 70;
            break;
        case "Digit4": 
            shooterChoice = goalPlace[3];
            ballDraw.x = 430;
            ballDraw.y = 150;
            break;
        case "Digit5": 
            shooterChoice = goalPlace[4];
            ballDraw.x = 35;
            ballDraw.y = 150;
            break;
        case "Numpad1": 
            goalkeeperChoice = goalPlace[0];
            glovesDraw.x = 35;
            glovesDraw.y = 25;
            break;
        case "Numpad2": 
            goalkeeperChoice = goalPlace[1];
            glovesDraw.x = 430;
            glovesDraw.y = 25;
            break;
        case "Numpad3": 
            goalkeeperChoice = goalPlace[2];
            glovesDraw.x = 225;
            glovesDraw.y = 70;
            break;
        case "Numpad4": 
            goalkeeperChoice = goalPlace[3];
            glovesDraw.x = 430;
            glovesDraw.y = 150;
            break;
        case "Numpad5": 
            goalkeeperChoice = goalPlace[4];
            glovesDraw.x = 35;
            glovesDraw.y = 150;
            break;
    };
});


