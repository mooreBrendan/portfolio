function node(index){
  this.index=index;
  do{
    var valid=true;
    this.x=random(0,dimension-sizeN);
    this.y=random(0,dimension-sizeN);
    for(var i=0;i<this.index;i++){
        if(dist(nodes[i].x,nodes[i].y,this.x,this.y)<sizeN){
          valid=false;
        }
      }
  }while(!valid);
  this.x+=sizeN/2;
  this.y+=sizeN/2;
  this.connections=[];
  this.show=function(){
    for(var i=0;i<this.connections.length;i++){
      if(this.connections[i]>this.index){
        fill(125);
        stroke(lineWeight);
        line(this.x,this.y,nodes[this.connections[i]].x,nodes[this.connections[i]].y);
      }
    }
    fill(50,200,50);
    ellipseMode(CENTER);
    ellipse(this.x,this.y,sizeN,sizeN);

    textSize(16);
    textAlign(CENTER);
    fill(0);
    text(this.index,this.x,this.y);
  }
}
