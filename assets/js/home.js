var colors = ["#95FFCA", "#95FFFF"];

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function init() {
  resizeCanvas();
  window.requestAnimationFrame(draw);
}

var position1 = {
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight
};

var position2 = {
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight
};

var delta1 = {
  x: 3,
  y: 4
}
var delta2 = {
  x: 3,
  y: 2
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

  context.globalCompositeOperation = 'color-dodge';

  drawCircle(192, position1, delta1, colors[0]);
  drawCircle(192, position2, delta2, colors[1]);

  window.requestAnimationFrame(draw);
}

function drawCircle(radius, position, delta, color) {
  context.save();
  context.beginPath();
  context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();

  if (position.x<0 || position.x>window.innerWidth) delta.x = -delta.x;
  if (position.y<0 || position.y>window.innerHeight) delta.y = -delta.y;
  position.x += delta.x;
  position.y += delta.y;
}

init();


