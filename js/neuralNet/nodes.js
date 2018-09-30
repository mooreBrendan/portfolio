function node(x,y){
  this.x=x;
  this.y=y;
  this.connections=[];
  this.weight=[];
  this.val=-1;
  this.update=function(arry){
    this.val=0;
    this.connections.forEach((connection,index) =>{
      this.val+=connection.val*arry[this.weight[index]];
    });
    //this.val=(max(0,this.val)?1:0);
    this.val=max(0,this.val);
  }
  this.show=function(arry){
    this.connections.forEach((connection,index) =>{
      stroke(0);
      if(connection.val){
        stroke(255);
      }
      strokeWeight(map(abs(arry[this.weight[index]]),0,1,0,2));
      line(connection.x,connection.y,this.x,this.y);
    });
    ellipseMode(CENTER);
    var fil=map(this.val,-1,1,0,255);
    stroke(0);
    strokeWeight(1);
    fill(fil);
    noStroke();
    ellipse(this.x,this.y,sizeN,sizeN);
  }
}
function net(){
  this.weights=[];
  this.fit=0;
}
