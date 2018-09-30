var pieces = ["R", "G", "B", "Y", "P", "O", "N"];

function pieceT() {
	this.piece = "";
	this.r = standardColour;
	this.g = standardColour;
	this.g = standardColour;
	this.index1;
	this.index2;
	this.index3;
	this.index4;
	this.generate = function() {
		this.piece = pieces[round(random(-.49, 7.49))];
		if (this.piece == "R") {
			this.r=200;
			this.g=0;
			this.b=0;
			this.index1;
			this.index2;
			this.index3;
			this.index4;
		} else if (this.piece == "G") {
			this.r=0;
			this.g=200;
			this.b=0;
			this.index1;
			this.index2;
			this.index3;
			this.index4;
		} else if (this.piece == "B") {
			this.r=100;
			this.g=100;
			this.b=200;
			this.index1;
			this.index2;
			this.index3;
			this.index4;
		} else if (this.piece == "Y") {
			this.r=200;
			this.g=200;
			this.b=0;
			this.index1;
			this.index2;
			this.index3;
			this.index4;
		} else if (this.piece == "P") {
			this.r=200;
			this.g=0;
			this.b=200;
			this.index1;
			this.index2;
			this.index3;
			this.index4;
		} else if (this.piece == "O") {
			this.r=255;
			this.g=200;
			this.b=0;
			this.index1;
			this.index2;
			this.index3;
			this.index4;
		} else if (this.piece == "N") {
			this.r=150;
			this.g=0;
			this.g=255;
			this.index1;
			this.index2;
			this.index3;
			this.index4;
		}
	}
	this.update = function() {
		if (keyIsDown(LEFT_ARROW)) {
			//rotate CCW
		}
		if (keyIsDown(RIGHT_ARROW)) {
			//rotate CW
		}
		this.index1 -= 10;
		this.index2 -= 10;
		this.index3 -= 10;
		this.index4 -= 10;
	}
}
