function tile(index, mine) {
	this.size = dimension / numLength;
	this.x = (index % numLength + .5) * this.size;
	this.y = (floor(index/numLength) + .5) * this.size;
	this.hide = true;
	this.mine = mine;
	this.neighbor = 0;
	this.flag = false;
	this.index = index;
	this.check = function() {
		if (this.hide) {
			this.hide = false;
			if (this.neighbor == 0) {
				if (this.index % numLength != 0) {
					//left
					tiles[this.index - 1].check();
				}
				if (this.index % numLength != 0 && this.index >= numLength) {
					//top left
					tiles[this.index - numLength - 1].check();
				}
				if (this.index % numLength != numLength - 1 && this.index >= numLength) {
					//top right
					tiles[this.index - numLength + 1].check();
				}
				if (this.index % numLength != 0 && this.index < numLength * numLength - numLength) {
					//bottom left
					tiles[this.index + numLength - 1].check();
				}
				if (this.index % numLength != numLength - 1 && this.index < numLength * numLength - numLength) {
					//bottom right
					tiles[this.index + numLength + 1].check();
				}
				if (this.index % numLength != numLength - 1) {
					//right
					tiles[this.index + 1].check();
				}
				if (this.index >= numLength) {
					//top
					tiles[this.index - numLength].check();
				}
				if (this.index < numLength * numLength - numLength) {
					//bottom
					tiles[this.index + numLength].check();
				}
			}
		}
	}
	this.mineInit = function() {
		this.mine = true;
	}
	this.calcN = function() {
		if (this.index % numLength != 0) {			//check non left bound
			if (tiles[this.index - 1].mine) {
				this.neighbor++;
			}
		}
		if (this.index % numLength != 0 && this.index > numLength - 1) {			//top left
			if (tiles[this.index - numLength - 1].mine) {
				this.neighbor++;
			}
		}
		if (this.index % numLength != numLength - 1 && this.index > numLength - 1) {			//top right
			if (tiles[this.index - numLength + 1].mine) {
				this.neighbor++;
			}
		}
		if (this.index % numLength != 0 && this.index < numLength * numLength - numLength) {			//bottom left
			if (tiles[this.index + numLength - 1].mine) {
				this.neighbor++;
			}
		}
		if (this.index % numLength != numLength - 1 && this.index < numLength * numLength - numLength) {			//bottom right
			if (tiles[this.index + numLength + 1].mine) {
				this.neighbor++;
			}
		}
		if (this.index % numLength != numLength - 1) {			//check non right bound
			if (tiles[this.index + 1].mine) {
				this.neighbor++;
			}
		}
		if (this.index > numLength - 1) {			//check non top
			if (tiles[this.index - numLength].mine) {
				this.neighbor++;
			}
		}
		if (this.index < numLength * numLength - numLength) {			//check not bottom
			if (tiles[this.index + numLength].mine) {
				this.neighbor++;
			}
		}
	}
	this.show = function() {
		if (this.hide) {
			if (!this.flag) {
				fill(200);
			} else {
				fill(127);
			}
			rectMode(CENTER);
			rect(this.x, this.y, this.size * .95, this.size * .95);
		} else {
			if (!this.flag) {
				fill(175);
			} else {
				fill(100);
			}
			rectMode(CENTER);
			rect(this.x, this.y, this.size * .95, this.size * .95);
			if (!this.mine) {
        fill(0);
				textSize(40*(dimension/600)*sqrt(100/(numLength*numLength)));
				textAlign(CENTER);
				text(this.neighbor, this.x, this.y + 10);
			} else {
				fill(0);
				ellipse(this.x, this.y, this.size * .5, this.size * .5);
				if (play) {
					play = false;
				}
			}
		}
	}
}
