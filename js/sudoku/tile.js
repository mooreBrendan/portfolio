function tile(x, y) {
	this.x = (x + .5) * sizeT+floor(x/numSquare)*padding;
	this.y = (y + .5) * sizeT+floor(y/numSquare)*padding;
  this.actX=x;
  this.actY=y
	this.index = y * numTiles + x;
	this.initialize = function(initial) {
		this.val = initial[this.actY][this.actX];
    this.horizontal = [];
    this.vertical = [];
    this.group = [];
    this.possible = [];
		var i = 0;
		var j = 0;
		for (var k = 0; k < numSquare; k++) {
			if (this.index % numTiles >= k * numSquare && this.index % numTiles < (k + 1) * numSquare) {
				i = k;
			}
			if (floor(this.index / numTiles) >= k * numSquare && floor(this.index / numTiles) < (k + 1) * numSquare) {
				j = k;
			}
		}
		tiles.forEach((tile, index) => {
			if (this.index != index) {
				if (this.y == tile.y) {
					append(this.horizontal, tile.index);
				}
				if (this.x == tile.x) {
					append(this.vertical, tile.index);
				}
				if (tile.index % numTiles >= i * numSquare && tile.index % numTiles < (i + 1) * numSquare) {
					if (floor(tile.index / numTiles) >= j * numSquare && floor(tile.index / numTiles) < (j + 1) * numSquare) {
						append(this.group, tile.index);
					}
				}
			}
		});
		if (this.val == 0) {
			for (var i = 1; i <= numTiles; i++) {
				this.possible[i - 1] = i;
			}
		}
	}
	this.check = function() {
		this.horizontal.forEach((tile) => { //if value exists in horizontal it is not a possible value
			if (!checkNew(this.possible, tiles[tile].val)) {
				this.possible.forEach((possible, index) => {
					if (possible == tiles[tile].val) {
						this.possible.splice(index, 1);
					}
				});
			}
		});
		this.vertical.forEach((tile) => { //if value exists in vertical it is not a possible value
			if (!checkNew(this.possible, tiles[tile].val)) {
				this.possible.forEach((possible, index) => {
					if (possible == tiles[tile].val) {
						this.possible.splice(index, 1);
					}
				});
			}
		});
		this.group.forEach((tile) => { //if value exists in group it is not a possible value
			if (!checkNew(this.possible, tiles[tile].val)) {
				this.possible.forEach((possible, index) => {
					if (possible == tiles[tile].val) {
						this.possible.splice(index, 1);
					}
				});
			}
		});
    //Naked double,triple,etc.
		var tempSame = [this.index];
		this.group.forEach((tile) => {
			if (compArry(this.possible, tiles[tile].possible)||(tiles[tile].possible.length>=1&&arrayIn(this.possible,tiles[tile].possible))) {
				append(tempSame, tile);
			}
		});
		if (tempSame.length == this.possible.length) {
			this.group.forEach((tile) => {
				if (checkNew(tempSame, tile)) { //if tile is not the same
					for (var i = 0; i < tiles[tile].possible.length; i++) {
						if (this.possible.includes(tiles[tile].possible[i])) { //if tile's possible val is in this possible list
							tiles[tile].possible.splice(i, 1);
              i--;
						}
					}
				}
			});
		}
		tempSame = [this.index];
		this.vertical.forEach((tile) => {
			if (compArry(this.possible, tiles[tile].possible)||(tiles[tile].possible.length>=1&&arrayIn(this.possible,tiles[tile].possible))) {
				append(tempSame, tile);
			}
		});
		if (tempSame.length == this.possible.length) {
			this.vertical.forEach((tile) => {
				if (checkNew(tempSame, tile)) { //if tile is not the same
					for (var i = 0; i < tiles[tile].possible.length; i++) {
						if (this.possible.includes(tiles[tile].possible[i])) { //if tile's possible val is in this possible list
							tiles[tile].possible.splice(i, 1);//remove it
              i--;
						}
					}
				}
			});
		}
		tempSame = [this.index];
		this.horizontal.forEach((tile) => {
			if (compArry(this.possible, tiles[tile].possible)||(tiles[tile].possible.length>=1&&arrayIn(this.possible,tiles[tile].possible))) {
				append(tempSame, tile);
			}
		});
		if (tempSame.length == this.possible.length) {
			this.horizontal.forEach((tile) => {
				if (checkNew(tempSame, tile)) { //if tile is not the same
					for (var i = 0; i < tiles[tile].possible.length; i++) {
						if (this.possible.includes(tiles[tile].possible[i])) { //if tile's possible val is in this possible list
							tiles[tile].possible.splice(i, 1);
              i--;
						}
					}
				}
			});
		}
		for (var i = 1; i <= numTiles; i++) {
			if (this.val == 0) {
				var only = true;
				this.horizontal.forEach((tile) => { //if current is only possible position for the value
					if (!checkNew(tiles[tile].possible, i) || tiles[tile].val == i) { //if not new or already a value
						only = false;
					}
					//console.log(tile+"\t"+tiles[tile].possible+"\t"+only)
				});
				if (only) {
					this.val = i;
					this.possible = [];
					//console.log("horiz");
				} else {
					only = true;
					this.vertical.forEach((tile) => { //if current is only possible position for the value
						if (!checkNew(tiles[tile].possible, i) || tiles[tile].val == i) {
							only = false;
						}
					});
					if (only) {
						this.val = i;
						this.possible = [];
						//console.log("vert")
					} else {
						var only = true;
						this.group.forEach((tile) => { //if current is only possible position for the value
							if (!checkNew(tiles[tile].possible, i) || tiles[tile].val == i) {
								only = false;
							}
						});
						if (only) {
							this.val = i;
							this.possible = [];
							//console.log("group")
						}
					}
				}
			}
			horizontal = true;
			vertical = true;
			this.group.forEach((tile) => { //if a group has a possible value only in a line remove it from other groups
				if (!checkNew(this.possible, i)) { //if i is a possible value (inside)
					if (!checkNew(tiles[tile].possible, i) && tiles[tile].val == 0) { //if i is a possible value (inside)
						if (tiles[tile].x != this.x) {
							vertical = false;
						}
						if (tiles[tile].y != this.y) {
							horizontal = false;
						}
					}
				}

			});
			if (horizontal && !checkNew(this.possible, i)) {
				this.horizontal.forEach((tile) => {
					if (checkNew(this.group, tile)) { //if tile is not in group
						tiles[tile].possible.forEach((possible, index) => {
							if (possible == i) {
								tiles[tile].possible.splice(index, 1);
							}
						})
					}
				});
			}
			if (vertical && !checkNew(this.possible, i)) {
				this.vertical.forEach((tile) => {
					if (checkNew(this.group, tile)) { //if tile is not in group
						tiles[tile].possible.forEach((possible, index) => {
							if (possible == i) {
								tiles[tile].possible.splice(index, 1);
							}
						})
					}
				});
			}
		}
    
		if (this.possible.length == 1) {
			this.val = this.possible[0];
			this.possible = [];
		}
	}
	this.show = function() {
		rectMode(CENTER);
		fill(125);
		rect(this.x, this.y, sizeT, sizeT);
		if (this.val != 0) {
			textAlign(CENTER, CENTER);
			textSize(sizeT * .75);
			fill(0);
			text(this.val, this.x, this.y)
		} else {
			textAlign(CENTER, CENTER);
			textSize(sizeT * .25);
			fill(0);
			this.possible.forEach((possibly, index) => {
				text(possibly, this.x - 7 * sizeT / 16 + index * sizeT / this.possible.length, this.y - sizeT / 4)
			});
		}
	}
}
