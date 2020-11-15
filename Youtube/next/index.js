const canvasEl = document.getElementById('canvas');
const ctx = canvasEl.getContext('2d');

const { width: CANVAS_WIDTH, height: CANVAS_HEIGHT } = canvasEl.getClientRects()[0]

const STROKE_WIDTH = 10
const DEFAULT_LEN = 30
const START_POINT = {
  x: 75,
  y: 50
}

let count = 0

const draw = () => {
  drawEllipse(START_POINT.x - 5, START_POINT.y, DEFAULT_LEN * 1.5, DEFAULT_LEN * 1.5, count)

  if (count < 10000) {
    count += 10

    requestAnimationFrame(draw)
  }
}

requestAnimationFrame(draw)


ctx.fillStyle = '#fdc4b6'
ctx.strokeStyle = '#fdc4b6'

drawTriangle(START_POINT.x, START_POINT.y, DEFAULT_LEN)
drawVerticalStick(START_POINT.x + 5, START_POINT.y - DEFAULT_LEN / 2, DEFAULT_LEN)


// 정삼각형 그리기
function drawTriangle(cx, cy, length) {
  const middleLen = Math.sqrt(Math.pow(length, 2) * (1 / 2))
  const halfLen = length / 2

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx - middleLen, cy - halfLen);
  ctx.lineTo(cx - middleLen, cy + halfLen);
  ctx.closePath();

  ctx.fill();
}

// 막대 그리기
function drawVerticalStick(cx, cy, length) {
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy + length);
  ctx.closePath();

  ctx.lineWidth = STROKE_WIDTH

  ctx.stroke();
}

// 원형 그리기
function drawEllipse(cx, cy, width, height, count) {
  const ratio = height / width;
  const radius = Math.max(width, height) / 2;
  const increment = 0.1 / radius;
  ctx.lineWidth = STROKE_WIDTH / 2;
  ctx.strokeStyle = 'black'

  // ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  ctx.beginPath();

  for (let c = 1; c <= count; c += 1) {
    const radians = increment * c;
    const x = cx + radius * Math.sin(radians);
    const y = cy - ratio * radius * Math.cos(radians);
    
    ctx.lineTo(x, y);
  }

  ctx.stroke();
}