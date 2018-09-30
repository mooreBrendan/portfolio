function player() {
	this.white = 16;
	this.black = 16;
	this.piece = "";
	this.turnCount = 1;
	this.possible = [];
	this.index = -1;
	this.x = 0;
	this.y = 0;
	this.turn = "W";
}

function promotable(index) {
	this.index = index;
	this.height = .55 * dimension / 2;
	this.width = dimension / 2;
	if (this.index == 0) {
		this.type = "Q";
		this.x = dimension / 4;
		this.y = dimension / 4;
	} else if (this.index == 1) {
		this.type = "B";
		this.x = 3 * dimension / 4;
		this.y = dimension / 4;
	} else if (this.index == 2) {
		this.type = "N";
		this.x = dimension / 4;
		this.y = 3 * dimension / 4;
	} else {
		this.type = "R";
		this.x = 3 * dimension / 4;
		this.y = 3 * dimension / 4;
	}
	this.show = function() {
		rectMode(CENTER);
		if (plyr.turn == "W") {
			fill(0);
			if (this.type == "Q") {
				this.width = (whiteQueen.width / whiteQueen.height) * this.height;
				rect(this.x, this.y, 1 * this.width, this.height);
				image(whiteQueen, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
			} else if (this.type == "B") {
				this.width = 1.15 * (whiteBishop.width / whiteBishop.height) * this.height;
				rect(this.x, this.y, this.width, this.height);
				image(whiteBishop, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
			} else if (this.type == "N") {
				this.width = 1.15 * (whiteKnight.width / whiteKnight.height) * this.height;
				rect(this.x, this.y, this.width, this.height);
				image(whiteKnight, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
			} else {
				this.width = 1.3 * (whiteRook.width / whiteRook.height) * this.height;
				rect(this.x, this.y, this.width, this.height);
				image(whiteRook, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
			}
		} else {
			fill(255);
			if (this.type == "Q") {
				this.width = (blackQueen.width / blackQueen.height) * this.height;
				rect(this.x, this.y, this.width, this.height);
				image(blackQueen, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
			} else if (this.type == "B") {
				this.width = 1.15 * (blackBishop.width / blackBishop.height) * this.height;
				rect(this.x, this.y, this.width, this.height);
				image(blackBishop, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
			} else if (this.type == "N") {
				this.width = 1.15 * (blackKnight.width / blackKnight.height) * this.height;
				rect(this.x, this.y, this.width, this.height);
				image(blackKnight, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
			} else {
				this.width = 1.3 * (blackRook.width / blackRook.height) * this.height;
				rect(this.x, this.y, this.width, this.height);
				image(blackRook, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
			}
		}
	}
	this.check = function() {
		var returnVal = "";
		if (mouseX > this.x - this.width / 2 && mouseX < this.x + this.width / 2 && mouseY > this.y - this.height / 2 && mouseY < this.y + this.height / 2) {
			if (!pressed && mouseIsPressed) {
				pressed = true;
				returnVal = this.type;
			} else if (!mouseIsPressed) {
				pressed = false;
			}
		}
		return (returnVal);
	}
}
