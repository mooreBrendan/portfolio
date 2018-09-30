const dimension = 500;
const numTiles = 8;
const sizeT = dimension / numTiles;
const randChess = false;
var plyr;
var tiles = [];
var pieces = [];
var promotions = [];
var promoIndex = -1;
var moveLog = "";
var whiteAttack = [];
var blackAttack = [];
var pressed = false;
var flipped = false;

var allowFlip = true;

var blackKing;
var blackQueen;
var blackBishop;
var blackKnight;
var blackRook;
var blackPawn;

var whiteKing;
var whiteQueen;
var whiteBishop;
var whiteKnight;
var whiteRook;
var whitePawn;

function setup() {
	createCanvas(dimension, dimension);

	blackKing = loadImage("black_king.png");
	blackQueen = loadImage("black_queen.png");
	blackBishop = loadImage("black_bishop.png");
	blackKnight = loadImage("black_knight.png");
	blackRook = loadImage("black_rook.png");
	blackPawn = loadImage("black_pawn.png");

	whiteKing = loadImage("white_king.png");
	whiteQueen = loadImage("white_queen.png");
	whiteBishop = loadImage("white_bishop.png");
	whiteKnight = loadImage("white_knight.png");
	whiteRook = loadImage("white_rook.png");
	whitePawn = loadImage("white_pawn.png");

	plyr = new player();
	var curr = true;
	for (var i = 0; i < numTiles; i++) {
		for (var j = 0; j < numTiles; j++) {
			tiles[i * numTiles + j] = new tile(j, i, curr)
			curr = !curr;
		}
		if (numTiles % 2 == 0) {
			curr = !curr;
		}
	}
	for (i = 0; i < 4; i++) {
		promotions[i] = new promotable(i);
		promotions[i].show();
	}

	if (numTiles == 8 && !randChess) {
		//pawns
		for (i = numTiles; i < 2 * numTiles; i++) {
			append(pieces, new piece("W", "P", i));
		}
		for (i = pow(numTiles, 2) - numTiles - 1; i >= pow(numTiles, 2) - numTiles * 2; i--) {
			append(pieces, new piece("B", "P", i));
		}
		//Rooks
		append(pieces, new piece("W", "R", 0));
		append(pieces, new piece("W", "R", numTiles - 1));
		append(pieces, new piece("B", "R", pow(numTiles, 2) - numTiles));
		append(pieces, new piece("B", "R", pow(numTiles, 2) - 1));
		//Horses
		append(pieces, new piece("W", "N", 1));
		append(pieces, new piece("W", "N", numTiles - 2));
		append(pieces, new piece("B", "N", pow(numTiles, 2) - numTiles + 1));
		append(pieces, new piece("B", "N", pow(numTiles, 2) - 2));
		//Horses
		append(pieces, new piece("W", "B", 2));
		append(pieces, new piece("W", "B", numTiles - 3));
		append(pieces, new piece("B", "B", pow(numTiles, 2) - numTiles + 2));
		append(pieces, new piece("B", "B", pow(numTiles, 2) - 3));
		//Queens
		append(pieces, new piece("W", "Q", 4));
		append(pieces, new piece("B", "Q", pow(numTiles, 2) - 4));
		//Kings
		append(pieces, new piece("W", "K", 3));
		append(pieces, new piece("B", "K", pow(numTiles, 2) - 5));
	} else if (numTiles == 8) {
		//regular random chess
	} else {
		//true random chess
	}

	pieces.forEach((piece) => piece.check());
}

function draw() {
	background(0);
	tiles.forEach((tile) => {
		tile.show();
	});
	pieces.forEach((piece) => {
		piece.show();
	});
	if (promoIndex == -1) {
		moveLog = move(promoIndex); //move the pieces
	} else { //if need to show promotions
		promotions.forEach((promotion) => {
			promotion.show();
			var promote = promotion.check();
			if (promote != "") {
				pieces[promoIndex].piece = promote;

				plyr.turn = plyr.turn == "W" ? "B" : "W";
				if (plyr.turn == "W") {
					plyr.turnCount++;
				}
				pieces.forEach((piece) => piece.check());
				if (allowFlip) {
					flipped = !flipped;
				}
				plyr.index = -1;
				plyr.possible = [];
				//checkCheck();
        /*
        var checkLog="";
        var check=false;
        var kingIndex=-1;
        var mate=[];
        pieces.forEach((piece)=>{//determineindex of king
          if(piece.player==plyr.turn&&piece.piece=="K"){
            kingIndex=piece.index;
          }
        });
        if(abs(kingIndex-numTiles-1>=0&&tiles[kingIndex-numTiles-1].x-tiles[kingIndex].x)==1){//fill the mate array
          append(mate,kingIndex-numTiles-1)
        }
        pieces.forEach((piece)=>{
          piece.kingCheck(plyr.turn,plyr.index,kingIndex)){

          }
        })
        if()
        */
        console.log(moveLog + "=" + promote+checkLog);
				moveLog = "";
				promoIndex = -1;
			}
		});
	}
}



