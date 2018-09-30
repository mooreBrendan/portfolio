function tile(rgb,ind) {
  this.index=ind;
	this.rgb = [];
	for (var i = 0; i < rgb.length; i++) {
		this.rgb[i] = rgb[i];
	}
	this.x = ((this.index%numWidth)+.5)*sizeT;
	this.y = (floor(this.index/numWidth)+.5)*sizeT;
	this.different = false;
	this.clicked = function() {
		if (mouseX > this.x - sizeT/2 && mouseX < this.x + sizeT/2 && mouseY > this.y - sizeT/2 && mouseY < this.y + sizeT/2) {
      //console.log("mX: "+ mouseX+" mY: "+mouseY);
			if (this.different==false) {
        var index=-1;
				tiles.forEach((tile, indexT) => {
          tile.showIndex();
					if (tile.different) {
						index=indexT;
					}
          //console.log("ind: "+indexT+" x: "+tile.x+" y: "+tile.y);
				});
        console.log("Wrong choice.  Correct was: " + index+" you chose: "+this.index);
        textAlign(CENTER,CENTER);
        textSize(48*dimension/600);
        if(colorVal>255){
          fill(0);
        }
        else{
          fill(255);
        }
        text("You Lose\nScore: "+str(score),dimension/2,dimension/2);
				noLoop();
			}
			score++;
			difference = ceil(difference * (1/(1+pow(1.01,score-300))));
			return (true);
		} else {
			return (false);
		}
	}
	this.change = function() {
		var arry = [0, 1, 2]
		var tempDiff = difference;
		var tempTempDiff;
		var change;
		var index;
		while (arry.length > 1) {
			tempTempDiff = round(random(-.49, tempDiff + .49));
			tempDiff -= tempTempDiff;
			index = arry.splice(round(random(-.49, arry.length -.51)), 1);
			if (this.rgb[index] + tempTempDiff > 255) {
				change = -1;
			} else if (this.rgb[index] - tempTempDiff < 0) {
				change = 1;
			} else {
				change = random(0, 1) > .5 ? -1 : 1;
			}
			this.rgb[index] += change * tempTempDiff;
		}
    if (this.rgb[0] + tempDiff > 255) {
      change = -1;
    } else if (this.rgb[0] - tempDiff < 0) {
      change = 1;
    } else {
      change = random(0, 1) > .5 ? -1 : 1;
    }
		this.rgb[arry[0]] += change * tempDiff;
    this.different = true;
	}
	this.show = function() {
		rectMode(CENTER);
		fill(this.rgb[0], this.rgb[1], this.rgb[2]);
		rect(this.x, this.y, sizeT, sizeT);
	}
  this.showIndex=function(){
    if(colorVal>255){
      fill(50);
    }
    else{
      fill(200);
    }
    textAlign(CENTER,CENTER);
    textSize(sizeT*.5);
    text(this.index,this.x,this.y)
  }
}
