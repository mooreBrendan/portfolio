const dimension = 600;
const turnLimit = 40;
const numTiles = 8;
const sizeT = dimension / numTiles;

var flipEnable = true;

var plyr;
var tiles = [];
var redPieces;
var blackPieces;
var changeable = true;
var jumpable = false
var flipped = false;

function setup() {
	createCanvas(dimension, dimension);
	plyr = new player();
	for (var i = 0; i < numTiles; i++) {
		for (var j = 0; j < numTiles; j++) {
			tiles[j * numTiles + i] = new tile(i, j);
		}
	}
	var curr = true;
	tiles.forEach((tile, index) => {
		if (curr) {
			tile.possible = true;
			if (index < numTiles * floor(numTiles / 2 - 1)) {
				tile.player = "R";
			} else if (index >= pow(numTiles, 2) - numTiles * floor(numTiles / 2 - 1)) {
				tile.player = "B";
			}
		}
		if (index % numTiles != numTiles - 1 || numTiles % 2) {
			curr = !curr;
		}
	});
}

function draw() {
	background(0);
	redPieces = 0;
	blackPieces = 0;
	tiles.forEach((tile) => {
		if (tile.player == "R") {
			redPieces++;
		} else if (tile.player == "B") {
			blackPieces++;
		}
		tile.show();
		tile.checkPossible();
		plyr.check();
		tile.update();
	});
	if (redPieces == 0) {
		console.log("Black Wins!");
		noLoop();
		tiles.forEach((tile) => tile.show());
	} else if (blackPieces == 0) {
		console.log("Red Wins!");
		noLoop();
		tiles.forEach((tile) => tile.show());
	} else if (plyr.turnCount >= turnLimit) {
		console.log("Turn limit reached: Draw!");
		noLoop();
		tiles.forEach((tile) => tile.show());
	}
}

function checkMoves() {
	jumpable = false;
	var possible = false;
	tiles.forEach((tileMaj, index) => {
		if (tileMaj.player == plyr.turn) {
			plyr.index = index;
			plyr.possible = [];
			tiles.forEach((tileMin) => tileMin.checkPossible());
			if (plyr.possible.length > 0) {
				possible = true;
				plyr.possible.forEach((possibly) => {
					if (abs(possibly - plyr.index) > numTiles + 1) {
						jumpable = true;
					}
				});
			}
		}
	});
	plyr.index = -2 * (numTiles + 2);
	plyr.possible = [];
	plyr.king = false;
	if (!possible) {
		console.log("No Moves");
		tiles.forEach((tile) => tile.show());
		noLoop();
	}
}