function checkCheck() {
	var kingInd;
	var kingCheck = false;
	var kingAdj = [];
	for (var i = 0; i < tiles.length; i++) {
		if (tiles[i].piece == "K" && tiles[i].player != plyr.turn) {
			kingInd = i;
			if (i >= numTiles) {
				if (tiles[i - numTiles].player == plyr.turn || tiles[i - numTiles].player == "") {
					append(kingAdj, i - numTiles); //up
				}
				if (i % numTiles != 0) {
					if (tiles[i - numTiles - 1].player == plyr.turn || tiles[i - numTiles - 1].player == "") {
						append(kingAdj, i - numTiles - 1); //up-left
					}
				}
				if (i % numTiles != numTiles - 1) {
					if (tiles[i - numTiles + 1].player == plyr.turn || tiles[i - numTiles + 1].player == "") {
						append(kingAdj, i - numTiles + 1); //up-right
					}
				}
			}
			if (i % numTiles != 0) {
				if (tiles[i - 1].player == plyr.turn || tiles[i - 1].player == "") {
					append(kingAdj, i - 1); //left
				}
			}
			if (i < pow(numTiles, 2) - numTiles) {
				if (tiles[i + numTiles].player == plyr.turn || tiles[i + numTiles].player == "") {
					append(kingAdj, i + numTiles); //up
				}
				if (i % numTiles != 0) {
					if (tiles[i + numTiles - 1].player == plyr.turn || tiles[i + numTiles - 1].player == "") {
						append(kingAdj, i + numTiles - 1); //up-left
					}
				}
				if (i % numTiles != numTiles - 1) {
					if (tiles[i + numTiles + 1].player == plyr.turn || tiles[i + numTiles + 1].player == "") {
						append(kingAdj, i + numTiles + 1); //up-right
					}
				}
			}
			if (i % numTiles != numTiles - 1) {
				if (tiles[i + 1].player == plyr.turn || tiles[i + 1].player == "") {
					append(kingAdj, i + 1); //left
				}
			}
			i = tiles.length;
		}
	}
	//established index and surround
	tiles.forEach((tile) => {
		if (tile.player == plyr.turn && tile.player != "") {
			plyr.index = tile.index;
			plyr.piece = tile.piece;
			plyr.x = tile.x;
			plyr.y = tile.y;
			//plyr.check();
			if (plyr.possible.includes(kingInd)) {
				kingCheck = true;
			}
			for (var i = 0; i < kingAdj.length; i++) {
				if (plyr.possible.includes(kingAdj[i])) {
					kingAdj.splice(i, 1);
					i--;
				}
			}
		}
	})
	// console.log(kingCheck);
	// console.log(kingAdj);
	if (kingAdj.length > 0 && kingCheck) {
		console.log("check +");
	} else if (kingAdj.length == 0 && kingCheck) {
		console.log("checkmate #");
	} else if (kingAdj.length == 0 && ((plyr.black == 1 && plyr.turn == "B") || (plyr.white == 1 && plyr.turn == "W"))) {
		console.log("stalemate");
	}
	plyr.x = 0;
	plyr.y = 0;
	plyr.piece = "";
	plyr.index = -1;
	plyr.possible = [];
	plyr.turn = plyr.turn == "B" ? "W" : "B"; //toggle turn
	plyr.turnCount = plyr.turn == "W" ? plyr.turnCount + 1 : plyr.turnCount; //increment turn
}


function compArry(arry1, arry2) {
	if (arry1.length != arry2.length) {
		return (false);
	} else {
		var valid = true;
		arry1.forEach((element, index) => {
			if (element != arry2[index]) {
				valid = false;
			}
		});
		return (valid);
	}
}

