function tile(x, y, color) {
	this.color = color;
	this.x = x;
	this.y = y;
	this.dispX;
	this.dispY;
	this.index = y * numTiles + x;
	this.r;
	this.b;
	this.g;
	this.show = function() {
		if (flipped) {
			this.dispX = (this.x + .5) * dimension / numTiles;
			this.dispY = (this.y + .5) * dimension / numTiles;
		} else {
			this.dispX = dimension - (this.x + .5) * dimension / numTiles;
			this.dispY = dimension - (this.y + .5) * dimension / numTiles;
		}
		if (plyr.possible.includes(this.index)) {
			this.r = 50;
			this.b = 50;
			this.g = 200;
		} else if (plyr.index != -1 && pieces[plyr.index].index == this.index) {
			this.r = 50;
			this.b = 150;
			this.g = 50;
		} else {
			if (this.color) {
				this.r = 200;
				this.b = 200;
				this.g = 200;
			} else {
				this.r = 100;
				this.b = 100;
				this.g = 100;
			}
		}
		fill(this.r, this.g, this.b);
		rectMode(CENTER);
		rect(this.dispX, this.dispY, .95 * sizeT, .95 * sizeT);
	}
	this.update = function(player, piece) {
		this.player = player;
		this.piece = piece;
	}
}


