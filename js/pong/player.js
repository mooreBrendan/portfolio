function player(x){
  this.y=dimension/2;
  this.size=dimension/4;
  this.up=false;
  this.down=false;
  this.x=x;
  this.keys=function(key1,key2){
    if(keyIsDown(key1)){
      this.up=true;
    }
    else{
      this.up=false;
    }
    if(keyIsDown(key2)){
      this.down=true;
    }
    else{
      this.down=false;
    }
  }
  this.update=function(){
    if(this.up && this.y-this.size/2>0){
      this.y-=5;
    }
    if(this.down && this.y+this.size/2<dimension){
      this.y+=5;
    }
  }
  this.show=function(){
    fill(255);
    rectMode(CENTER);
    rect(this.x,this.y,this.size/8,this.size);
  }
}
