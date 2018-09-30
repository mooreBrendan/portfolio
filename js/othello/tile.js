function tile(index) {
	this.x = index % numTiles;
	this.y = floor(index / numTiles);
	this.index = index;
	this.player = "";
	this.create = function() {
		if (this.player == "") {
			if (turn) {
				this.player = "W";
			} else {
				this.player = "B";
			}
			this.check();
			turn = !turn;
		}
	}
	this.show = function() {
		fill(50, 200, 50);
		rectMode(CENTER);
		rect((this.x + .5) * sizeT, (this.y + .5) * sizeT, sizeT * .95, sizeT * .95);
		if (this.player != "") {
			if (this.player == "W") {
				fill(200);
			} else {
				fill(50);
			}
			ellipseMode(CENTER);
			ellipse((this.x + .5) * sizeT, (this.y + .5) * sizeT, sizeT * .75, sizeT * .75);
		}
	}
	this.check = function() {
		var change = numTiles + 1; //check upper left
		var current = this.index - change;
		var same = false;
		var valid = true;
		while (current >= 0 && !same && valid) {
			if (tiles[current].x < this.x) {
				if (tiles[current].player != this.player) {
					current -= change;
				} else {
					same = true;
				}
			} else {
				valid = false;
			}
		}
		if (same && valid && tiles[this.index - change].player != this.player && tiles[this.index - change].player != "") {
			tiles[this.index - change].player = this.player;
			tiles[this.index - change].check();
		}

		change = numTiles; //check upper
		current = this.index - change;
		same = false;
		valid = true;
		while (current >= 0 && !same && valid) {
			if (tiles[current].x == this.x) {
				if (tiles[current].player != this.player) {
					current -= change;
				} else {
					same = true;
				}
			} else {
				valid = false;
			}
		}
		if (same && valid && tiles[this.index - change].player != this.player && tiles[this.index - change].player != "") {
			tiles[this.index - change].player = this.player;
			tiles[this.index - change].check();
		}

		change = numTiles - 1; //check upper Right
		current = this.index - change;
		same = false;
		valid = true;
		while (current >= 0 && !same && valid) {
			if (tiles[current].x > this.x) {
				if (tiles[current].player != this.player) {
					current -= change;
				} else {
					same = true;
				}
			} else {
				valid = false;
			}
		}
		if (same && valid && tiles[this.index - change].player != this.player && tiles[this.index - change].player != "") {
			tiles[this.index - change].player = this.player;
			tiles[this.index - change].check();
		}

		change = 1; //check left
		current = this.index - change;
		same = false;
		valid = true;
		while (current >= 0 && !same && valid) {
			if (tiles[current].y == this.y) {
				if (tiles[current].player != this.player) {
					current -= change;
				} else {
					same = true;
				}
			} else {
				valid = false;
			}
		}
		if (same && valid && tiles[this.index - change].player != this.player && tiles[this.index - change].player != "") {
			tiles[this.index - change].player = this.player;
			tiles[this.index - change].check();
		}


		change = numTiles + 1; //check lower right
		current = this.index + change;
		same = false;
		valid = true;
		while (current < numTiles * numTiles && !same && valid) {
			if (tiles[current].x > this.x) {
				if (tiles[current].player != this.player) {
					current += change;
				} else {
					same = true;
				}
			} else {
				valid = false;
			}
		}
		if (same && valid && tiles[this.index + change].player != this.player && tiles[this.index + change].player != "") {
			tiles[this.index + change].player = this.player;
			tiles[this.index + change].check();
		}

		change = numTiles; //check lower
		current = this.index + change;
		same = false;
		valid = true;
		while (current < numTiles * numTiles && !same && valid) {
			if (tiles[current].x == this.x) {
				if (tiles[current].player != this.player) {
					current += change;
				} else {
					same = true;
				}
			} else {
				valid = false;
			}
		}
		if (same && valid && tiles[this.index + change].player != this.player && tiles[this.index + change].player != "") {
			tiles[this.index + change].player = this.player;
			tiles[this.index + change].check();
		}

		change = numTiles - 1; //check lower left
		current = this.index + change;
		same = false;
		valid = true;
		while (current < numTiles * numTiles && !same && valid) {
			if (tiles[current].x < this.x) {
				if (tiles[current].player != this.player) {
					current += change;
				} else {
					same = true;
				}
			} else {
				valid = false;
			}
		}
		if (same && valid && tiles[this.index + change].player != this.player && tiles[this.index + change].player != "") {
			tiles[this.index + change].player = this.player;
			tiles[this.index + change].check();
		}

		change = 1; //check lower right
		current = this.index + change;
		same = false;
		valid = true;
		while (current < numTiles * numTiles && !same && valid) {
			if (tiles[current].y == this.y) {
				if (tiles[current].player != this.player) {
					current += change;
				} else {
					same = true;
				}
			} else {
				valid = false;
			}
		}
		if (same && valid && tiles[this.index + change].player != this.player && tiles[this.index + change].player != "") {
			tiles[this.index + change].player = this.player;
			tiles[this.index + change].check();
		}
	}
}
