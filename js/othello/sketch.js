const dimension = 600;
const numTiles = 6;

var tiles = [];
var sizeT;
var turn = true; //true=white;false=black
var pressed = false;
var black;
var white;
var unfilled;
function setup() {
	createCanvas(dimension, dimension);
  if(numTiles%2){//if odd, make even
    numTiles+1;
  }
  if(numTiles<4){//if too small make acceptable
    numTiles=6;
  }
  sizeT = dimension / numTiles;
	for (var i = 0; i < numTiles * numTiles; i++) {
		tiles[i] = new tile(i);
	}
  tiles[round(numTiles/2*numTiles+numTiles/2)].player="W";
  tiles[round(numTiles/2*numTiles+numTiles/2)-1].player="B";
  tiles[round(numTiles/2*numTiles+numTiles/2)-numTiles].player="B";
  tiles[round(numTiles/2*numTiles+numTiles/2)-numTiles-1].player="W";
}

function draw() {
	background(0);
  black=0;
  white=0;
  unfilled=0;
	if (mouseIsPressed && !pressed) {
		pressed = true;
		var i = -1;
		var j = -1;
		for (var k = 0; k <= numTiles; k++) {
			if (mouseX > k * sizeT) {
				i++;
			}
			if (mouseY > k * sizeT) {
				j++;
			}
		}
		if (i >= 0 && i < numTiles && j >= 0 && j < numTiles) {
			tiles[j * numTiles + i].create();
		}
	} else if (!mouseIsPressed) {
		pressed = false;
	}

  tiles.forEach((tile) =>{
    tile.show();
    if(tile.player=="W"){
      white++;
    }
    else if(tile.player=="B"){
      black++;
    }
    else{
      unfilled++;
    }
  });
  if(unfilled==0){
    if(white>black){
      console.log("White Wins");
    }
    else if(black>white){
      console.log("Black Wins");
    }
    else{
      console.log("Tie!");
    }
    noLoop();
  }
}