function piece(player, pce, index) {
	this.player = player;
	this.size = dimension / 600;
	this.possible = [];
	this.moves = 0;
	this.lastMove = 0;
	this.piece = pce;
	this.index = index;
	this.origin = index;
	this.kingCheck = function(player, possIndex, kingIndex) {
		var returnVal = false;
		var tempInd;
		var vaild;
		var change;
		var curr;
		//cross
		valid = true;
		change = 1;
		curr = kingIndex;
		while (!returnVal && valid && curr < pow(numTiles, 2) && tiles[kingIndex].y == tiles[curr].y) { //horizontal
			if (possIndex == curr) { //potential
				tempInd = this.index;
			} else if (curr == this.index) {
				tempInd = -1;
			} else {
				tempInd = curr;
			}
			if (compPiece(tempInd, "player", player)) { //same player, stop checking
				valid = false;
			} else if (abs(tiles[kingIndex].x - tiles[curr].x) == 1 && compPiece(tempInd, "piece", "K")) {
				returnVal = true
			} else if (compPiece(tempInd, "piece", "R") || compPiece(tempInd, "piece", "Q")) { //cause check
				returnVal = true;
			} else if (!compPiece(tempInd, "player", "")) {
				valid = false;
			} else { //empty space
				curr += change;
			}
		}
		valid = true;
		change = numTiles;
		curr = kingIndex;
		while (!returnVal && valid && curr < pow(numTiles, 2) && tiles[kingIndex].x == tiles[curr].x) { //vertical
			if (possIndex == curr) { //potential
				tempInd = this.index;
			} else if (curr == this.index) {
				tempInd = -1;
			} else {
				tempInd = curr;
			}
			if (compPiece(tempInd, "player", player)) { //same player, stop checking
				valid = false;
			} else if (abs(tiles[kingIndex].y - tiles[curr].y) == 1 && compPiece(tempInd, "piece", "K")) {
				returnVal = true
			} else if (compPiece(tempInd, "piece", "R") || compPiece(tempInd, "piece", "Q")) { //cause check
				returnVal = true;
			} else if (!compPiece(tempInd, "player", "")) {
				valid = false;
			} else { //empty space
				curr += change;
			}
		}
		valid = true;
		change = -1;
		curr = kingIndex;
		while (!returnVal && valid && curr >= 0 && tiles[kingIndex].y == tiles[curr].y) { //horizontal
			if (possIndex == curr) { //potential
				tempInd = this.index;
			} else if (curr == this.index) {
				tempInd = -1;
			} else {
				tempInd = curr;
			}
			if (compPiece(tempInd, "player", player)) { //same player, stop checking
				valid = false;
			} else if (abs(tiles[kingIndex].x - tiles[curr].x) == 1 && compPiece(tempInd, "piece", "K")) {
				returnVal = true
			} else if (compPiece(tempInd, "piece", "R") || compPiece(tempInd, "piece", "Q")) { //cause check
				returnVal = true;
			} else if (!compPiece(tempInd, "player", "")) {
				valid = false;
			} else { //empty space
				curr += change;
			}
		}
		valid = true;
		change = -numTiles;
		curr = kingIndex;
		while (!returnVal && valid && curr >= 0 && tiles[kingIndex].x == tiles[curr].x) { //vertical
			if (possIndex == curr) { //potential
				tempInd = this.index;
			} else if (curr == this.index) {
				tempInd = -1;
			} else {
				tempInd = curr;
			}
			if (compPiece(tempInd, "player", player)) { //same player, stop checking
				valid = false;
			} else if (abs(tiles[kingIndex].y - tiles[curr].y) == 1 && compPiece(tempInd, "piece", "K")) {
				returnVal = true
			} else if (compPiece(tempInd, "piece", "R") || compPiece(tempInd, "piece", "Q")) { //cause check
				returnVal = true;
			} else if (!compPiece(tempInd, "player", "")) {
				valid = false;
			} else { //empty space
				curr += change;
			}
			var arry = []; //check Knights
			arry[0] = kingIndex + numTiles + 2;
			arry[1] = kingIndex + numTiles - 2;
			arry[2] = kingIndex - numTiles + 2;
			arry[3] = kingIndex - numTiles - 2;
			arry[4] = kingIndex + 2 * numTiles + 1;
			arry[5] = kingIndex + 2 * numTiles - 1;
			arry[6] = kingIndex - 2 * numTiles + 1;
			arry[7] = kingIndex - 2 * numTiles - 1;
			arry.forEach((ele, elementInd) => {
				if (!returnVal) {
					if (elementInd < 4 && abs(tiles[kingIndex] - tiles[ele]) == 1) {
						if (possIndex == curr) { //potential
							tempInd = this.index;
						} else {
							tempInd = ele;
						}
						if (!compPiece(tempInd, "player", player) && compPiece(tempInd, "piece", "N")) {
							returnVal = true;
						}
					} else if (elementInd >= 4 && abs(tiles[kingIndex] - tiles[ele]) == 2) {
						if (possIndex == curr) { //potential
							tempInd = this.index;
						} else {
							tempInd = ele;
						}
						if (!compPiece(tempInd, "player", player) && compPiece(tempInd, "piece", "N")) {
							returnVal = true;
						}
					}
				}
			});
			//diag
			valid = true;
			change = (numTiles + 1);
			curr = kingIndex;
			while (!returnVal && valid && curr < pow(numTiles, 2) && tiles[kingIndex].x < tiles[curr].x) {
				if (possIndex == curr) { //potential
					tempInd = this.index;
				} else if (curr == this.index) {
					tempInd = -1;
				} else {
					tempInd = curr;
				}
				if (compPiece(tempInd, "player", player)) { //same player, stop checking
					valid = false;
				} else if (abs(tiles[kingIndex].y - tiles[curr].y) == 1 && ((player == "B" && compPiece(tempInd, "piece", "P")) || compPiece(tempInd, "piece", "K"))) {
					returnVal = true
				} else if (compPiece(tempInd, "piece", "B") || compPiece(tempInd, "piece", "Q")) { //cause check
					returnVal = true;
				} else if (!compPiece(tempInd, "player", "")) {
					valid = false;
				} else { //empty space
					curr += change;
				}
			}
			valid = true;
			change = (numTiles - 1);
			curr = kingIndex;
			while (!returnVal && valid && curr < pow(numTiles, 2) && tiles[kingIndex].x > tiles[curr].x) {
				if (possIndex == curr) { //potential
					tempInd = this.index;
				} else if (curr == this.index) {
					tempInd = -1;
				} else {
					tempInd = curr;
				}
				if (compPiece(tempInd, "player", player)) { //same player, stop checking
					valid = false;
				} else if (abs(tiles[kingIndex].y - tiles[curr].y) == 1 && ((player == "B" && compPiece(tempInd, "piece", "P")) || compPiece(tempInd, "piece", "K"))) {
					returnVal = true
				} else if (compPiece(tempInd, "piece", "B") || compPiece(tempInd, "piece", "Q")) { //cause check
					returnVal = true;
				} else if (!compPiece(tempInd, "player", "")) {
					valid = false;
				} else { //empty space
					curr += change;
				}
			}
			valid = true;
			change = -(numTiles + 1);
			curr = kingIndex;
			while (!returnVal && valid && curr >= 0 && tiles[kingIndex].x > tiles[curr].x) {
				if (possIndex == curr) { //potential
					tempInd = this.index;
				} else if (curr == this.index) {
					tempInd = -1;
				} else {
					tempInd = curr;
				}
				if (compPiece(tempInd, "player", player)) { //same player, stop checking
					valid = false;
				} else if (abs(tiles[kingIndex].y - tiles[curr].y) == 1 && ((player == "W" && compPiece(tempInd, "piece", "P")) || compPiece(tempInd, "piece", "K"))) {
					returnVal = true
				} else if (compPiece(tempInd, "piece", "B") || compPiece(tempInd, "piece", "Q")) { //cause check
					returnVal = true;
				} else if (!compPiece(tempInd, "player", "")) {
					valid = false;
				} else { //empty space
					curr += change;
				}
			}
			valid = true;
			change = -(numTiles - 1);
			curr = kingIndex;
			while (!returnVal && valid && curr >= 0 && tiles[kingIndex].x < tiles[curr].x) {
				if (possIndex == curr) { //potential
					tempInd = this.index;
				} else if (curr == this.index) {
					tempInd = -1;
				} else {
					tempInd = curr;
				}
				if (compPiece(tempInd, "player", player)) { //same player, stop checking
					valid = false;
				} else if (abs(tiles[kingIndex].y - tiles[curr].y) == 1 && ((player == "W" && compPiece(tempInd, "piece", "P")) || compPiece(tempInd, "piece", "K"))) {
					returnVal = true
				} else if (compPiece(tempInd, "piece", "B") || compPiece(tempInd, "piece", "Q")) { //cause check
					returnVal = true;
				} else if (!compPiece(tempInd, "player", "")) {
					valid = false;
				} else { //empty space
					curr += change;
				}
			}
		}
		return (returnVal);
	}
	this.check = function() {
		this.possible = [];
		if (this.piece == "P") {
			var change = this.player == "W" ? 1 : -1;
			var index = this.index + change * numTiles;
			if (index >= 0 && index < pow(numTiles, 2) && compPiece(index, "player", "")) { //forward
				append(this.possible, index);
				index = this.index + change * 2 * numTiles;
				if (this.moves == 0 && compPiece(index, "player", "")) { //initial jump
					append(this.possible, index);
				}
			}
			index = this.index + change * (numTiles - 1); //taking
			if (index >= 0 && index < pow(numTiles, 2) && abs(tiles[this.index].y - tiles[index].y) == 1) {
				if (!compPiece(index, "player", this.player) && !compPiece(index, "player", "")) {
					append(this.possible, index);
				}
			}
			index = this.index + change * (numTiles + 1); //taking
			if (index >= 0 && index < pow(numTiles, 2) && abs(tiles[this.index].y - tiles[index].y) == 1) {
				if (!compPiece(index, "player", this.player) && !compPiece(index, "player", "")) {
					append(this.possible, index);
				}
			}
			index = this.index + 1 * change; //en peasent
			if (index >= 0 && index < pow(numTiles, 2) && tiles[index].y == tiles[this.index].y && compPiece(index, "piece", "P") && compPiece(index, "moves", 1)) {
				if ((this.player == "B" && compPiece(index, "lastMove", plyr.turnCount)) || (this.player == "W" && compPiece(index, "lastMove", plyr.turnCount - 1))) {
					var x;
					for (var i = 0; i < pieces.length; i++) {
						if (pieces[i].index == index) {
							x = i;
						}
					}
					if (abs(tiles[index].y - tiles[pieces[x].origin].y) == 2) {
						append(this.possible, index + change * numTiles);
					}
				}
			}
			index = this.index - 1 * change; //en peasent
			if (index >= 0 && index < pow(numTiles, 2) && tiles[index].y == tiles[this.index].y && compPiece(index, "piece", "P") && compPiece(index, "moves", 1)) {
				if ((this.player == "B" && compPiece(index, "lastMove", plyr.turnCount)) || (this.player == "W" && compPiece(index, "lastMove", plyr.turnCount - 1))) {
					var x;
					for (var i = 0; i < pieces.length; i++) {
						if (pieces[i].index == index) {
							x = i;
						}
					}
					if (abs(tiles[index].y - tiles[pieces[x].origin].y) == 2) {
						append(this.possible, index + change * numTiles);
					}
				}
			}
		}
		if (this.piece == "B" || this.piece == "Q") {
			var valid = true;
			var change = numTiles + 1;
			var curr = this.index - change;
			while (curr >= 0 && tiles[curr].x < tiles[this.index].x && valid) {
				if (!compPiece(curr, "player", this.player)) { //if not own piece
					append(this.possible, curr);
				} else {
					valid = false;
				}
				if (compPiece(curr, "player", "")) { //if current space has no piece
					curr -= change;
				} else {
					valid = false;
				}
			}
			valid = true;
			change = numTiles - 1;
			curr = this.index - change;
			while (curr >= 0 && tiles[curr].x > tiles[this.index].x && valid) {
				if (!compPiece(curr, "player", this.player)) {
					append(this.possible, curr);
				} else {
					valid = false;
				}
				if (compPiece(curr, "player", "")) {
					curr -= change;
				} else {
					valid = false;
				}
			}
			valid = true;
			change = numTiles + 1;
			curr = this.index + change;
			while (curr < pow(numTiles, 2) && tiles[curr].x > tiles[this.index].x && valid) {
				if (!compPiece(curr, "player", this.player)) {
					append(this.possible, curr);
				} else {
					valid = false;
				}
				if (compPiece(curr, "player", "")) {
					curr += change;
				} else {
					valid = false;
				}
			}
			valid = true;
			change = numTiles - 1;
			curr = this.index + change;
			while (curr < pow(numTiles, 2) && tiles[curr].x < tiles[this.index].x && valid) {
				if (!compPiece(curr, "player", this.player)) {
					append(this.possible, curr);
				} else {
					valid = false;
				}
				if (compPiece(curr, "player", "")) {
					curr += change;
				} else {
					valid = false;
				}
			}
		}
		if (this.piece == "R" || this.piece == "Q") {
			var change = -1;
			var curr = this.index + change;
			var valid = true;
			while (curr >= 0 && tiles[curr].y == tiles[this.index].y && valid) {
				if (!compPiece(curr, "player", this.player)) {
					append(this.possible, curr);
				} else {
					valid = false;
				}
				if (compPiece(curr, "player", "")) {
					curr += change;
				} else {
					valid = false;
				}
			}
			change = 1;
			curr = this.index + change;
			valid = true;
			while (curr < pow(numTiles, 2) && tiles[curr].y == tiles[this.index].y && valid) {
				if (!compPiece(curr, "player", this.player)) {
					append(this.possible, curr);
				} else {
					valid = false;
				}
				if (compPiece(curr, "player", "")) {
					curr += change;
				} else {
					valid = false;
				}
			}
			change = numTiles;
			curr = this.index + change;
			valid = true;
			while (curr < pow(numTiles, 2) && valid) {
				if (!compPiece(curr, "player", this.player)) {
					append(this.possible, curr);
				} else {
					valid = false;
				}
				if (compPiece(curr, "player", "")) {
					curr += change;
				} else {
					valid = false;
				}
			}
			change = -numTiles;
			curr = this.index + change;
			valid = true;
			while (curr >= 0 && valid) {
				if (!compPiece(curr, "player", this.player)) {
					append(this.possible, curr);
				} else {
					valid = false;
				}
				if (compPiece(curr, "player", "")) {
					curr += change;
				} else {
					valid = false;
				}
			}
		}
		if (this.piece == "N") {
			var poss = [];
			poss[0] = this.index - 2 * numTiles + 1;
			poss[1] = this.index - 2 * numTiles - 1;
			poss[2] = this.index + 2 * numTiles + 1;
			poss[3] = this.index + 2 * numTiles - 1;
			poss[4] = this.index - numTiles + 2;
			poss[5] = this.index - numTiles - 2;
			poss[6] = this.index + numTiles + 2;
			poss[7] = this.index + numTiles - 2;
			poss.forEach((possibilty, index) => {
				if (possibilty >= 0 && possibilty < pow(numTiles, 2) && !compPiece(possibilty, "player", this.player)) {
					if (index < 4 && abs(tiles[this.index].y - tiles[possibilty].y) == 2) {
						append(this.possible, possibilty);
					} else if (index >= 4 && abs(tiles[this.index].y - tiles[possibilty].y) == 1) {
						append(this.possible, possibilty);
					}
				}
			});
		}
		if (this.piece == "K") {
			var index = this.index + (numTiles + 1);
			if (index < pow(numTiles, 2) && abs(tiles[this.index].y - tiles[index].y) == 1 && !compPiece(index, "player", this.player)) {
				append(this.possible, index);
			}
			index = this.index + (numTiles);
			if (index < pow(numTiles, 2) && abs(tiles[this.index].y - tiles[index].y) == 1 && !compPiece(index, "player", this.player)) {
				append(this.possible, index);
			}
			index = this.index + (numTiles - 1);
			if (index < pow(numTiles, 2) && abs(tiles[this.index].y - tiles[index].y) == 1 && !compPiece(index, "player", this.player)) {
				append(this.possible, index);
			}
			index = this.index + 1;
			if (index < pow(numTiles, 2) && abs(tiles[this.index].y - tiles[index].y) == 0 && !compPiece(index, "player", this.player)) {
				append(this.possible, index);
			}
			index = this.index - 1;
			if (index >= 0 && abs(tiles[this.index].y - tiles[index].y) == 0 && !compPiece(index, "player", this.player)) {
				append(this.possible, index);
			}
			index = this.index - (numTiles - 1);
			if (index >= 0 && abs(tiles[this.index].y - tiles[index].y) == 1 && !compPiece(index, "player", this.player)) {
				append(this.possible, index);
			}
			index = this.index - (numTiles);
			if (index >= 0 && abs(tiles[this.index].y - tiles[index].y) == 1 && !compPiece(index, "player", this.player)) {
				append(this.possible, index);
			}
			index = this.index - (numTiles + 1);
			if (index >= 0 && abs(tiles[this.index].y - tiles[index].y) == 1 && !compPiece(index, "player", this.player)) {
				append(this.possible, index);
			}
			if (this.moves == 0) { //castling
				//if (this.player == "W") {
				var valid = true;
				var dif = 1;

				while (this.index + dif >= 0 && this.index + dif < pow(numTiles, 2) && !compPiece(this.index + dif, "piece", "R") && valid) {
					if (!compPiece(this.index + dif, "player", "")) {
						valid = false;
					}
					dif++;
				}
				if (valid && !compPiece(this.index + dif, "moves", 0)) {
					valid = false;
				}
				if (valid && dif > 2) {
					append(this.possible, this.index + 2);
				}
				var valid = true;
				var dif = 1;

				while (this.index - dif >= 0 && this.index - dif < pow(numTiles, 2) && !compPiece(this.index - dif, "piece", "R") && valid) {
					if (!compPiece(this.index - dif, "player", "")) {
						valid = false;
					}
					dif++;
				}

				if (valid && dif > 2) {
					append(this.possible, this.index - 2);
				}
			}
		}
    /*
		for (var i = 0; i < this.possible.length; i++) {
			if (this.kingCheck(this.player, this.possible[i], -1)) { //if would cause check
				this.possible.splice(i, 1); //mark as invalid
				i--;
			}
		}
    */
	}
	this.show = function() {
		if (flipped) {
			this.dispX = (tiles[this.index].x + .5) * dimension / numTiles;
			this.dispY = (tiles[this.index].y + .5) * dimension / numTiles;
		} else {
			this.dispX = dimension - (tiles[this.index].x + .5) * dimension / numTiles;
			this.dispY = dimension - (tiles[this.index].y + .5) * dimension / numTiles;
		}
		if (this.player == "B") {
			if (this.piece == "K") {
				image(blackKing, this.dispX - blackKing.width / 2, this.dispY - blackKing.height / 2, blackKing.width * this.size, blackKing.height * this.size);
			}
			if (this.piece == "Q") {
				image(blackQueen, this.dispX - blackQueen.width / 2, this.dispY - blackQueen.height / 2, blackQueen.width * this.size, blackQueen.height * this.size);
			}
			if (this.piece == "B") {
				image(blackBishop, this.dispX - blackBishop.width / 2, this.dispY - blackBishop.height / 2, blackBishop.width * this.size, blackBishop.height * this.size);
			}
			if (this.piece == "N") {
				image(blackKnight, this.dispX - blackKnight.width / 2, this.dispY - blackKnight.height / 2, blackKnight.width * this.size, blackKnight.height * this.size);
			}
			if (this.piece == "R") {
				image(blackRook, this.dispX - blackRook.width / 2, this.dispY - blackRook.height / 2, blackRook.width * this.size, blackRook.height * this.size);
			}
			if (this.piece == "P") {
				image(blackPawn, this.dispX - blackPawn.width / 2, this.dispY - blackPawn.height / 2, blackPawn.width * this.size, blackPawn.height * this.size);
			}
		} else {
			if (this.piece == "K") {
				image(whiteKing, this.dispX - whiteKing.width / 2, this.dispY - whiteKing.height / 2, whiteKing.width * this.size, whiteKing.height * this.size);
			}
			if (this.piece == "Q") {
				image(whiteQueen, this.dispX - whiteQueen.width / 2, this.dispY - whiteQueen.height / 2, whiteQueen.width * this.size, whiteQueen.height * this.size);
			}
			if (this.piece == "B") {
				image(whiteBishop, this.dispX - whiteBishop.width / 2, this.dispY - whiteBishop.height / 2, whiteBishop.width * this.size, whiteBishop.height * this.size);
			}
			if (this.piece == "N") {
				image(whiteKnight, this.dispX - whiteKnight.width / 2, this.dispY - whiteKnight.height / 2, whiteKnight.width * this.size, whiteKnight.height * this.size);
			}
			if (this.piece == "R") {
				image(whiteRook, this.dispX - whiteRook.width / 2, this.dispY - whiteRook.height / 2, whiteRook.width * this.size, whiteRook.height * this.size);
			}
			if (this.piece == "P") {
				image(whitePawn, this.dispX - whitePawn.width / 2, this.dispY - whitePawn.height / 2, whitePawn.width * this.size, whitePawn.height * this.size);
			}
		}
	}
}
