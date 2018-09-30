function message(start,current,goal,mess){
  angleMode(RADIANS);
  this.previous=current;
  this.message=mess;
  this.goal=goal;
  this.start=start;
  this.x=nodes[current].x;
  this.y=nodes[current].y;
  this.dir=atan2(nodes[this.goal].y-this.y,nodes[this.goal].x-this.x);
  this.show=function(){
    fill(200,200,50);
    ellipseMode(CENTER);
    ellipse(this.x,this.y,sizeM,sizeM)
  }
  this.update=function(){
    angleMode(RADIANS);
    this.x += cos(this.dir) * delta_t;//update position
    this.y += sin(this.dir) * delta_t;
  }
}
