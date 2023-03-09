let myGamePiece

function startGame(){
    myGamePiece = new component(document.querySelector(".person"));
    myGameArea.start();
}
let myGameArea = {
    canvs : document.createElement("canvas"),
    start : function(){
       this.canvas.width = 500;
       this.canvas.height = 500;
       this.context = this.canvas.getcontext("2d");
       document.body.insertBefore(this.canvas, document.body.childNodes[0]);
       this.interval = setInterval(updateGameArea, 20)
    },
    clear : function(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas,height)
    }
}

function component(){
    this.speedX = 0
    this.speedY = 0
    this.x=x;
    this.y=y;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y,)  
    },
    this.newPos =function(){
        this.x += this.speedX;
        this.y+= this.speedY;
    }
}

function updateGameArea(){
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}