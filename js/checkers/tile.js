function tile(x, y) {
	this.x = x;
	this.y = y;
	this.index = this.y * numTiles + this.x;
	this.player = "";
	this.possible = false;
	this.king = false;
	this.show = function() {
		if (flipped) {
			this.dispX = (this.x + .5) * sizeT;
			this.dispY = (this.y + .5) * sizeT;
		} else {
			this.dispX = dimension - (this.x + .5) * sizeT;
			this.dispY = dimension - (this.y + .5) * sizeT;
		}
		if (mouseIsPressed) {
			if (changeable && mouseX < this.dispX + sizeT / 2 && mouseX > this.dispX - sizeT / 2 && mouseY < this.dispY + sizeT / 2 && mouseY > this.dispY - sizeT / 2 && this.player == plyr.turn) {
				plyr.index = this.index;
				plyr.possible = [];
				plyr.king = this.king;
			}
		}
		if (plyr.index == this.index && this.player == plyr.turn) {
			this.r = 50;
			this.b = 150;
			this.g = 50;
		} else if (plyr.possible.includes(this.index)) {
			this.r = 100;
			this.g = 200;
			this.b = 100;
		} else {
			if (this.possible) {
				this.r = 100;
				this.g = 100;
				this.b = 100;
			} else {
				this.r = 200;
				this.g = 200;
				this.b = 200;
			}
		}
		if (this.index < 8) {
			this.r += 50;
		} else if (this.index >= pow(numTiles, 2) - numTiles) {
			if (this.possible) {
				this.r -= 25;
				this.g -= 25;
				this.b -= 25;
			} else {
				this.r -= 75;
				this.g -= 75;
				this.b -= 75;
			}
		}
		fill(this.r, this.g, this.b);
		rectMode(CENTER);
		rect(this.dispX, this.dispY, .95 * sizeT, .95 * sizeT);
		if (this.player != "") {
			if (this.player == "R") {
				fill(200, 0, 0);
			} else if (this.player == "B") {
				fill(10, 10, 10);
			}
			ellipse(this.dispX, this.dispY, sizeT * .8, sizeT * .8);
		}
		if (this.king) {
			fill(255);
			textSize(32 * dimension / 600);
			textAlign(CENTER, CENTER);
			text("K", this.dispX, this.dispY);
		}
	}
	this.update = function() {
		if (mouseIsPressed) {
			var i = 0;
			var j = 0;
			for (var k = 1; k <= numTiles; k++) {
				if (mouseX >= k * dimension / numTiles) {
					i++;
				}
				if (mouseY >= k * dimension / numTiles) {
					j++;
				}
			}
			if (i < numTiles && j < numTiles) {
				if (!flipped) {
					i = (numTiles - 1) - i;
					j = (numTiles - 1) - j;
				}
				var index = j * numTiles + i;
				if (plyr.possible.includes(index)) {
					tiles[index].player = plyr.turn; //move
					tiles[index].king = plyr.king;
					tiles[plyr.index].king = false; //clear previous
					tiles[plyr.index].player = "";
					if ((index < numTiles && plyr.turn == "B") || (index > (numTiles - 1) * numTiles && plyr.turn == "R")) {
						tiles[index].king = true;
					}
					if (abs(index - plyr.index) > numTiles + 1) { //remove intermediate
						tiles[plyr.index + (index - plyr.index) / 2].player = "";
						tiles[plyr.index + (index - plyr.index) / 2].king = false;
						tiles[index].checkMulti();
					} else {
						changeable = true;
						plyr.turnCount = plyr.turn == "B" ? plyr.turnCount + 1 : plyr.turnCount;
						plyr.turn = plyr.turn == "R" ? "B" : "R";
						checkMoves();
						if (flipEnable) { //flip board
							flipped = !flipped;
						}
					}
				}
			}
		}
	}
	this.checkPossible = function() {
		if (changeable) {
			if (plyr.turn == "R" || plyr.king) {
				if (this.index == plyr.index + numTiles - 1 && this.index % numTiles != numTiles - 1) {
					if (this.player == "") {
						if (!plyr.possible.includes(this.index)) {
							append(plyr.possible, this.index);
						}
					} else if (this.player != plyr.turn && this.index + numTiles - 1 < pow(numTiles, 2)) {
						if (tiles[this.index + numTiles - 1].player == "" && (this.index + numTiles - 1) % numTiles != numTiles - 1 && !plyr.possible.includes(this.index + numTiles - 1)) {
							append(plyr.possible, this.index + numTiles - 1);
						}
					}
				} else if (this.index == plyr.index + numTiles + 1 && this.index % numTiles != 0) {
					if (this.player == "") {
						if (!plyr.possible.includes(this.index)) {
							append(plyr.possible, this.index);
						}
					} else if (this.player != plyr.turn && this.index + numTiles + 1 < pow(numTiles, 2)) {
						if (tiles[this.index + numTiles + 1].player == "" && (this.index + numTiles + 1) % numTiles != 0 && !plyr.possible.includes(this.index + numTiles + 1)) {
							append(plyr.possible, this.index + numTiles + 1);
						}
					}
				}
			}
			if (plyr.turn == "B" || plyr.king) {
				if (this.index == plyr.index - (numTiles - 1) && this.index % numTiles != 0) {
					if (this.player == "") {
						if (!plyr.possible.includes(this.index)) {
							append(plyr.possible, this.index);
						}
					} else if (this.player != plyr.turn && this.index - (numTiles - 1) >= 0) {
						if (tiles[this.index - (numTiles - 1)].player == "" && (this.index - (numTiles - 1)) % numTiles != 0 && !plyr.possible.includes(this.index - (numTiles - 1))) {
							append(plyr.possible, this.index - (numTiles - 1));
						}
					}
				} else if (this.index == plyr.index - (numTiles + 1) && this.index % numTiles != numTiles - 1) {
					if (this.player == "") {
						if (!plyr.possible.includes(this.index)) {
							append(plyr.possible, this.index);
						}
					} else if (this.player != plyr.turn && this.index - numTiles + 1 >= 0) {
						if (tiles[this.index - (numTiles + 1)].player == "" && (this.index - numTiles + 1) % numTiles != numTiles - 1 && !plyr.possible.includes(this.index - (numTiles + 1))) {
							append(plyr.possible, this.index - (numTiles + 1));
						}
					}
				}
			}
		}
	}
	this.checkMulti = function() {
		var count = 0;
		plyr.index = this.index;
		plyr.possible = [];
		if (this.index + 2 * (numTiles + 1) < pow(numTiles, 2) && (this.player == "R" || (this.player == "B" && this.king))) {
			if (tiles[this.index + 2 * (numTiles + 1)].player == "" && tiles[this.index + (numTiles + 1)].player != this.player && tiles[this.index + (numTiles + 1)].player != "" && (this.index + 2 * (numTiles + 1)) % numTiles > 1) { //&&(this.index+18)%8>1
				count++;
				if (!plyr.possible.includes(this.index + 2 * (numTiles + 1))) {
					append(plyr.possible, this.index + 2 * (numTiles + 1));
				}
			}
			if (tiles[this.index + 2 * (numTiles - 1)].player == "" && tiles[this.index + (numTiles - 1)].player != this.player && tiles[this.index + (numTiles - 1)].player != "" && (this.index + 2 * (numTiles - 1)) % numTiles < numTiles - 2) { //&&(this.index+14)%8<6
				count++;
				if (!plyr.possible.includes(this.index + 2 * (numTiles - 1))) {
					append(plyr.possible, this.index + 2 * (numTiles - 1));
				}
			}
		}
		if (this.index - 2 * (numTiles + 1) >= 0 && (this.player == "B" || (this.player == "R" && this.king))) {
			if (tiles[this.index - 2 * (numTiles + 1)].player == "" && tiles[this.index - (numTiles + 1)].player != this.player && tiles[this.index - (numTiles + 1)].player != "" && (this.index - 2 * (numTiles + 1)) % numTiles < numTiles - 2) { //&&(this.index-18)%8<6
				count++;
				if (!plyr.possible.includes(this.index - 2 * (numTiles + 1))) {
					append(plyr.possible, this.index - 2 * (numTiles + 1));
				}
			}
			if (tiles[this.index - 2 * (numTiles - 1)].player == "" && tiles[this.index - (numTiles - 1)].player != this.player && tiles[this.index - (numTiles - 1)].player != "" && (this.index - 2 * (numTiles - 1)) % numTiles > 1) { //&&(this.index-14)%8>1
				count++;
				if (!plyr.possible.includes(this.index - 2 * (numTiles - 1))) {
					append(plyr.possible, this.index - 2 * (numTiles - 1));
				}
			}
		}
		if (count > 0) {
			changeable = false;
			plyr.index = this.index; //reset player
		} else {
			changeable = true;
			plyr.turn = plyr.turn == "R" ? "B" : "R";
			checkMoves();
			if (flipEnable) { //flip board
				flipped = !flipped;
			}
		}
	}
}
