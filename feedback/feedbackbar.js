const condition = 0;
const first = [15, 55, 80];
const last = [30, 70, 95];

const color1 = { red: 255, green: 0, blue: 0 };
const color2 = { red: 255, green: 255, blue: 0 };
const color3 = { red: 19, green: 233, blue: 19 };

var selected = first[condition] + Math.floor(Math.random() * (last[condition] - first[condition]));
var mySquares = [];

function colorGradient(fadeFraction, rgbColor1, rgbColor2, rgbColor3) {
  var color1 = rgbColor1;
  var color2 = rgbColor2;
  var fade = fadeFraction * 2;

  if (fade >= 1) {
    fade -= 1;
    color1 = rgbColor2;
    color2 = rgbColor3;
  }

  var diffRed = color2.red - color1.red;
  var diffGreen = color2.green - color1.green;
  var diffBlue = color2.blue - color1.blue;

  var gradient = {
    red: parseInt(Math.floor(color1.red + (diffRed * fade)), 10),
    green: parseInt(Math.floor(color1.green + (diffGreen * fade)), 10),
    blue: parseInt(Math.floor(color1.blue + (diffBlue * fade)), 10),
  };

  return 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';
}

function generateSquares() {
  var squares = document.getElementById("squares");
  for (i = 0; i < 50; i++) {
    createSquare(i);
  }
  var threshold = document.createElement('div');
  threshold.classList.add('threshold');
  squares.appendChild(threshold);
  for (i = 50; i < 100; i++) {
    createSquare(i);
  }

  if (condition == 0)
    threshold.classList.add('right-side-text')
}

function createSquare(i) {
  var square = document.createElement('div');
  square.classList.add('square');
  square.style.backgroundColor = colorGradient(i / 100, color1, color2, color3);
  squares.appendChild(square);
  mySquares = mySquares.concat([square]);
}

function getNextStepInRange() {
  if (Math.random() < 0.5) { selected += 1; }
  else { selected -= 1; }
  return Math.max(Math.min(selected, last[condition]), first[condition]);
}

function chooseSelected() {
  mySquares[selected].removeAttribute('id');
  selected = getNextStepInRange();
  mySquares[selected].id = 'selected';
}

generateSquares();
chooseSelected();
setInterval(function () {
  chooseSelected();
}, 3000);
