function creature() {
	this.index = startIndex;
	this.length = startLength;
	this.DNA = [];
	this.fit = 2;
	this.dead = false;
	this.reached = false;
	this.visited = [startIndex];
	this.resetVal = function() {
    this.visited.splice(0,this.visited.length);
		this.visited[0] = startIndex;
		this.fit = 2;
		this.dead = false;
		this.reached = false;
		this.index = startIndex;
	}
	this.newInit = function() {
		for (var i = 0; i < startLength; i++) {
			this.DNA[i] = round(random(.5, 4.49));
		}
	}
	this.childInit = function(parent1, parent2) {
		this.length = random(0, 1) >= .5 ? parent1.length : parent2.length;
		for (var i = 0; i < this.length; i++) {
			if (parent1.DNA[i] && parent2.DNA[i]) {
				this.DNA[i] = random(0, 1) >= .5 ? parent1.DNA[i] : parent2.DNA[i];
			} else if (parent1.DNA[i]) {
				this.DNA[i] = parent1.DNA[i];
			} else {
				this.DNA[i] = parent2.DNA[i];
			}
		}
	}
	this.mutate = function() {
		if (random(0, 1) < mutationRate / 100) {
			if (random(0, 1) < .5 && this.length > 1) {
				this.length--;
			} else {
				this.DNA[this.length] = round(random(.5, 4.49));
				this.length++;
			}
		}
		for (i = 0; i < this.length; i++) {
			if (random(0, 1) < mutationRate / 100) {
				if (random(0, 1) > .5) {
					if (this.DNA[i] > 1) {
						this.DNA[i]--;
					} else {
						this.DNA[i]++;
					}
				} else {
					if (this.DNA[i] < 4) {
						this.DNA[i]++;
					} else {
						this.DNA[i]--;
					}
				}
			}
		}
	}
	this.update = function(x) {
		if (!this.dead) {
			if (x < this.length) {
				var startDistance = dist(tiles[this.index].x, tiles[this.index].y, tiles[goalIndex].x, tiles[goalIndex].y);
				var finalDistance;
				if (this.DNA[x] == 1) {
					if (this.index < numTiles) {
						this.dead = true;
					} else if (tiles[this.index - numTiles].wall) {
						this.dead = true;
					} else {
						this.index -= numTiles;
						if (!this.already(this.index)) {
							if (!this.reached) {
								this.fit+=scoring;
							} else {
								this.fit-=scoring;
							}
						}
					}
				} else if (this.DNA[x] == 2) {
					if (this.index % numTiles == 0) {
						this.dead = true;
					} else if (tiles[this.index - 1].wall) {
						this.dead = true;
					} else {
						this.index -= 1;
            if (!this.already(this.index)) {
							if (!this.reached) {
								this.fit+=scoring;
							} else {
								this.fit-=scoring;
							}
						}
					}
				} else if (this.DNA[x] == 3) {
					if (this.index % numTiles == numTiles - 1) {
						this.dead = true;
					} else if (tiles[this.index + 1].wall) {
						this.dead = true;
					} else {
						this.index += 1;
            if (!this.already(this.index)) {
							if (!this.reached) {
								this.fit+=scoring;
							} else {
								this.fit-=scoring;
							}
						}
					}
				} else if (this.DNA[x] == 4) {
					if (this.index >= numTiles * numTiles - numTiles) {
						this.dead = true;
					} else if (tiles[this.index + numTiles].wall) {
						this.dead = true;
					} else {
						this.index += numTiles;
            if (!this.already(this.index)) {
							if (!this.reached) {
								this.fit+=scoring;
							} else {
								this.fit-=scoring;
							}
						}
					}
				} else { //if not 1-4
					this.dead = true;
				}
				finalDistance = dist(tiles[this.index].x, tiles[this.index].y, tiles[goalIndex].x, tiles[goalIndex].y);
				if (finalDistance < startDistance) {
					this.fit += scoring*scoring*scoring;
				}
				if (finalDistance==0) {
					this.fit += scoring*scoring*scoring*scoring*scoring;
					this.reached = true;
				}
			} else {
				this.dead = true;
			}
		}
    else{
      this.fit-=scoring*scoring;
    }
		if (this.fit < 0) {
			this.fit = 0;
		}
	}
	this.show = function() {
		//if (this.fit || all) {
		fill(150, 50, 50, 50);
		ellipse(tiles[this.index].x, tiles[this.index].y, sizeT * .75, sizeT * .75);
		//}
	}
  this.already=function(x){
    for(var i=0;i<step;i++){
      if(this.visited[i]==this.index){
        return(true);
      }
    }
    this.visited[step]=this.index;
  }
}
