var socket = io.connect();

window.onload = function(){startGame()}

var monsters = [];
var speed = 2;
var time = 2000;
var interval;
var points = 0;

function startGame(){
    myGameArea.start();
    backgroundImage = new Image(626, 391, 'background', 0, 0);
    mouseImage = new Image(50, 50, 'spaceship', myGameArea.canvas.width / 2, myGameArea.canvas.height / 2);
    score = new Text(`Score: ${points}`, 490, 30, 'white');
    startGeneratingMonsters();
    myGameArea.canvas.addEventListener('mousemove', updateMousePosition);
}

var myGameArea = {
    canvas : document.querySelector("canvas"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 10);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function Text(text, x, y, color){
    this.text = text;
    this.x = x;
    this.y = y;
    this.color = color;
    this.update = function(){
        myGameArea.context.fillStyle = color;
        myGameArea.context.font = "30px Arial";
        myGameArea.context.fillText(`Score: ${points}`, x, y);
    }
}

function Image(width, height, image, x, y, type = null, speed = 2){
    this.width = width;
    this.height = height;
    this.image = document.getElementById(image);
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.update = function(){
        if(type == 'monster'){
            this.x += this.speed;
            if(this.x + this.width >= mouseImage.x &&
               this.x <= mouseImage.x + mouseImage.width &&
               this.y >=mouseImage.y &&
               this.y <= mouseImage.y + mouseImage.height){
                  gameOver();
            }
        }
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y);
    }
}

function updateMousePosition(e){
    mouseImage.x = e.clientX - canvas.offsetLeft;
    mouseImage.y = e.clientY - canvas.offsetTop;
}

function updateGameArea() {
    myGameArea.clear();
    backgroundImage.update();
    score.update();
    mouseImage.update();
    monsters.forEach(function(monster){
        monster.update();
    });
}

function startGeneratingMonsters(){
    interval = setInterval(generateRandomMonsters, time);
}

function generateRandomMonsters(){
    var x = -130;
    var y = Math.round(Math.random() * (myGameArea.canvas.height - 50));
    if(monsters.length % 4 == 0){
        speed++;
    }
    var monster = new Image(50, 50, 'monster', x, y, 'monster', speed);
    points++;
    monsters.push(monster);
}

function gameOver(){
    clearInterval(interval);
    clearInterval(myGameArea.interval);
    myGameArea.context.fillStyle = 'white';
    myGameArea.context.font = "30px Arial";
    myGameArea.context.fillText("Game over", 235, 200);
}














function Circle(x, y, size, color){
    this.x = x;
    this.y = y;
    this.size = size;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function clearCircle(context,x,y,radius) {
  	context.save();
  	context.beginPath();
  	context.arc(x, y, radius, 0, 2*Math.PI, true);
  	context.clip();
  	context.clearRect(x-radius,y-radius,radius*2,radius*2);
  	context.restore();
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, this.width, this.height);
    }
}

function writeText(text, x, y, color){
    ctx.font = '12px Arial';
    ctx.fillStyle = color;
    var i = 0;
    var interval = setInterval(function(){
      if(i < text.length){
          ctx.fillText(text[i], x, y);
          switch(text[i]){
              case 'f': case 'i': case 'j': case 'l': case 'r': case 't': x+=4; break;
              case 'c': x+=5; break;
              case 'm': x+=11; break;
              case 'w': x+= 9.7; break;
              default: x+=7;
          }
          i++;
      }else{
          clearInterval(interval);
      }
    }, 100);
}

function  getMousePos(e) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (e.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (e.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }

}