function move(ind) {
	if (!pressed && mouseIsPressed) {
		pressed = true;
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
		if (i >= 0 && i < numTiles && j >= 0 && j < numTiles) {
			if (!flipped) {
				i = (numTiles - 1) - i;
				j = (numTiles - 1) - j;
			}
			var clickedIndex = j * numTiles + i;
			var pieceInd = -1;
			for (var i = 0; i < pieces.length; i++) {
				if (pieces[i].index == clickedIndex) {
					pieceInd = i;
				}
			}
			if (plyr.index != -1 && pieces[plyr.index].possible.includes(clickedIndex)) { //if clicked possible
				var pce = "";
				var tempInd = pieces[plyr.index].index;
				var indCode = str(char((96 + numTiles) - clickedIndex % numTiles) + (floor(clickedIndex / numTiles) + 1));
				var movement = "";
				if (pieceInd != -1) { //if clicked piece
					pieces.splice(pieceInd, 1); //remove piece
					movement = "x";
				} else { //if clicked empty
					if (tiles[clickedIndex].x != tiles[pieces[plyr.index].index].x && pieces[plyr.index].piece == "P") { //en peasent
						movement = "x";
						var indexPeasent;
						if (plyr.turn == "W") {
							indexPeasent = clickedIndex - numTiles;
						} else {
							indexPeasent = clickedIndex + numTiles;
						}
						for (var i = 0; i < pieces.length; i++) {
							if (pieces[i].index == indexPeasent) {
								pieces.splice(i, 1);
							}
						}
					}
					if (abs(clickedIndex - pieces[plyr.index].index) == 2 && pieces[plyr.index].piece == "K") { //castling
						var curr = pieces[plyr.index].index;
						var change;
						if (clickedIndex > curr) {
							change = 1;
						} else {
							change = -1;
						}
						if (clickedIndex > pieces[plyr.index].index) {
							movement = "O-O-O";
						} else {
							movement = "O-O";
						}
						while (!compPiece(curr, "piece", "R")) {
							curr += change;
						}
						for (var i = 0; i < pieces.length; i++) {
							if (pieces[i].index == curr) {
								pieces[i].index = (clickedIndex + pieces[plyr.index].index) / 2;
							}
						}
					}
				}
				if (plyr.index > pieces.length || tempInd != pieces[plyr.index].index) {
					plyr.index--;
				}
				if (pieces[plyr.index].piece != "P") {
					pieces.forEach((piece, index) => { //disambiguating
						if (index != plyr.index && piece.player == plyr.turn && piece.piece == pieces[plyr.index].piece && piece.possible.includes(clickedIndex)) {
							if (pce.length != 2) { //prevent adding more
								if (pieces[plyr.index].index % numTiles == piece.index % numTiles) { //same col
									if (pce.length == 0 || pce.charCodeAt(0) > 90) {
										pce = str(floor(pieces[plyr.index].index / numTiles)) + pce;
									}
								}
								if (floor(pieces[plyr.index].index / numTiles) == floor(piece.index / numTiles)) { //same row
									if (pce.length == 0 || pce.charCodeAt(0) < 90) {
										pce = pce + char((96 + numTiles) - pieces[plyr.index].index % numTiles);
									}
								}
							}
						}
					});
					pce = pieces[plyr.index].piece + pce;
				} else if (movement == "x") {
					pce = char((96 + numTiles) - pieces[plyr.index].index % numTiles);
				}
				pieces[plyr.index].index = clickedIndex;
				pieces[plyr.index].lastMove = plyr.turnCount;
				pieces[plyr.index].moves++;
				if (pieces[plyr.index].piece == "P") { //promotion
					if ((pieces[plyr.index].index < numTiles && plyr.turn == "B") || (pieces[plyr.index].index >= pow(numTiles, 2) - numTiles && plyr.turn == "W")) {
						promoIndex = plyr.index;
						return (plyr.turn + plyr.turnCount + ":\t" + pce + movement + indCode);
					}
				}
				//before this check for check
				if (movement == "" || movement == "x") {
					console.log(plyr.turn + plyr.turnCount + ":\t" + pce + movement + indCode);
				} else {
					console.log(plyr.turn + plyr.turnCount + ":\t" + movement);
				}
				plyr.turn = plyr.turn == "W" ? "B" : "W";
				if (plyr.turn == "W") {
					plyr.turnCount++;
				}
				pieces.forEach((piece) => piece.check());
				if (allowFlip) {
					flipped = !flipped;
				}
				plyr.index = -1;
				plyr.possible = [];
			} else { //if clicked impossible
				if (pieceInd != -1 && pieces[pieceInd].player == plyr.turn) { //if clicked own piece
					plyr.index = pieceInd;
					plyr.possible = pieces[pieceInd].possible
				} else { //if clicked other
					plyr.index = -1;
					plyr.possible = [];
				}
			}
		}
	} else if (!mouseIsPressed) {
		pressed = false;
	}
	promoIndex = -1;
	return ("");
}

function compPiece(index, type, val) {
	var returnVal = false; //set initial val
	for (var i = 0; i < pieces.length; i++) {
		if (pieces[i].index == index) {
			if (type == "player") {
				returnVal = pieces[i].player == val;
			} else if (type == "piece") {
				returnVal = pieces[i].piece == val;
			} else if (type == "moves") {
				returnVal = pieces[i].moves == val;
			} else if (type == "lastMove") {
				returnVal = pieces[i].lastMove == val;
			}
			i = pieces.length + 1;
		}
	}
	if (i == pieces.length) { //not found
		returnVal = val == "";
	}
	return (returnVal);
}
