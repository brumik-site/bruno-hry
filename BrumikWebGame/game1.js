const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = 100;
let y = 100;
const speed = 5;

const keys = {};
let score = 0;

let coin = generateCoin();

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function enterFullscreen() {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) {
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) {
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) {
    canvas.msRequestFullscreen();
  }
  resizeCanvasToFullScreen();
}

function resizeCanvasToFullScreen() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function generateCoin() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 20
  };
}

function checkCoinCollision() {
  const dx = x - coin.x;
  const dy = y - coin.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < coin.size) {
    score++;
    coin = generateCoin(); // Vygeneruje novou minci
  }
}

canvas.addEventListener('click', enterFullscreen);

function gameLoop() {
  if (keys["w"]) y -= speed;
  if (keys["s"]) y += speed;
  if (keys["a"]) x -= speed;
  if (keys["d"]) x += speed;

  if (keys["W"]) y -= speed;
  if (keys["S"]) y += speed;
  if (keys["A"]) x -= speed;
  if (keys["D"]) x += speed;

  checkCoinCollision();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "gold";
  ctx.beginPath();
  ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "lime";
  ctx.fillRect(x, y, 50, 50);

  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  requestAnimationFrame(gameLoop);
}

resizeCanvasToFullScreen();
window.addEventListener('resize', resizeCanvasToFullScreen);

gameLoop();
