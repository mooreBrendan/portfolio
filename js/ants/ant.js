function ant() {
	this.x = random(0, dimension);
	this.y = random(0, dimension);
	this.dir = random(0, 2 * PI);
	this.type = types[round(random(-.49, types.length - .51))];
	this.time = random(0, inter * 1000) + millis();
	this.colors = [];
	this.interactions = [];
	types.forEach((type, index) => this.colors[index] = 0);

	this.show = function() {
		types.forEach((type, index) => {
			if (this.type == type) {
				fill(rArry[index], gArry[index], bArry[index]);
			}
		});
		ellipseMode(CENTER);
		ellipse(this.x, this.y, sizeA, sizeA);
	}
	this.update = function() {
		if (millis() > this.time) {
			var tempType;
			var tempVal;
			var arry = [];

			types.forEach((type, index) => arry[index] = type); //copy array

			this.dir = random(0, 2 * PI);
			this.time = millis() + random(0, inter * 1000);
			for (i = 0; i < types.length - 1; i++) { //sort high to low
				for (var j = 0; j < types.length - i - 1; j++) {
					if (this.colors[j] < this.colors[j + 1]) {
						tempVal = this.colors[j];
						tempType = arry[j];

						this.colors[j] = this.colors[j + 1];
						arry[j] = arry[j + 1];

						this.colors[j + 1] = tempVal;
						arry[j + 1] = tempType;
					}
				}
			}
			if (this.colors[0] > this.colors[types.length - 1] + tolerance) { //if need to change
				var maxVals = 1;
				var minVals = types.length - 2;
				while (this.colors[0] - this.colors[maxVals] <= tolerance) {
					maxVals++;
				}
				while (this.colors[minVals] - this.colors[types.length - 1] <= tolerance) {
					minVals--;
				}
				for (var i = 0; i < maxVals; i++) {
					if (arry[i] == this.type) {
						this.type = arry[round(random(minVals, types.length - .51))];
					}
				}
			}
			this.interactions.splice(0, this.interactions.length); //empty the array
			types.forEach((type, index) => this.colors[index] = 0);
		}
		this.x += cos(this.dir) * delta_t; //update position
		this.y += sin(this.dir) * delta_t;
		if (this.x > dimension) { //constrain movement
			this.x -= dimension;
		} else if (this.x < 0) {
			this.x += dimension;
		}
		if (this.y > dimension) {
			this.y -= dimension;
		} else if (this.y < 0) {
			this.y += dimension;
		}
	}
	this.check = function() {
		ants.forEach((ant, indexAnt) => {
				if (distA > dist(ant.x, ant.y, this.x, this.y) - sizeA) { //that are within interaction distance
					if (!this.interact(indexAnt)) { //if not already interaction
						types.forEach((type, indexType) => {
							if (ant.type == type) { //if this is the type
								this.colors[indexType]++; //increment
							}
						});
					}
				}
      });
  }
  this.interact = function(i) {
	  var valid = true;
	  this.interactions.forEach((interaction) => {
      if (interaction == i) {
		      valid = false;
		  }
	  })
	  if (valid) {
		    append(this.interactions, i);
	  }
	  return (valid);
  }
}
