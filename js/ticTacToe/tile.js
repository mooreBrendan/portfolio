function tile(i){
  this.index=i;
  this.x=(this.index%numTiles);
  this.y=floor(this.index/numTiles);
  this.val="";
  this.show=function(){
    if(mouseIsPressed&&!pressed&&this.val==""){
      if(mouseX>=this.x*dimension/numTiles&&mouseX<(this.x+1)*dimension/numTiles&&mouseY>=this.y*dimension/numTiles&&mouseY<(this.y+1)*dimension/numTiles){
        pressed=true;
        this.val=turn?"X":"O";
        turn=!turn
      }
    }
    else if(!mouseIsPressed){
      pressed=false;
    }
    rectMode(CORNER);
    fill(50);
    rect((dimension/numTiles)*this.x,(dimension/numTiles)*this.y,.95*dimension/numTiles,.95*dimension/numTiles);
    fill(200);
    textAlign(CENTER);
    textSize(30*dimension/600);
    text(this.val,(dimension/numTiles)*this.x+.5*dimension/numTiles,(dimension/numTiles)*this.y+.5*dimension/numTiles);
  }
  this.check = function() {
		var match = 0;
		var complete = false;
		if (this.index % numTiles <= numTiles - lineLength) { //check Horizontal
			for (var i = this.index % numTiles; i < numTiles; i++) {
				if (tiles[this.y * numTiles + i].val == this.val && this.val != "" && tiles[this.y * numTiles + i].y == this.y) {
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
				if (tiles[this.x + i * numTiles].val == this.val && this.val != "" && tiles[this.x + i * numTiles].x == this.x) {
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
			if (tiles[current].val == this.val && this.val != "" && tiles[current].x >= this.x) {
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
			if (tiles[current].val == this.val && this.val != "" && tiles[current].x >= this.x) {
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
			console.log(this.val+" Wins");
      winner=true;
			noLoop();
		}
	}
}
