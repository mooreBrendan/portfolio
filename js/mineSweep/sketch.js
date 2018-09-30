//modifiable before execution
const dimension = 600;
const numLength = 20;
const numMine = 20;

//unmodifiable
const percentM = numMine / (numLength * numLength);
var tiles = [];
var pressed = false;
var flagged = false;
var mineFlag;
var unknown;
var play = true;

function setup() {
	if (numMine < numLength * numLength) {
		var mineCopy = numMine;
		createCanvas(dimension, dimension);
    for(var i=0;i<numLength*numLength;i++){
      var mn = false;
      if (random(0, 1) < percentM && mineCopy > 0) {
        mn = true;
        mineCopy--;
      }
      tiles[i] = new tile(i, mn);
    }
		while (mineCopy > 0) {
			var randVal = round(random(0, numLength*numLength-1));
			if (tiles[randVal].mine == false) {
				tiles[randVal].mine = true;
				mineCopy--;
			}
		}
    tiles.forEach((tile) => tile.calcN());
	} else {
		console.log("field to small for number of mines");
	}
}

function draw() {
	if (numMine > numLength * numLength) {//dont run if invalid
		noLoop();
	}
  else {
		background(51);
		if (play) {
			mineFlag = 0;
			unknown = 0;
			var i = -1;
			var j = -1;
			for (var k = 0; k <= numLength; k++) {
				if (mouseX > k * dimension / numLength) {
					i++;
				}
				if (mouseY > k * dimension / numLength) {
					j++;
				}
			}
			if (i != numLength && j != numLength&&i>=0&&j>=0) {
				if (keyIsDown(70) && tiles[j * numLength + i].hide && !flagged) {
					flagged = true;
					tiles[j * numLength + i].flag = !tiles[j * numLength + i].flag;
				} else if (!keyIsDown(70)) {
					flagged = false;
				}
				if (mouseIsPressed && pressed == false) { //
					pressed = true;
					if (!tiles[j * numLength + i].flag) {
						tiles[j * numLength + i].check();
					}
				} else if (!mouseIsPressed) {
					pressed = false;
				}
			}
      tiles.forEach( (tile) => {
        tile.show();
        if (tile.mine && tile.flag) {
          mineFlag++;
        }
        if (!tile.hide) {
          unknown++;
        }
      });

			unknown = numLength * numLength - mineFlag - unknown;
			if (mineFlag == numMine && unknown == 0) {
				play = false;
			}
		} else {
      tiles.forEach((tile)=>{
  			tile.hide = false;
  			tile.show();
      })
			if (mineFlag != numMine && unknown != 0) {
				console.log("You Lose!");
			} else {
				console.log("You Win!");
			}
			noLoop();
		}
	}
}
