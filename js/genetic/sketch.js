var dimension = 600;
var numTiles = 10;
var numCreatures = 100;
var startLength = 5;

var goalIndex = numTiles * numTiles - 1;
var startIndex = 0;
var mutationRate = 10;
var fRate = 60;
var scoring =10;

var sizeT;
var tiles = [];
var creatures = [];
var parents = [];
var all = true;
var started = false;
var longest = startLength;
var totalFit = 0;
var step = 0;
var exsisting;

function setup() {
	checkVars();
	createCanvas(dimension, dimension);
	for (var i = 0; i < numTiles * numTiles; i++) {
		tiles[i] = new tile(i);
	}
}

function draw() {
	frameRate(fRate);
	checkVars();
	background(0);
	if (keyCode != 32 && !started) {
		if (mouseIsPressed) {
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
			if (i >= 0 && j >= 0 && i < numTiles && j < numTiles) {
				tiles[j * numTiles + i].wall = !keyIsDown(16);
			}
		}
	} else if (!started) { //init
		for (i = 0; i < numCreatures; i++) {
			creatures[i] = new creature();
			creatures[i].newInit();
		}
    exsisting = numCreatures;
		longest = startLength;
		started = true;
		fRate = 1;
		console.log("started");
	} else {
    while(numCreatures>exsisting){
      creatures[exsisting]=new creature();
      creatures[exsisting].newInit();
      exsisting++;
    }
		if (step < longest) { //update
			// for (var i = 0; i < numCreatures; i++) {
			// 	creatures[i].update(step);
			// }
      creatures.forEach((creature) => creature.update(step));
			step++;
		} else {
			step = 0;
			totalFit = 0;
      creatures.forEach((creature) => totalFit+=creature.fit);
      var avg=totalFit/numCreatures;
      var validCreatures=[];
      totalFit=0;
      for(var i=0;i<numCreatures;i++){
        if(creatures[i].fit>avg){
          totalFit+=creatures[i].fit;
          validCreatures[validCreatures.length]=creatures[i];
        }
      }
			if (totalFit <= 2) {//prevent a total failure
				for (i = 0; i < numCreatures; i++) {
					creatures[i].newInit();
				}
			} else {
				for (i = 0; i < numCreatures; i++) {
					var parent1Fit = random(0, totalFit);
					var parent2Fit = random(0, totalFit);
					var parent1;
					var parent2;
					var current = 0;
					while (parent1Fit > 0) {
						if (parent1Fit <= validCreatures[current].fit) {
							parent1 = validCreatures[current];
							parent1Fit = 0;
						} else {
							parent1Fit -= validCreatures[current].fit;
              current++;
						}
					}
					current = 0;
					while (parent2Fit > 0) {
						if (parent2Fit <= validCreatures[current].fit) {
							parent2 = validCreatures[current];
							parent2Fit = 0;
						} else {
							parent2Fit -= validCreatures[current].fit;
              current++;
						}
					}
					creatures[i].childInit(parent1, parent2);
				}
        longest=0;
        for(var i=0;i<numCreatures;i++){
          creatures[i].resetVal();
          creatures[i].mutate();
          if(creatures[i].length>longest){
            longest=creatures[i].length;
          }
        }
			}
		}
	}
	for (var i = 0; i < numTiles * numTiles; i++) { //show
		tiles[i].show();
	}
	if (started) {
		for (var i = 0; i < numCreatures; i++) { //show
			creatures[i].show();
		}
	}
}

function checkVars() {
	sizeT = dimension / numTiles;
	if (numTiles < 2) {
		numTiles = 2;
	}
	if (startIndex < 0 || startIndex >= numTiles * numTiles) {
		startIndex = 0;
	}
	if (goalIndex < 0 || goalIndex >= numTiles * numTiles) {
		goalIndex = 0;
	}
	if (startIndex == goalIndex) {
		if (goalIndex > 0) {
			startIndex = 0;
		} else {
			startIndex = 1;
		}
	}
	if (mutationRate < 0 || mutationRate > 100) {
		mutationRate = 10;
	}
}
