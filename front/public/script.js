var socket = io.connect();

// socket.on('bienvenido', function(data){
//   console.log(data);
// });

var canvas;
var ctx;
var img;

window.onload = function() {
    canvas = document.querySelector("canvas");
    canvas.width = 700;
    canvas.height = 300;
    ctx = canvas.getContext("2d");
    img = document.getElementById("gonza");
    dibujarGonza();
};

window.addEventListener('mousemove', function(e){
  var {x, y} = getMousePos(e);
  moverOjoIzquierda(x, y);
});

function dibujarGonza(){
  ctx.drawImage(img, 110, 25);
}

function moverOjoIzquierda(x, y){console.log(x, y)
  ctx.clearRect(0, 0, 900, 500);
  dibujarGonza();
  var posX, posY;
  var xMinPos = 135;
  var xMaxPos = 142;
  var yMinPos = 75;
  var yMaxPos = 77;
  x >= xMinPos && x <= xMaxPos ? posX = x : null;
  y >= yMinPos && y <= yMaxPos ? posY = y : null;

  x <= xMinPos ? posX = xMinPos : null;
  x >= xMaxPos ? posX = xMaxPos : null;

  y <= yMinPos ? posY = yMinPos: null;
  y >= yMaxPos ? posY = yMaxPos : null;

  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.arc(posX, posY, 2.5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.arc(posX + 28, posY - 5, 2.5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
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
