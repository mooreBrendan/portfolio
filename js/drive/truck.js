function truck(){
  this.x=dimension/2;
  this.y=dimension/2;
  this.left=turnCircle;
  this.right=turnCircle;
  this.current="";
  this.dir=-PI/2;
  this.vel=0;
  this.keys=function(){
    if(keyIsDown(UP_ARROW)&&!keyIsDown(DOWN_ARROW)){
      this.vel+=accelInc;
    }
    else if(keyIsDown(DOWN_ARROW)&&!keyIsDown(UP_ARROW)){
      this.vel-=accelInc;
    }
    if(keyIsDown(RIGHT_ARROW)&&!keyIsDown(LEFT_ARROW)){
      this.right--;
      this.left++;
    }
    else if(keyIsDown(LEFT_ARROW)&&!keyIsDown(RIGHT_ARROW)){
      this.left--;
      this.right++;
    }
  }
  this.update=function(){
    //this.x+=this.vel*cos(this.dir);
    //this.y+=this.vel*sin(this.dir);
    if(this.x>dimension){
      this.x-=dimension;
    }
    if(this.x<0){
      this.x+=dimension;
    }
    if(this.y>dimension){
      this.y-=dimension;
    }
    if(this.y<0){
      this.y+=dimension;
    }
  }
  this.show=function(){
    rotate(this.dir,[0,0,0]);
    rectMode(CENTER);
    fill(200);
    noStroke();
    rect(this.x,this.y,tSizeW,tSizeL);
    //rotate(this.dir);
    if(showCircles){
      ellipseMode(CENTER);
      noFill();
      //strokeWeight(200);
      stroke(200);
      ellipse(this.x+cos(this.dir+PI/2)*this.right,this.y-sin(this.dir+PI/2)*this.right,this.right*2,this.right*2);
      ellipse(this.x+cos(this.dir-PI/2)*this.left,this.y-sin(this.dir-PI/2)*this.left,this.left*2,this.left*2);
    }
  }
}
