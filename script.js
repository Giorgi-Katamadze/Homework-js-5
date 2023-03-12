const rows = 20;
const cols = 20;
const blockSize = 25;

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
const enemy = {
    w: 75,
    h:75,
    x: blockSize * 0,
    y: blockSize * 0,
    speedX: 0,
    speedY: 15
}
const enemyImg =  document.getElementById('enemy')
function drawEnemy (){
    context.drawImage(enemyImg, enemy.x, enemy.y, enemy.w, enemy.h )
}

let points = 0;
let gameOver = false
window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.height = rows * blockSize;
    canvas.width = cols * blockSize;
    context = canvas.getContext("2d"); 
    getCoin()
    document.addEventListener("keydown",keyDown);
    document.addEventListener("keyup",keyUp);
    setInterval(update,1000/10)
}

function update(){
    if(gameOver){
        points = 0;
        return;
    }
    context.fillStyle="#E9EDC9";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawCoin()
    if( player.x == coin.x && player.y == coin.y){
        getCoin()
        points++
    }
    drawPlayer()
    player.x += player.speedX * blockSize
    player.y += player.speedY * blockSize
    detectWalls()
    drawEnemy()
    moveEnemy()
    if(player.x == enemy.x && player.y == enemy.y){
        gameOver = true;
        alert("Game Over")
        window.location.reload();
    }
    let inputValue = localStorage.getItem("value")
    context.fillStyle = "black";
    context.font = "16px Arial";
    context.fillText(inputValue + "'s " + "Points: " + points, 10, 20);

}
function getCoin(){
    coin.x = Math.floor(Math.random() * (cols-5)) * blockSize;
    coin.y = Math.floor(Math.random() * (rows-5))* blockSize;
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
      player.x = 0;
    }
    if (player.x + player.w > canvas.width) {
      player.x = canvas.width - player.w;
    }
    if (player.y < 0) {
      player.y = 0;
    }
    if (player.y + player.h > canvas.height) {
      player.y = canvas.height - player.h;
    }
  }

function moveEnemy (){
    enemy.y += enemy.speedY;
    if (enemy.y > canvas.height){
        enemy.y = 0 - enemy.h
        enemy.x = Math.floor(Math.random() * (cols-3))* blockSize
    }
}
