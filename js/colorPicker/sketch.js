const dimension = 800;

var difference = 100;
var sizeT = 10;
var score = 0;
var currColor = [];
var colorVal;

var tiles = [];
var numWidth = 0;
var numHeight = 0;
var pressed=false;

function setup() {
	createCanvas(dimension, dimension);
	init();
}

function draw() {
  if(colorVal>255){
    background(0);
  }
  else{
    background(255);
  }
	tiles.forEach((tile) => tile.show());

	if (mouseIsPressed && !pressed) {
    pressed = true;
		for (var i = 0; i < tiles.length; i++) {
			if (tiles[i].clicked()) {
				i = tiles.length;
				init();
			}
		}
	} else if (!mouseIsPressed) {
		pressed = false;
	}
}

function init() {
	tiles = [];
  var numTiles = 3 + score;
  numHeight = numTiles;
  numWidth = 1;
  while ((abs((numHeight / numWidth) - 1.61803399) > abs(((numHeight - 1) / (numWidth + 1)) - 1.61803399) || numTiles % numWidth == 1) && ceil(numTiles/numWidth) > 1) {
    numWidth++;
    numHeight=ceil(numTiles/numWidth);
  }
  if (numWidth > numHeight) {
    sizeT = dimension / numWidth;
  } else {
    sizeT = dimension / numHeight;
  }
  colorVal=0;
	for (var i = 0; i < 3; i++) {
		currColor[i] = round(random(-.49, 255.49));
    colorVal+=currColor[i];
	}
	for (var i = 0; i < numTiles; i++) {
		tiles[i] = new tile(currColor, i);
	}
	tiles[round(random(-.49, numTiles-.51))].change();
}
