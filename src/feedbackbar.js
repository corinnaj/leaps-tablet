let condition = new URL(window.location.href).searchParams.get("condition");
if (condition == null) condition = 0;
const endAreaStart = [250, 550, 800];
const endAreaEnd = [100, 650, 950];

const condEndAreaStart = endAreaStart[condition]
const condEndAreaEnd = endAreaEnd[condition]

const color1 = { red: 255, green: 0, blue: 0 };
const color2 = { red: 255, green: 255, blue: 0 };
const color3 = { red: 19, green: 233, blue: 19 };
let selected = 500;
let mySquares = [];
let interval;

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
  for (let i = 0; i < 500; i++) {
    createSquare(i);
  }
  var threshold = document.createElement('div');
  threshold.classList.add('threshold');
  squares.appendChild(threshold);
  for (let i = 500; i < 1000; i++) {
    createSquare(i);
  }

  if (condition == 0)
    threshold.classList.add('right-side-text')
}

function createSquare(i) {
  var square = document.createElement('div');
  square.classList.add('square');
  square.style.backgroundColor = colorGradient(i / 1000, color1, color2, color3);
  squares.appendChild(square);
  mySquares = mySquares.concat([square]);
}

function getNextStepInRange() {
  //if we are outside area move towards it
  if (selected < Math.min(condEndAreaStart, condEndAreaEnd) || selected > Math.max(condEndAreaStart, condEndAreaEnd)) {
    if (selected < condEndAreaStart) selected += 1
    else selected -= 1
    return selected
  }

  //if we are in regular, move up and down randomly
  if (condition == 1) {
    if (Math.random() < 0.5) selected += 1
    else selected -= 1
  } else {
    //else we trend towards the end value
    if (Math.random() < 0.7) selected += Math.sign(condEndAreaEnd - selected)
    else selected += Math.sign(selected - condEndAreaEnd)
  }

  //make sure we cannot leave safe area
  if (selected === condEndAreaEnd || selected === condEndAreaStart)
    selected += Math.sign(condEndAreaStart - condEndAreaEnd)
  return selected
}

function chooseSelected() {
  mySquares[selected].removeAttribute('id');
  selected = getNextStepInRange();
  mySquares[selected].id = 'selected';
}

window.stopFeedbackBar = function () {
  clearInterval(interval)
}

window.showFeedbackBar = function () {
  generateSquares();
  chooseSelected();
  interval = setInterval(chooseSelected, 300)
}
