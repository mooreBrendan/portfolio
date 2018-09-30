function tile(index) {
	this.index = index;
	this.x = (index % numTiles+ .5) * sizeT;
	this.y = (floor(index / numTiles) + .5) * sizeT;
	this.wall = false;
	this.goal;
  this.start;
	this.show = function() {
    this.goal = this.index == goalIndex;
    this.start= this.index == startIndex;
		if (this.goal) {
			fill(200, 200, 0);
      this.wall=false;
		} else if(this.start){
      fill(0,200,0);
      this.wall=false;
    }
     else if (this.wall) {
			fill(50);
		} else {
			fill(200);
		}
		rectMode(CENTER);
		rect(this.x , this.y, sizeT * .95, sizeT * .95);
	}
}
