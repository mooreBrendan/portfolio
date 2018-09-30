const dimension = 600;
const numTiles=6;
const lineLength=5;
const sizeT = dimension / numTiles;

var bPressed=false;
var rPressed=false;
var tiles = [];
var turn=true;
function setup() {
	createCanvas(dimension, dimension);
	for (var j = 0; j < numTiles; j++) {
		for (var i = 0; i < numTiles; i++) {
			tiles[j * numTiles + i] = new tile(i, j);
		}
	}
  console.log("Order's Turn");
}

function draw() {
	var i = -1;
	var j = -1;
  var unfilled=0;
	for (var k = 0; k <= numTiles; k++) {
		if (mouseX > k * dimension / numTiles) {
			i++;
		}
		if (mouseY > k * dimension / numTiles) {
			j++;
		}
	}
	if (i >= 0 && i < numTiles && j >= 0 && j < numTiles) {
		tiles[j * numTiles + i].create();
	}
  tiles.forEach((tile) => {
    tile.show();
    tile.check();
    if(tile.player==""){
      unfilled++;
    }
  });
  if(unfilled==0){
    console.log("Chaos Wins");
    noLoop();
  }
}

function rules(){
  console.log("There are two players, order and chaos, that take turns placing pieces.  Order is attempting to get "+lineLength+" pieces of the same type in a row.  Chaos is trying to stop that. The two types of pieces are red and blue and can be placed by pressing \"R\" and \"B\" with the cursor over the tile.  Both players can place either type of tile at any time.");
}
