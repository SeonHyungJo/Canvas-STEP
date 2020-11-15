// const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

const canvasEl = document.getElementById('canvas');
const ctx = canvasEl.getContext('2d');

const STROKE_WIDTH = 20

const MAX_X = 400
const MIN_X = 100

const MAX_Y = 200
const MIN_Y = 100

const WIDTH = 500
const HEIGHT = 500
const SPEED = 5

// Netflix RED
const Netflix_RED = '#E50916'

// Shadow Setting
ctx.fillStyle = Netflix_RED;
ctx.strokeStyle = Netflix_RED;
ctx.shadowColor = 'black'
// ctx.shadowOffsetX = -15
// ctx.shadowOffsetY = -5
ctx.shadowBlur = 10
ctx.save()

const ctxI = drawI()
const ctxM = drawM()
const ctxD = drawD()

const animationI = () => (requestAnimationFrame(() => {
  for (let i = 0; i < SPEED; i++) {
    clear()
    ctxI.draw()
  }

  if (!ctxI.possible) return requestAnimationFrame(animationM)
  requestAnimationFrame(animationI)
}))

animationI()

const animationM = () => (requestAnimationFrame(() => {
  for (let i = 0; i < SPEED; i++) {
    clear()
    ctxI.draw()
    ctxM.draw()
    ctxM.drawDia()
    ctxM.drawReverseDia()
    ctxM.drawLast()
  }

  if (!ctxM.possible && !ctxM.possible2 && !ctxM.possible3) return requestAnimationFrame(animationD)
  requestAnimationFrame(animationM)
}))

const animationD = () => (requestAnimationFrame(() => {
  for (let i = 0; i < SPEED; i++) {
    clear()
    ctxI.draw()
    ctxM.draw()
    ctxM.drawDia()
    ctxM.drawReverseDia()
    ctxM.drawLast()
    ctxD.draw()
    ctxD.drawArc()
  }

  if (!ctxD.possibleD) return
  requestAnimationFrame(animationD)
}))

function drawI() {
  const startPos = {
    x: 100,
    y: 100,
    width: STROKE_WIDTH,
    height: 0
  }

  return {
    get possible() {
      return startPos.height <= MAX_Y - MIN_Y
    },

    draw: function () {
      // const gradient = ctx.createLinearGradient(pos.x, pos.y + height / 2, pos.x + width, pos.y + height / 2)
      // gradient.addColorStop(0, '#495464');
      // gradient.addColorStop(0.5, '#bbbfca');
      // gradient.addColorStop(1, '#e8e8e8');
      ctx.fillRect(startPos.x, startPos.y, startPos.width, startPos.height)

      if (this.possible) {
        startPos.height += 1
      }
    }
  }
}


function drawM() {
  const START_X = 150
  const X_STEP = 0.5
  const Y_STEP = 1.5

  const startPos = {
    x: START_X,
    y: MAX_Y,
    width: STROKE_WIDTH,
    height: 0
  }

  const startPosTwo = {
    x: START_X,
    y: MIN_Y,
    count: 1
  }

  const startPosThree = {
    x: START_X + 67 * X_STEP,
    y: MAX_Y,
    count: 1
  }

  const startPosFour = {
    x: START_X + (67 * X_STEP) * 2,
    y: MIN_Y,
    width: STROKE_WIDTH,
    height: 0
  }

  return {
    get possible() {
      return startPos.height > -(MAX_Y - MIN_Y)
    },

    get possible2() {
      return startPosTwo.y + startPosTwo.count * Y_STEP <= MAX_Y
    },

    get possible3() {
      return startPosThree.y - (startPosTwo.count * Y_STEP) > MIN_Y
    },

    get possible4() {
      return startPos.height > -(MAX_Y - MIN_Y)
    },

    draw: function () {
      ctx.fillRect(startPos.x, startPos.y, startPos.width, startPos.height)

      if (this.possible) {
        startPos.height -= 1.5
      }
    },

    drawDia: function () {
      const rightBottom = {
        x: X_STEP * startPosTwo.count,
        y: Y_STEP * startPosTwo.count
      }

      ctx.beginPath();
      ctx.moveTo(startPosTwo.x, startPosTwo.y);
      ctx.lineTo(startPosTwo.x + STROKE_WIDTH, startPosTwo.y);
      ctx.lineTo(startPosTwo.x + STROKE_WIDTH + rightBottom.x, startPosTwo.y + rightBottom.y);
      ctx.lineTo(startPosTwo.x + rightBottom.x, startPosTwo.y + rightBottom.y);
      ctx.fill();
      // ctx.fillRect(startPos.x, startPos.y, startPos.width, startPos.height)

      if (this.possible2) {
        startPosTwo.count += 1
      }
    },

    drawReverseDia: function () {
      const rightBottom = {
        x: X_STEP * startPosThree.count,
        y: Y_STEP * startPosThree.count
      }

      ctx.beginPath();
      ctx.moveTo(startPosThree.x, startPosThree.y);
      ctx.lineTo(startPosThree.x + STROKE_WIDTH, startPosThree.y);
      ctx.lineTo(startPosThree.x + STROKE_WIDTH + rightBottom.x, startPosThree.y - rightBottom.y);
      ctx.lineTo(startPosThree.x + rightBottom.x, startPosThree.y - rightBottom.y);
      ctx.fill();

      if (this.possible3) {
        startPosThree.count += 1
      }
    },

    drawLast: function () {
      ctx.fillRect(startPosFour.x, startPosFour.y, startPosFour.width, startPosFour.height)

      if (this.possible4) {
        startPosFour.height += 1.5
      }
    }
  }
}

function drawD() {
  const startPos = {
    x: 267,
    y: 100,
    width: STROKE_WIDTH,
    height: 0
  }

  const startPosD = {
    x: 267,
    y: MIN_Y + 10,
    count: 0
  }

  return {
    get possible() {
      return startPos.height <= MAX_Y - MIN_Y
    },

    get possibleD() {
      const radius = Math.max(120, (MAX_Y - MIN_Y) - STROKE_WIDTH) / 2;
      const increment = 0.01 / radius;
      const radians = increment * startPosD.count;

      return radians < Math.PI
    },

    draw: function () {
      ctx.fillRect(startPos.x, startPos.y, startPos.width, startPos.height)

      if (this.possible) {
        startPos.height += 1
      }
    },

    drawArc: function () {
      Ellipse(
        startPosD.x, 
        startPosD.y + (MAX_Y - MIN_Y) / 2 - (STROKE_WIDTH / 2), 
        120, 
        (MAX_Y - MIN_Y) - STROKE_WIDTH,
        startPosD.count
      )

      if (this.possibleD) {
        startPosD.count += 150
      }
    },
  }
}

function Ellipse(cx, cy, width, height, count) {
  const ratio = height / width;
  const radius = Math.max(width, height) / 2;
  const increment = 0.01 / radius;
  ctx.lineWidth = 20;
  ctx.beginPath();

  for (let c = 1; c <= count; c += 1) {
    let radians = increment * c;
    const x = cx + radius * Math.sin(radians);
    const y = cy - ratio * radius * Math.cos(radians);
    ctx.lineTo(x, y);
  }

  // for (let radians = increment; radians < PI2; radians += increment) {
  //   const x = cx + radius * Math.sin(radians);
  //   const y = cy - ratio * radius * Math.cos(radians);
  //   ctx.lineTo(x, y);
  // }

  ctx.stroke();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
}