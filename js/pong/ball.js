function ball(){
  this.init=function(){
    this.x=dimension/2;
    this.y=dimension/2;
    this.size=dimension/50;
    if(random(1,100)>50){
      this.angle=random(-PI/4,PI/4);
    }
    else {
      this.angle=random(3*PI/4,5*PI/4);
    }
    this.rSpeed=random(200,400);
  }
  this.values=function(){
    angleMode(RADIANS);
    if(this.x+this.size/2>dimension){
      p1Score++;
      this.init();
    }
    if(this.x-this.size/2<0){
      p2Score++;
      this.init();
    }
    if(this.y+this.size/2>dimension ||this.y-this.size/2<0){
      this.angle= -this.angle;
    }
  }
  this.check=function(playr){
    var difference=abs(this.y-playr.y);
    var direction=1;
    if(this.x>dimension/2){
      direction=-1;
    }
    if(abs((this.x-direction*this.size/2)-(playr.x+direction*playr.size/16))<2){
      if(difference<=playr.size/8){
        this.angle=0;
        this.r++;
      }
      else if(difference<=playr.size/4){
        this.angle=PI/12;
        this.r++;
      }
      else if(difference<=3*playr.size/8){
        this.angle=PI/6;
        this.r++;
      }
      else if(difference<=playr.size/2){
        this.angle=PI/4;
        this.r++;
      }
      if(direction==-1&&difference<playr.size/2){
        this.angle=PI-this.angle;
      }
      if(difference<=playr.size/2  && this.y-playr.y<0){
        this.angle=-this.angle;
      }
    }
  }
  this.update=function(){
    this.x+=this.rSpeed*cos(this.angle)/100;
    this.y+=this.rSpeed*sin(this.angle)/100;
  }
  this.show=function(){
    fill(255);
    rectMode(CENTER);
    rect(this.x,this.y,this.size,this.size);
  }
}
