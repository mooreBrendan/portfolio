function player() {
	this.king = false;
	this.turn = "R";
	this.turnCount = 1;
	this.possible = [];
	this.index = -2 * (numTiles + 2);
	this.check = function() {
		//var jumpable=false;
		this.possible.forEach((possibly) => {
			if (abs(this.index - possibly) > numTiles + 1) {
				jumpable = true;
			}
		});
		if (jumpable) {
			for (var i = 0; i < this.possible.length; i++) {
				if (abs(this.index - this.possible[i]) <= numTiles + 1) {
					this.possible.splice(i, 1);
					i--;
				}
			}
		}
	}
}
