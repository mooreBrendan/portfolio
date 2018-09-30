function tile(x, y) {
	this.x = x;
	this.y = y;
	this.index = y * numTiles + x;
	this.player = "";
	this.create = function() {
		if (this.player == "") {
			if (keyIsDown(82) != keyIsDown(66)) {
				if (keyIsDown(82) && !rPressed) { //R
					this.player = "R";
					rPressed = true;
          turn=!turn;
          if(turn){
            console.log("Order's Turn");
          }
          else{
            console.log("Chaos's Turn");
          }
				}
				else if (keyIsDown(66) && !bPressed) {
					this.player = "B";
					bPressed = true;
          turn=!turn;
          if(turn){
            console.log("Order's Turn");
          }
          else{
            console.log("Chaos's Turn");
          }
				}
			}
			if (!keyIsDown(82)) {
				rPressed = false;
			}
			if (!keyIsDown(66)) {
				bPressed = false;
			}
		}
	}
	this.show = function() {
		fill(200);
		rectMode(CENTER);
		rect((this.x + .5) * sizeT, (this.y + .5) * sizeT, sizeT * .95, sizeT * .95);
		if (this.player != "") {
			if (this.player == "R") {
				fill(255, 0, 0);
			} else {
				fill(0, 0, 255);
			}
			ellipseMode(CENTER);
			ellipse((this.x + .5) * sizeT, (this.y + .5) * sizeT, sizeT * .75, sizeT * .75);
		}
	}
	this.check = function() {
		var match = 0;
		var complete = false;
		if (this.index % numTiles <= numTiles - lineLength) { //check Horizontal
			for (var i = this.index % numTiles; i < numTiles; i++) {
				if (tiles[this.y * numTiles + i].player == this.player && this.player != "" && tiles[this.y * numTiles + i].y == this.y) {
					match++;
				} else {
					i = numTiles;
				}
			}
			if (match >= lineLength) {
				complete = true;
			}
		}
		match = 0;
		if (floor(this.index / numTiles) <= numTiles - lineLength) { //check vertical
			for (var i = floor(this.index / numTiles); i < numTiles; i++) {
				if (tiles[this.x + i * numTiles].player == this.player && this.player != "" && tiles[this.x + i * numTiles].x == this.x) {
					match++;
				} else {
					i = numTiles;
				}
			}
			if (match >= lineLength) {
				complete = true;
			}
		}

		match = 0;
		var current = this.index;
		while (current < numTiles * numTiles) { //check y=-x
			if (tiles[current].player == this.player && this.player != "" && tiles[current].x >= this.x) {
				match++;
			} else {
				current = numTiles * numTiles;
			}
			current += numTiles + 1;
		}
		if (match >= lineLength) {
			complete = true;
		}
		match = 0;
		current = this.index;
		while (current >= 0) { //y=x
			if (tiles[current].player == this.player && this.player != "" && tiles[current].x >= this.x) {
				match++;
			} else {
				current = 0;
			}
			current -= numTiles - 1;
		}
		if (match >= lineLength) {
			complete = true;
		}
		if (complete) {
			console.log("Order Wins");
			noLoop();
		}
	}
}
