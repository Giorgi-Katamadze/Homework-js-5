const rows = 20;
const cols = 30;
const blockSize = 25;
let points = 0;
let highestScore = 0;
const player = {
    w: 75,
    h: 75,
    x: blockSize * 1,
    y: blockSize * 1,
    speedX: 0,
    speedY:0
}
const marioImg = document.getElementById('mario')
function drawPlayer(){
    context.drawImage(marioImg, player.x, player.y, player.w, player.h )
}
const coin = {
    w: 25,
    h: 50,
}
const coinImg = document.getElementById('coin')
function drawCoin(){
    context.drawImage(coinImg, coin.x, coin.y, coin.w, coin.h )
}
const mashroom ={
    w:50,
    h:50
}
const mashroomImg = document.getElementById('mashroom')
function drawMashroom (){
    context.drawImage(mashroomImg,mashroom.x,mashroom.y,mashroom.w,mashroom.h)
}
const enemyOne = {
    w: 75,
    h:75,
    x: blockSize * 4,
    y: blockSize * 0,
    speedX: 0,
    speedY: 23
}
const enemyTwo = {
    w: 75,
    h:75,
    x: blockSize * 14,
    y: blockSize * 0,
    speedX: 0,
    speedY: 26
}
const enemyThree = {
    w: 60,
    h:60,
    x: blockSize * 0,
    y: blockSize * 10,
    speedX: 0,
    speedY: 20
}
const enemyImgOne =  document.getElementById('enemy')
function drawEnemyOne (){
    context.drawImage(enemyImgOne, enemyOne.x, enemyOne.y, enemyOne.w, enemyOne.h )
}
const enemyImgTwo =  document.getElementById('enemy')
function drawEnemyTwo (){
    context.drawImage(enemyImgTwo, enemyTwo.x, enemyTwo.y, enemyTwo.w, enemyTwo.h )
}
const enemyImgThre = document.getElementById('star')
function drawEnemyThree (){
    context.drawImage(enemyImgThre,enemyThree.x,enemyThree.y,enemyThree.w,enemyThree.h)
}
let gameOver = false
window.onload = function() {
    highestScore = localStorage.getItem("highestScore") || 0;
    canvas = document.getElementById("canvas");
    canvas.height = rows * blockSize;
    canvas.width = cols * blockSize;
    context = canvas.getContext("2d"); 
    setInterval(update,1000/10)
    getCoin()
    setTimeout(getMashroom, 10000)
}

function update(){
    context.fillStyle="#E9EDC9";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawCoin()
    drawMashroom()
    player.x += player.speedX *blockSize
    player.y += player.speedY * blockSize
    detectWalls()
    drawEnemyOne()
    drawEnemyTwo()
    drawEnemyThree()
    moveEnemyOne()
    moveEnemyTwo()
    moveEnemyThree()
    drawPlayer()
    context.fillStyle = "black";
context.font = "16px Arial";
context.fillText("Your Highest Score: " + highestScore, canvas.width - 180, 20);

    if (points > highestScore) {
        highestScore = points;
        localStorage.setItem("highestScore", highestScore);
    }
    let inputValue = localStorage.getItem("userName")
    context.fillStyle = "black";
    context.font = "16px Arial";
    context.fillText(inputValue + "'s " + "Points: " + points, 10, 20);
        if (player.y + 50 >= enemyOne.y &&
            player.y <= enemyOne.y + 40 &&
            player.x + 15 >= enemyOne.x &&
            player.x <= enemyOne.x + 20){
            gameOver = true
            alert('Game Over')
            window.location.reload();
            moveEnemyOne = false;
           }
        if (player.y + 50 >= enemyTwo.y &&
            player.y <= enemyTwo.y + 40 &&
            player.x + 15 >= enemyTwo.x &&
            player.x <= enemyTwo.x + 20){
            gameOver = true
            alert('Game Over')
            window.location.reload();
            moveEnemyTwo = false;
           }
        if (player.y + 50 >= enemyThree.y &&
            player.y <= enemyThree.y + 40 &&
            player.x + 15 >= enemyThree.x &&
            player.x <= enemyThree.x + 20){
            gameOver = true
            alert('Game Over')
            window.location.reload();
            moveEnemyThree = false;
           }

        if( player.x + 40 >= coin.x &&
            player.x <= coin.x - 5 &&
            player.y + 30 >= coin.y &&
            player.y <= coin.y + 20){
                getCoin()
                points++
        }
        if( player.x + 40 >= mashroom.x &&
            player.x <= mashroom.x - 5 &&
            player.y + 30 >= mashroom.y &&
            player.y <= mashroom.y + 20){
                getMashroom()
                mashroom.x = -100
                mashroom.y = -100
                enemyOne.speedY++
                enemyTwo.speedY++
                enemyThree.speedY++
                setTimeout(function(){
                    getMashroom()
                 } , 20000) 
                points+=5
        }
    if(gameOver){
        if (points > highestScore) {
            highestScore = points;
            localStorage.setItem("highestScore", highestScore);
        }
        points = 0;
        return;
    }
    document.addEventListener("keydown",keyDown);
    document.addEventListener("keyup",keyUp);
    
}
function getCoin(){
    coin.x = Math.floor(Math.random() * (cols - 5)) * blockSize;
    coin.y = Math.floor(Math.random() * (rows - 5))* blockSize;
}
function getMashroom() {
    mashroom.x = Math.floor(Math.random() * (cols - 5)) * blockSize;
    mashroom.y = Math.floor(Math.random() * (rows - 5)) * blockSize;
  }
  
function keyDown(e){
    if(e.key == "ArrowUp"){
        player.speedX = 0;
        player.speedY = -1
    }
    else if(e.key == "ArrowDown"){
        player.speedX = 0;
        player.speedY = 1
    }
    else if(e.key == "ArrowLeft"){
        player.speedX = -1;
        player.speedY = 0;
    }
    else if(e.key == "ArrowRight"){
        player.speedX = 1;
        player.speedY = 0
    }
}    
function keyUp(e){
    if(e.key == "ArrowUp" || e.key == "ArrowDown"){
        player.speedY = 0
    }
    else if(e.key == "ArrowLeft" || e.key == "ArrowRight"){
        player.speedX = 0
    }
}
function detectWalls() {
    if (player.x < 0) {
      player.x = -20;
    }
    if (player.x + 50 > canvas.width) {
      player.x = canvas.width - 50;
    }
    if (player.y < 0) {
      player.y = 0;
    }
    if (player.y + player.h > canvas.height) {
      player.y = canvas.height - player.h;
    }
  }

function moveEnemyOne (){
    enemyOne.y += enemyOne.speedY;
    if (enemyOne.y > canvas.height){
        enemyOne.y = 0 - enemyOne.h
        enemyOne.x = Math.floor(Math.random() * (cols))* blockSize
    }
} 
function moveEnemyTwo (){
    enemyTwo.y += enemyTwo.speedY;
    if (enemyTwo.y > canvas.height){
        enemyTwo.y = 0 - enemyTwo.h
        enemyTwo.x = Math.floor(Math.random() * (cols))* blockSize
    }
}
function moveEnemyThree (){
    enemyThree.x += enemyThree.speedY
    if(enemyThree.x >= canvas.width){
        enemyThree.x = 0 - enemyThree.w
        enemyThree.y = Math.floor(Math.random() * (rows))* blockSize
    }
}


