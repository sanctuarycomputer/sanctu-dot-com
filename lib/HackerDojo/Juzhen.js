// https://codepen.io/yaclive/pen/EayLYO
function start() {
  const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const fontSize = 10,
    columns = canvas.width / fontSize;

  const letters =
    '頁 - 設 - 是 - 煵 - 엌 - 嫠 - 쯦 - 案 - 煪 - ㍱ - 從 - つ - 浳 - 浤 - 搰 - ㍭ - 煤 - 洳 - 橱 - 橱 - 迎 - 事 - 網 - 計 - 簡 - 大 ㍵ - 畱 - 煵 - 田 - 煱 - 둻 - 睤 - ㌹ - 楤 - ぱ - 椹 - ぱ - 頹 - 衙'.split(
      ''
    );

  let drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function draw() {
    ctx.fillStyle = 'rgba(255, 255, 255, .1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < drops.length; i++) {
      var text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillStyle = '#173963';
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      drops[i]++;
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
        drops[i] = 0;
      }
    }
  }

  const timer = setInterval(draw, 33);
  return { canvas, timer };
}

const Juzhen = {
  timer: null,
  canvas: null,

  toggle() {
    if (Juzhen.timer) {
      clearInterval(Juzhen.timer);
      Juzhen.timer = null;
      if (Juzhen.canvas) {
        Juzhen.canvas
          .getContext('2d')
          .clearRect(0, 0, Juzhen.canvas.width, Juzhen.canvas.height);
        Juzhen.canvas = null;
      }
    } else {
      const { timer, canvas } = start();
      Juzhen.timer = timer;
      Juzhen.canvas = canvas;
    }
  },
};

export default Juzhen;
