function node(index) {
	this.index = index;
	this.connections = [];
	this.connCost = [];
  this.private = genPrime(lowPrime,uppPrime);
  this.public  = genPrime(lowPrime,uppPrime);
  this.synch="00000000";
	this.x = random(sizeN / 2, dimension - sizeN / 2);
	this.y = random(sizeN / 2, dimension - sizeN / 2);
	for (var i = 0; i < this.index; i++) {
		if (dist(this.x, this.y, nodes[i].x, nodes[i].y) <= sizeN) {
			i = -1;
			this.x = random(sizeN / 2, dimension - sizeN / 2);
			this.y = random(sizeN / 2, dimension - sizeN / 2);
		}
	}
  this.receive=function(message){
    console.log(this.index+":\t"+message);
    console.log(this.index+":\t"+convertStr(synchEncrypt(this.synch,message)));
  }
	this.showConn = function() {
    var sWeight;
		this.connections.forEach((connection, index) => {
			if (connection > this.index) {
				stroke(200);
				sWeight = map(this.connCost[index], 0, costLimit, 2, .4);
				strokeWeight(sWeight);
				line(this.x, this.y, nodes[connection].x, nodes[connection].y);
			}
		});
	}
	this.showNode = function() {
		ellipseMode(CENTER);
		fill(200)
		ellipse(this.x, this.y, sizeN, sizeN);
		fill(0);
		textAlign(CENTER, CENTER);
    textSize(sizeN*.8);
		text(this.index, this.x, this.y);
	}
}

function message(arry,position,message){
  angleMode(RADIANS);
  this.position=position;
  this.arry=arry;
  this.message=message;
  this.x=nodes[arry[this.position]].x;
  this.y=nodes[arry[this.position]].y;
  this.dist=dist(nodes[this.arry[this.position+1]].x,nodes[this.arry[this.position+1]].y,nodes[this.arry[this.position]].x,nodes[this.arry[this.position]].y);
  this.dir=atan2(nodes[arry[this.position+1]].y-nodes[arry[this.position]].y,nodes[arry[this.position+1]].x-nodes[arry[this.position]].x);
  this.update=function(){
    if(this.position<this.arry.length-1){
      if(dist(nodes[this.arry[this.position]].x,nodes[this.arry[this.position]].y,this.x,this.y)>this.dist){
        this.position++;
        this.x=nodes[arry[this.position]].x;
        this.y=nodes[arry[this.position]].y;
        nodes[arry[this.position]].receive(this.message);
        if(this.position<this.arry.length-1){
          this.dist=dist(nodes[this.arry[this.position+1]].x,nodes[this.arry[this.position+1]].y,nodes[this.arry[this.position]].x,nodes[this.arry[this.position]].y);
          this.dir=atan2(nodes[arry[this.position+1]].y-nodes[arry[this.position]].y,nodes[arry[this.position+1]].x-nodes[arry[this.position]].x);
        }
      }
    }
    if(this.position<this.arry.length-1){
      this.x+=cos(this.dir)*gSpeed;
      this.y+=sin(this.dir)*gSpeed;
      return(false);
    }
    else{
      return(true);
    }
  }
  this.show=function(){
    fill(200);
    ellipseMode(CENTER);
    ellipse(this.x,this.y,sizeM,sizeM);
  }
}
